import jsonLogic from 'json-logic-js';
import {
  getYearAndParticipantFromKey,
  makeYearParticipantKey,
} from '../../utils/helpers';

const NB_MAX_HEARTS = 24;
const MAX_INFLUENCE_POINTS = 10;
const RATE_PARTICIPANTS = 0.1;

const computeNewCarbonVariables = (
  oldCarbonVariables,
  actions,
  globalVariables = {}
) => {
  const newCarbonVariables = {};
  actions.forEach((action) => {
    action.operations.forEach((operation) => {
      newCarbonVariables[operation.variable] = jsonLogic.apply(
        operation.operation,
        {
          ...oldCarbonVariables,
          ...globalVariables,
        }
      );
    });
  });
  return newCarbonVariables;
};

const applyFunctionToLeavesOfFootprintStructures = (node, func) => {
  if (!node.children) {
    return func(node);
  }
  return {
    ...node,
    children: node.children.map((child) =>
      applyFunctionToLeavesOfFootprintStructures(child, func)
    ),
  };
};

const computeFootprint = (
  footprintStructure,
  variableFormulas,
  carbonVariables,
  globalCarbonVariables
) =>
  applyFunctionToLeavesOfFootprintStructures(footprintStructure, (leave) => ({
    ...leave,
    value: jsonLogic.apply(variableFormulas[leave.cfKey], {
      ...carbonVariables,
      ...globalCarbonVariables,
    }),
  }));

const sumTree = (node, valueAccessor = (n) => n.value, key = 'value') => {
  if (!node.children) {
    return {
      ...node,
      [key]: valueAccessor(node),
    };
  }
  const newNode = {
    ...node,
    children: node.children.map((child) => sumTree(child, valueAccessor)),
  };
  newNode[key] = newNode.children.reduce((S, child) => S + child[key], 0);
  return newNode;
};
const valueOnAllLevels = (footprintStructure) => sumTree(footprintStructure);

const computePeerAwarenessScore = (actionCard, nbTotalPersonsSimulated) =>
  actionCard.peerAwarenessScore / nbTotalPersonsSimulated;

const computePeerInspirationScore = (actionCard, nbTotalPersonsSimulated) =>
  actionCard.peerInspirationScore /
  (nbTotalPersonsSimulated * NB_MAX_HEARTS) /
  2;

const computePressureScore = (actionCard, nbParticipants) =>
  actionCard.systemicPressureScore / nbParticipants / MAX_INFLUENCE_POINTS / 2;

const computeWeakSignalScore = (actionCard, nbTotalPersonsSimulated) =>
  actionCard.systemicWeakSignals /
  (nbTotalPersonsSimulated * NB_MAX_HEARTS) /
  2;

const computeSocialVariables = (
  oldSocialVariables,
  participantIndividualChoices,
  citizenIndividualChoices,
  collectiveActionCardIds,
  actionCards,
  nbParticipants,
  nbDisctinctCitizens
) => {
  let { socialScore, influenceScore } = oldSocialVariables;
  const nbTotalPersonsSimulated = Math.round(
    nbParticipants / RATE_PARTICIPANTS
  );
  const ratioCitizens =
    (nbTotalPersonsSimulated - nbParticipants) / nbDisctinctCitizens;
  participantIndividualChoices.forEach((personAction) => {
    personAction.actionCardIds.forEach((actionCardId) => {
      socialScore +=
        computePeerAwarenessScore(
          actionCards[actionCardId],
          nbTotalPersonsSimulated
        ) +
        computePeerInspirationScore(
          actionCards[actionCardId],
          nbTotalPersonsSimulated
        );
      influenceScore +=
        computePressureScore(actionCards[actionCardId], nbParticipants) +
        computeWeakSignalScore(
          actionCards[actionCardId],
          nbTotalPersonsSimulated
        );
    });
  });
  citizenIndividualChoices.forEach((personAction) => {
    personAction.actionCardIds.forEach((actionCardId) => {
      socialScore +=
        computePeerAwarenessScore(
          actionCards[actionCardId],
          nbTotalPersonsSimulated
        ) +
        ratioCitizens *
          computePeerInspirationScore(
            actionCards[actionCardId],
            nbTotalPersonsSimulated
          );
      influenceScore +=
        computePressureScore(actionCards[actionCardId], nbParticipants) +
        ratioCitizens *
          computeWeakSignalScore(
            actionCards[actionCardId],
            nbTotalPersonsSimulated
          );
    });
  });
  collectiveActionCardIds.forEach((actionCardId) => {
    socialScore += actionCards[actionCardId].peerAwarenessScore / 10;
  });
  // eslint-disable-next-line no-console
  console.log('socialScores: ', { socialScore, influenceScore });
  return { socialScore, influenceScore };
};

