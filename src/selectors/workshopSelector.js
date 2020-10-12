import { pathOr } from 'ramda';

import { makeYearParticipantKey, sumArray } from '../utils/helpers';

const selectWorkshopEntity = (workshop, entity) =>
  pathOr({}, ['entities', entity], workshop);

// for all rounds
export const getAllIndividualChoicesForParticipant = (
  participantId,
  roundConfigEntity,
  individualChoicesEntity
) =>
  individualChoicesEntity
    ? Object.keys(roundConfigEntity).reduce(
        (accumulator, year) =>
          roundConfigEntity[year].actionCardType === 'individual' &&
          individualChoicesEntity[makeYearParticipantKey(year, participantId)]
            ? accumulator.concat(
                individualChoicesEntity[
                  makeYearParticipantKey(year, participantId)
                ].actionCardIds
              )
            : accumulator,
        []
      )
    : [];

export const getAllCollectiveChoices = (
  roundConfigEntity,
  collectiveChoicesEntity
) =>
  collectiveChoicesEntity
    ? Object.keys(roundConfigEntity).reduce(
        (accumulator, year) =>
          roundConfigEntity[year].actionCardType === 'collective' &&
          collectiveChoicesEntity[year]
            ? accumulator.concat(collectiveChoicesEntity[year].actionCardIds)
            : accumulator,
        []
      )
    : [];

const selectCheckedActionCardsBatchIdsFromRounds = (
  workshop,
  actionCardType
) => {
  const roundConfigEntity = pathOr([], ['entities', 'roundConfig'], workshop);
  return [
    ...new Set(
      Object.keys(roundConfigEntity).reduce(
        (accumulator, roundConfigId) =>
          roundConfigEntity[roundConfigId].actionCardBatchIds &&
          (!actionCardType ||
            actionCardType === roundConfigEntity[roundConfigId].actionCardType)
            ? accumulator.concat(
                roundConfigEntity[roundConfigId].actionCardBatchIds.filter(
                  // Remove null elements with filtering
                  (e) => e
                )
              )
            : accumulator,
        []
      )
    ),
  ];
};

// chosen batches
export const selectCheckedIndividualActionCardsBatchIdsFromRounds = (
  workshop
) => selectCheckedActionCardsBatchIdsFromRounds(workshop, 'individual');

export const selectCheckedCollectiveActionCardsBatchIdsFromRounds = (
  workshop
) => selectCheckedActionCardsBatchIdsFromRounds(workshop, 'collective');

export const selectCurrentWorkshop = (state) =>
  pathOr(null, ['workshop'], state);

export const selectIsCurrentWorkshopSynchronized = (state) =>
  pathOr(false, ['workshop', 'isSynchronized'], state);

export const selectCurrentWorkshopInfo = (state) =>
  pathOr({}, ['workshop', 'result'], state);

export const selectRounds = (state) =>
  pathOr([], ['workshop', 'result', 'rounds'], state);

export const selectCurrentRound = (state) =>
  pathOr(null, ['workshop', 'result', 'currentYear'], state);

export const selectCurrentYear = (state) =>
  pathOr(null, ['workshop', 'result', 'currentYear'], state);

export const selectStartYear = (state) =>
  pathOr(null, ['workshop', 'result', 'startYear'], state);

export const selectRoundConfigEntity = (state) =>
  selectWorkshopEntity(selectCurrentWorkshop(state), 'roundConfig');

export const selectNextRound = (state) => {
  const roundConfigEntity = selectRoundConfigEntity(state);
  const config = roundConfigEntity[selectCurrentYear(state)];
  return config ? config.targetedYear : null;
};

export const selectCurrentRoundActionCardType = (state) => {
  const roundConfigEntity = selectRoundConfigEntity(state);
  const currentRound = selectCurrentRound(state);
  return pathOr(null, [currentRound, 'actionCardType'], roundConfigEntity);
};

export const selectIndividualRoundIds = (roundConfigEntity) =>
  Object.keys(roundConfigEntity).filter(
    (roundConfigId) =>
      roundConfigEntity[roundConfigId].actionCardType === 'individual'
  );

export const selectCollectiveRoundIds = (roundConfigEntity) =>
  Object.keys(roundConfigEntity).filter(
    (roundConfigId) =>
      roundConfigEntity[roundConfigId].actionCardType === 'collective'
  );

