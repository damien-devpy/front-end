import { getInitRoundBudget } from './workshopSelector';

describe('Workshop selector', () => {
  it('should calculate remaining budget for all participants', () => {
    const roundsConfigEntity = {
      '2020': {
        actionCardType: 'individual',
        targetedYear: 2023,
        budget: 4,
        actionCardBatchIds: ['1'],
      },
      '2023': {
        actionCardType: 'collective',
        targetedYear: 2026,
        budget: 4,
        actionCardBatchIds: ['10'],
      },
      '2026': {
        actionCardType: 'individual',
        targetedYear: 2029,
        budget: 4,
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
        actionCardIds: [6],
      },
    };
    const actionCardsEntity = {
      '2': {
        id: 2,
        cost: 3,
      },
      '3': {
        id: 3,
        cost: 2,
      },
      '4': {
        id: 4,
        cost: 3,
      },
      '6': {
        id: 6,
        cost: 1,
      },
    };
    const roundBudget = getInitRoundBudget(
      roundsConfigEntity,
      individualChoicesEntity,
      participantIds,
      actionCardsEntity
    );
    // cost for participant 1 = action 2.cost + action 4.cost = 6
    expect(roundBudget[1]).toEqual(6);
    // cost for participant 2 = action 3.cost + action 6.cost = 9
    expect(roundBudget[2]).toEqual(9);
  });
});