const getActionsTakenBeforeYear = (
  citizenIndividualActionCards,
  citizenId,
  year
) => {
  let actionsTakenBeforeYear = [];
  Object.keys(citizenIndividualActionCards).forEach((citizenYearKey) => {
    const [yearForAction, citizenIdForAction] = getYearAndParticipantFromKey(
      citizenYearKey
    );
    if (yearForAction < year && citizenId === citizenIdForAction) {
      actionsTakenBeforeYear = actionsTakenBeforeYear.concat(
        citizenIndividualActionCards[citizenYearKey].actionCardIds
      );
    }
  });
  return actionsTakenBeforeYear;
};
const computeCitizenIndividualChoices = (
  yearFrom,
  socialVariables,
  previousCitizenIndividualChoices,
  citizens,
  actionCards
) => {
  const newCitizenIndividualChoices = {};
  citizens.forEach((citizen) => {
    const alreadyTakenActionIds = getActionsTakenBeforeYear(
      previousCitizenIndividualChoices,
      citizen.id,
      yearFrom
    );
    const newActionCardIdsForCitizen = [];
    actionCards.forEach((actionCard) => {
      const isSocialScoreBigEnough =
        socialVariables.socialScore * 100 >=
        citizen.reluctancy + actionCard.reluctancyForCitizens;
      if (
        isSocialScoreBigEnough &&
        !alreadyTakenActionIds.includes(actionCard.id)
      ) {
        // eslint-disable-next-line no-console
        console.log(
          `Citizen ${citizen.firstName} takes action ${actionCard.key}`
        );
        newActionCardIdsForCitizen.push(actionCard.id);
      }
    });
    newCitizenIndividualChoices[
      makeYearParticipantKey(yearFrom, citizen.id)
    ] = {
      citizenId: citizen.id,
      actionCardIds: newActionCardIdsForCitizen,
    };
  });
  return newCitizenIndividualChoices;
};

const computeBudget = (
  influenceScore,
  oldBudget = 0,
  collectiveActionCardIds = [],
  actionCards = [],
  roundType = 'collective'
) => {
  if (roundType === 'collective') {
    const startingBudget = 3;
    const minBudget = 3;
    const maxBudget = 8;
    const offset = 0.15;
    // Every 0.2 influence point, add 1 budget
    const rateBudgetOverInfluenceScore = 0.2;
    const approximativeBudget = Math.floor(
      startingBudget + (influenceScore + offset) / rateBudgetOverInfluenceScore
    );
    const additionalBudget = Math.max(
      Math.min(approximativeBudget, maxBudget),
      minBudget
    );
    const usedBudget = collectiveActionCardIds
      .map((id) => actionCards[id].cost)
      .reduce((a, b) => a + b, 0);
    return oldBudget + additionalBudget - usedBudget;
  }
  return oldBudget;
};

export {
  applyFunctionToLeavesOfFootprintStructures,
  computeNewCarbonVariables,
  computeFootprint,
  valueOnAllLevels,
  computeSocialVariables,
  computeCitizenIndividualChoices,
  computeBudget,
};