export const getNumberOfChosenActionCards = (
  individualChoicesEntity,
  round,
  participantId
) => {
  if (!individualChoicesEntity) return 0;
  const participantChoicesId = makeYearParticipantKey(round, participantId);
  return individualChoicesEntity[participantChoicesId] &&
    individualChoicesEntity[participantChoicesId].actionCardIds
    ? individualChoicesEntity[participantChoicesId].actionCardIds.length
    : 0;
};

export const getNumberOfChosenCollectiveCards = (
  collectiveChoicesEntity,
  round
) => {
  return collectiveChoicesEntity &&
    collectiveChoicesEntity[round] &&
    collectiveChoicesEntity[round].actionCardIds
    ? collectiveChoicesEntity[round].actionCardIds.length
    : 0;
};

export const getCostOfChosenActionCards = (
  individualChoicesEntity,
  actionCardsEntity,
  round,
  participantId
) => {
  if (!individualChoicesEntity) return 0;
  const id = makeYearParticipantKey(round, participantId);
  return actionCardsEntity &&
    individualChoicesEntity[id] &&
    individualChoicesEntity[id].actionCardIds
    ? sumArray(
        individualChoicesEntity[id].actionCardIds.map(
          (cardId) => actionCardsEntity[cardId].cost
        )
      )
    : 0;
};

export const getCostOfChosenCollectiveCards = (
  collectiveChoicesEntity,
  actionCardsEntity,
  round
) => {
  if (!collectiveChoicesEntity) return 0;
  return actionCardsEntity &&
    collectiveChoicesEntity[round] &&
    collectiveChoicesEntity[round].actionCardIds
    ? sumArray(
        collectiveChoicesEntity[round].actionCardIds.map(
          (cardId) => actionCardsEntity[cardId].cost
        )
      )
    : 0;
};

// computes number of hearts = budget per participant at the beginning of each round
export const getInitRoundBudget = (
  roundConfigEntity,
  individualChoicesEntity,
  participantIds,
  actionCardsEntity
) => {
  const rounds = Object.keys(roundConfigEntity);
  const individualRounds = rounds.filter(
    (round) => roundConfigEntity[round].actionCardType === 'individual'
  );
  const roundBudgets = individualRounds.map(
    (round) => roundConfigEntity[round].individualBudget
  );
  const totalBudget = sumArray(roundBudgets);
  const initBudgets = {};
  participantIds.forEach((id) => {
    initBudgets[id] = totalBudget;
  });
  rounds.forEach((round) => {
    participantIds.forEach((id) => {
      const cardIds = individualChoicesEntity
        ? individualChoicesEntity[makeYearParticipantKey(round, id)]
        : null;
      if (cardIds) {
        cardIds.actionCardIds.forEach((cardId) => {
          initBudgets[id] -= actionCardsEntity[cardId].cost;
        });
      }
    });
  });
  return initBudgets;
};

export const getDefaultRoundType = (roundConfigEntity, currentYear) => {
  if (!roundConfigEntity) return 'individual';
  const rounds = Object.keys(roundConfigEntity).filter(
    (round) => round !== currentYear // currentYear could be number
  );
  // eslint-disable-next-line no-nested-ternary
  return rounds.length > 0
    ? roundConfigEntity[rounds.slice(-1)[0]].actionCardType === 'individual'
      ? 'collective'
      : 'individual'
    : 'individual';
};

export const getInitRoundBudgetCollective = (
  roundConfigEntity,
  collectiveChoicesEntity,
  actionCardsEntity
) => {
  const rounds = Object.keys(roundConfigEntity);
  const collectiveRounds = rounds.filter(
    (round) => roundConfigEntity[round].actionCardType === 'collective'
  );
  const roundBudgets = collectiveRounds
    ? collectiveRounds.map((round) => roundConfigEntity[round].budget)
    : [0];
  let totalBudget = sumArray(roundBudgets);
  rounds.forEach((round) => {
    const cardIds = collectiveChoicesEntity
      ? collectiveChoicesEntity[round]
      : null;
    if (cardIds) {
      cardIds.actionCardIds.forEach((cardId) => {
        totalBudget -= actionCardsEntity[cardId].cost;
      });
    }
  });
  return totalBudget;
};

