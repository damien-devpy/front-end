import jsonLogic from 'json-logic-js';
import { getYearAndParticipantFromKey, makeYearParticipantKey} from '../../utils/helpers';

const NB_MAX_HEARTS = 46;

const computeNewCarbonVariables = (
  oldCarbonVariables,
  actions,
  globalVariables = {}
) => {
  const newCarbonVariables = {};
  console.log(oldCarbonVariables);
  console.log(actions);
  console.log(globalVariables);
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
  console.log(newCarbonVariables);
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

const computeSocialVariables = (
  oldSocialVariables,
  individualActions,
  collectiveActionCardIds,
  actionCards
) => {
  let { socialScore, influenceScore } = oldSocialVariables;

  individualActions.forEach((participantAction) => {
    participantAction.actionCardIds.forEach((actionCardId) => {
      socialScore += actionCards[actionCardId].peerInspirationScore;
      socialScore += actionCards[actionCardId].peerAwarenessScore;
      influenceScore += actionCards[actionCardId].systemicWeakSignals;
      influenceScore += actionCards[actionCardId].systemicPressureScore;
    });
  });
  collectiveActionCardIds.forEach((actionCardId) => {
    socialScore += actionCards[actionCardId].peerInspirationScore;
    socialScore += actionCards[actionCardId].peerAwarenessScore;
    influenceScore += actionCards[actionCardId].systemicWeakSignals;
    influenceScore += actionCards[actionCardId].systemicPressureScore;
  });
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
      actionsTakenBeforeYear +=
        citizenIndividualActionCards[citizenYearKey].actionCardIds;
    }
  });
  return actionsTakenBeforeYear;
};
const computeCitizenIndividualActionCards = (
  year,
  socialVariables,
  citizenIndividualActionCards,
  citizens,
  actionCards
) => {
  console.log(citizenIndividualActionCards);
  const newCitizenIndividualActionCards = {};
  citizens.forEach((citizen) => {
    const alreadyTalenActionIds = getActionsTakenBeforeYear(
      citizenIndividualActionCards,
      citizen,
      year
    );
    const newActionCardIds = [];
    actionCards.forEach((actionCard) => {
      if (
        socialVariables.socialScore >
          citizen.reluctancy + actionCard.reluctancyForCitizens &&
        !alreadyTalenActionIds.includes(actionCard.id)
      ) {
        newActionCardIds.push(actionCard.id);
      }
    });
    newCitizenIndividualActionCards[
      makeYearParticipantKey(year, citizen.id)
    ] = {
      citizen: citizen.id,
      actionCardIds: newActionCardIds,
    };
  });
  return newCitizenIndividualActionCards;
};

const computeBudget = (influenceScore) => {
  return Math.min(Math.floor((influenceScore + 10) / 15 + 2));
};

export {
  applyFunctionToLeavesOfFootprintStructures,
  computeNewCarbonVariables,
  computeFootprint,
  valueOnAllLevels,
  computeSocialVariables,
  computeCitizenIndividualActionCards,
  computeBudget,
};
