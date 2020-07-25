import { pathOr } from 'ramda';

import { makeYearParticipantKey, sumArray } from '../utils/helpers';

const selectWorkshopEntity = (workshop, entity) =>
  pathOr({}, ['entities', entity], workshop);

export const selectIndividualChoiceIdsForParticipant = (
  workshop,
  participantId
) => {
  const individualChoicesEntity = selectWorkshopEntity(
    workshop,
    'individualChoices'
  );
  const roundConfigEntity = selectWorkshopEntity(workshop, 'roundConfig');
  return [
    ...new Set(
      Object.keys(roundConfigEntity).reduce(
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
    ),
  ];
};

export const isIndividualActionCardTakenForParticipant = (
  workshop,
  participantId
) => {
  const individualChoicesForParticipant = selectIndividualChoiceIdsForParticipant(
    workshop,
    participantId
  );
  return (actionCardId) => {
    return individualChoicesForParticipant.includes(actionCardId);
  };
};

export const selectIndividualChoicesForParticipant = (
  participantId,
  roundConfigEntity,
  individualChoicesEntity
) =>
  individualChoicesEntity
    ? [
        ...new Set(
          Object.keys(roundConfigEntity).reduce(
            (accumulator, year) =>
              roundConfigEntity[year].actionCardType === 'individual' &&
              individualChoicesEntity[
                makeYearParticipantKey(year, participantId)
              ]
                ? accumulator.concat(
                    individualChoicesEntity[
                      makeYearParticipantKey(year, participantId)
                    ].actionCardIds
                  )
                : accumulator,
            []
          )
        ),
      ]
    : [];

export const selectCollectiveChoices = (
  roundConfigEntity,
  collectiveChoicesEntity
) =>
  collectiveChoicesEntity
    ? [
        ...new Set(
          Object.keys(roundConfigEntity).reduce(
            (accumulator, year) =>
              roundConfigEntity[year].actionCardType === 'collective' &&
              collectiveChoicesEntity[year]
                ? accumulator.concat(
                    collectiveChoicesEntity[year].actionCardIds
                  )
                : accumulator,
            []
          )
        ),
      ]
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

export const selectCurrentWorkshopSummary = (state) =>
  pathOr({}, ['workshop', 'result'], state);

export const selectCurrentRound = (workshop) =>
  pathOr(null, ['result', 'currentYear'], workshop);

export const selectCurrentYear = (state) =>
  pathOr(null, ['workshop', 'result', 'currentYear'], state);

export const selectNextRound = (state) => {
  const currentWorkshop = selectCurrentWorkshop(state);
  const roundConfigEntity = selectWorkshopEntity(
    currentWorkshop,
    'roundConfig'
  );
  const config = roundConfigEntity[selectCurrentYear(state)];
  return config ? config.targetedYear : null;
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
  inidividualChoicesEntity,
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
      const cardIds = inidividualChoicesEntity
        ? inidividualChoicesEntity[makeYearParticipantKey(round, id)]
        : null;
      cardIds &&
        cardIds.actionCardIds.forEach((cardId) => {
          initBudgets[id] -= actionCardsEntity[cardId].cost;
        });
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
    cardIds &&
      cardIds.actionCardIds.forEach((cardId) => {
        totalBudget -= actionCardsEntity[cardId].cost;
      });
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
export const selectCarbonFootprintsForRound = (state, roundId) =>
  selectEntityForRound(state, roundId, 'carbonFootprints');

export const selectCitizenCarbonFootprintsForRound = (state, roundId) =>
  selectEntityForRound(state, roundId, 'citizenCarbonFootprints');

export const selectInitialGlobalCarbonVariables = (state) => {
  const { startYear } = selectCurrentWorkshopSummary(state);
  return selectWorkshopEntity(
    selectCurrentWorkshop(state),
    'globalCarbonVariables'
  )[startYear];
};