export const selectWorkshopById = (workshops, workshopId) =>
  workshops.find((workshop) => workshop.id === workshopId);

export const selectRoundsEntity = (state) =>
  selectWorkshopEntity(selectCurrentWorkshop(state), 'rounds');

export const selectIndividualChoicesEntity = (state) =>
  selectWorkshopEntity(selectCurrentWorkshop(state), 'individualChoices');

export const selectCollectiveChoicesEntity = (state) =>
  selectWorkshopEntity(selectCurrentWorkshop(state), 'collectiveChoices');

export const selectCarbonFootprintsEntity = (state) =>
  selectWorkshopEntity(selectCurrentWorkshop(state), 'carbonFootprints');

export const selectOneFootprint = (state, participantId, year) =>
  pathOr(
    {},
    [makeYearParticipantKey(year, participantId), 'footprint'],
    selectCarbonFootprintsEntity(state)
  );

export const selectCarbonVariablesEntity = (state) =>
  selectWorkshopEntity(selectCurrentWorkshop(state), 'carbonVariables');
export const selectGlobalCarbonVariablesEntity = (state) =>
  selectWorkshopEntity(selectCurrentWorkshop(state), 'globalCarbonVariables');

export const selectOneCarbonVariablesObject = (state, participantId, year) =>
  pathOr(
    {},
    [makeYearParticipantKey(year, participantId), 'variables'],
    selectCarbonVariablesEntity(state)
  );

export const selectOneGlobalCarbonVariablesObject = (state, year) =>
  pathOr({}, [year], selectGlobalCarbonVariablesEntity(state));

export const selectParticipantsEntity = (state) =>
  selectWorkshopEntity(selectCurrentWorkshop(state), 'participants');

export const selectCitizenCarbonFootprintsEntity = (state) =>
  selectWorkshopEntity(selectCurrentWorkshop(state), 'citizenCarbonFootprints');

export const selectPersonaEntity = (state) =>
  selectWorkshopEntity(selectCurrentWorkshop(state), 'personas');

const selectWorkshopModelStructure = (state, structure) =>
  pathOr({}, ['workshop', 'result', 'model', structure], state);

export const selectFootprintStructure = (state) =>
  selectWorkshopModelStructure(state, 'footprintStructure');

export const selectVariableFormulasStructure = (state) =>
  selectWorkshopModelStructure(state, 'variableFormulas');

export const selectIsWorkshopReadyForInitialization = (state) => {
  const participants = selectParticipantsEntity(state);
  const participantIds = pathOr(
    [],
    ['workshop', 'result', 'participants'],
    state
  );
  if (participantIds.length === 0) return false;
  return participantIds.every(
    (participantId) =>
      pathOr('notready', [participantId, 'status'], participants) === 'ready'
  );
};

const selectEntityIdsForRound = (state, roundId, entity) =>
  pathOr([], [roundId, entity], selectRoundsEntity(state));

const selectEntityForRound = (state, roundId, entity) => {
  const currentWorkshop = selectCurrentWorkshop(state);
  const workshopEntity = selectWorkshopEntity(currentWorkshop, entity);
  const entityIdsForRound = selectEntityIdsForRound(state, roundId, entity);

  return entityIdsForRound.reduce(
    (accumulator, entityId) => ({
      ...accumulator,
      [entityId]: workshopEntity[entityId],
    }),
    {}
  );
};
export const selectCarbonFootprintsEntityForRound = (state, roundId) =>
  selectEntityForRound(state, roundId, 'carbonFootprints');

export const selectCarbonFootprintsEntityForCurrentRound = (state) => {
  const currentRound = selectCurrentRound(state);
  return selectCarbonFootprintsEntityForRound(state, currentRound);
};

export const selectCitizenCarbonFootprintsEntityForRound = (state, roundId) =>
  selectEntityForRound(state, roundId, 'citizenCarbonFootprints');

export const selectCitizenCarbonFootprintsEntityForCurrentRound = (state) => {
  const currentRound = selectCurrentRound(state);
  return selectCitizenCarbonFootprintsEntityForRound(state, currentRound);
};

export const selectInitialGlobalCarbonVariables = (state) => {
  return selectWorkshopModelStructure(state, 'globalCarbonVariables');
};
