import {
  getCostOfChosenActionCards,
  getInitRoundBudget,
  getNumberOfChosenActionCards,
  selectCheckedCollectiveActionCardsBatchIdsFromRounds,
  selectCheckedIndividualActionCardsBatchIdsFromRounds,
} from './workshopSelector';

const roundConfigEntity = {
  '2020': {
    actionCardType: 'individual',
    targetedYear: 2023,
    individualBudget: 4,
    actionCardBatchIds: ['1'],
  },
  '2023': {
    actionCardType: 'collective',
    targetedYear: 2026,
    actionCardBatchIds: ['10'],
  },
  '2026': {
    actionCardType: 'individual',
    targetedYear: 2029,
    individualBudget: 6,
    actionCardBatchIds: ['2'],
  },
};
const participantIds = [1, 2];
const individualChoicesEntity = {
  '2020-1': {
    participantId: 1,
    actionCardIds: [2],
  },
  '2020-2': {
    participantId: 2,
    actionCardIds: [3],
  },
  '2026-1': {
    participantId: 1,
    actionCardIds: [4],
  },
  '2026-2': {
    participantId: 2,
    actionCardIds: [4, 6],
  },
};
const actionCardsEntity = {
  '2': {
    cost: 3,
  },
  '3': {
    cost: 2,
  },
  '4': {
    cost: 3,
  },
  '6': {
    cost: 1,
  },
};

describe('Workshop selector', () => {
  it('should calculate remaining budget for all participants', () => {
    const roundBudget = getInitRoundBudget(
      roundConfigEntity,
      individualChoicesEntity,
      participantIds,
      actionCardsEntity
    );
    // remaing budget for participant 1 = (2020.budget + 2026.budget) - (2.cost + 4.cost) = 10 - 6 = 4
    expect(roundBudget[1]).toEqual(4);
    // cost for participant 2 = (2020.budget + 2026.budget) - (3.cost + 4.cost + 6.cost) = 10 - 6 = 4
    expect(roundBudget[2]).toEqual(4);
  });

  it('should calculate cost of chosen actions cards given participant and round', () => {
    // 4.cost + 6.cost = 4
    expect(
      getCostOfChosenActionCards(
        individualChoicesEntity,
        actionCardsEntity,
        '2026',
        '2'
      )
    ).toEqual(4);
    // no participant in the choices
    expect(
      getCostOfChosenActionCards(
        individualChoicesEntity,
        actionCardsEntity,
        '2026',
        '3'
      )
    ).toEqual(0);
  });

  it('should calculate the number of cards chosen by a participant in a given round (i.e year)', () => {
    expect(
      getNumberOfChosenActionCards(individualChoicesEntity, '2020', '1')
    ).toEqual(1);
    // collective round -> 0
    expect(
      getNumberOfChosenActionCards(individualChoicesEntity, '2023', '1')
    ).toEqual(0);
    expect(
      getNumberOfChosenActionCards(individualChoicesEntity, '2026', '2')
    ).toEqual(2);
    // no participant in the choices -> 0
    expect(
      getNumberOfChosenActionCards(individualChoicesEntity, '2026', '3')
    ).toEqual(0);
  });
  it('should return already selected individual actionCardBatches', () => {
    const returnedActionCardsBatchIds = selectCheckedIndividualActionCardsBatchIdsFromRounds(
      { entities: { roundConfig: roundConfigEntity } }
    );
    expect(returnedActionCardsBatchIds).toEqual(['1', '2']);
  });
  it('should return already selected collective actionCardBatches', () => {
    const returnedActionCardsBatchIds = selectCheckedCollectiveActionCardsBatchIdsFromRounds(
      { entities: { roundConfig: roundConfigEntity } }
    );
    expect(returnedActionCardsBatchIds).toEqual(['10']);
  });
  it('should return only not null actionCardBatchIds', () => {
    const roundConfigEntityWithNullActionCardBatchIds = {
      '2020': {
        actionCardType: 'individual',
        targetedYear: 2023,
        individualBudget: 4,
        actionCardBatchIds: ['1'],
      },
      '2026': {
        actionCardType: 'individual',
        targetedYear: 2029,
        individualBudget: 6,
        actionCardBatchIds: [null],
      },
    };
    const returnedActionCardsBatchIds = selectCheckedIndividualActionCardsBatchIdsFromRounds(
      { entities: { roundConfig: roundConfigEntityWithNullActionCardBatchIds } }
    );
    expect(returnedActionCardsBatchIds).toEqual(['1']);
  });
});
