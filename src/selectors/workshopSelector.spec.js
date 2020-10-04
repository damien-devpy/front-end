import {
  getAllIndividualChoicesForParticipant,
  getCostOfChosenActionCards,
  getInitRoundBudget,
  getNumberOfChosenActionCards,
  selectCarbonFootprintsEntityForCurrentRound,
  selectCarbonFootprintsEntityForRound,
  selectCheckedCollectiveActionCardsBatchIdsFromRounds,
  selectCheckedIndividualActionCardsBatchIdsFromRounds,
  selectCitizenCarbonFootprintsEntityForCurrentRound,
  selectCitizenCarbonFootprintsEntityForRound,
  selectIsWorkshopReadyForInitialization,
  selectNextRound,
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
    actionCardIds: [4, 2],
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

const workshop = {
  entities: {
    roundConfig: roundConfigEntity,
    individualChoices: individualChoicesEntity,
    actionCards: actionCardsEntity,
  },
  result: { currentYear: 2020 },
};
const state = {
  workshop,
};

describe('Workshop selector', () => {
  describe('Test selectNextRound', () => {
    test('should return next round', () => {
      const result = selectNextRound(state);
      expect(result).toEqual(2023);
    });
  });

  describe('Test getAllIndividualChoicesForParticipant', () => {
    it('should return array of individual actions for participant 1', () => {
      const result = getAllIndividualChoicesForParticipant(
        1,
        roundConfigEntity,
        individualChoicesEntity
      );
      const expected = [2, 2, 4];
      expect(result.sort()).toEqual(expected.sort());
    });
    it('should return array of individual actions for participant 2', () => {
      const result = getAllIndividualChoicesForParticipant(
        2,
        roundConfigEntity,
        individualChoicesEntity
      );
      const expected = [3, 4, 6];
      expect(result).toEqual(expected);
    });
    it('should return empty array for inexisting participant (3)', () => {
      const result = getAllIndividualChoicesForParticipant(
        3,
        roundConfigEntity,
        individualChoicesEntity
      );
      const expected = [];
      expect(result).toEqual(expected);
    });
    it('should return empty array if there is no param', () => {
      const result = getAllIndividualChoicesForParticipant();
      const expected = [];
      expect(result).toEqual(expected);
    });
  });
  it('should calculate remaining budget for all participants', () => {
    const roundBudget = getInitRoundBudget(
      roundConfigEntity,
      individualChoicesEntity,
      participantIds,
      actionCardsEntity
    );
    // remaing budget for participant 1 =
    // (2020.budget + 2026.budget) - (2.cost + 4.cost + 2.cost) = 10 - 6 = 1
    expect(roundBudget[1]).toEqual(1);
    // cost for participant 2 =
    // (2020.budget + 2026.budget) - (3.cost + 4.cost + 6.cost) = 10 - 6 = 4
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
      { workshop: { entities: { roundConfig: roundConfigEntity } } }
    );
    expect(returnedActionCardsBatchIds).toEqual(['1', '2']);
  });
  it('should return already selected collective actionCardBatches', () => {
    const returnedActionCardsBatchIds = selectCheckedCollectiveActionCardsBatchIdsFromRounds(
      { workshop: { entities: { roundConfig: roundConfigEntity } } }
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
      {
        workshop: {
          entities: {
            roundConfig: roundConfigEntityWithNullActionCardBatchIds,
          },
        },
      }
    );
    expect(returnedActionCardsBatchIds).toEqual(['1']);
  });

  describe('Check selectIsWorkshopReadyForInitialization works', () => {
    it('should return false if all statuses are not "ready"', () => {
      const localState = {
        workshop: {
          entities: {
            participants: {
              1: {
                status: 'ready',
              },
              2: {
                status: 'notready',
              },
            },
          },
          result: { participants: [1, 2] },
        },
      };
      expect(selectIsWorkshopReadyForInitialization(localState)).toBe(false);
    });
    it('should return true if al statuses are "ready"', () => {
      const localState = {
        workshop: {
          entities: {
            participants: {
              1: {
                status: 'ready',
              },
              2: {
                status: 'ready',
              },
            },
          },
          result: { participants: [1, 2] },
        },
      };
      expect(selectIsWorkshopReadyForInitialization(localState)).toBe(true);
    });
    it('should return false if the list of participants is empty', () => {
      const localState = {
        workshop: {
          result: { participants: [] },
        },
      };
      expect(selectIsWorkshopReadyForInitialization(localState)).toBe(false);
    });
    it('should return false if there is no participants object', () => {
      const localState = { workshop: {} };
      expect(selectIsWorkshopReadyForInitialization(localState)).toBe(false);
    });
    it('should return false if there is no workshop parameter', () => {
      expect(selectIsWorkshopReadyForInitialization()).toBe(false);
    });
  });
  describe('Check selectCarbonFootprintsEntityForRound and selectCitizenCarbonFootprintsEntityForRound', () => {
    const carbonFootprints2020 = ['2020-1', '2020-2'];
    const carbonFootprints2023 = ['2023-1', '2023-2'];
    const roundsEntity = {
      2020: {
        carbonFootprints: carbonFootprints2020,
        citizenCarbonFootprints: carbonFootprints2020,
      },
      2023: {
        carbonFootprints: carbonFootprints2023,
        citizenCarbonFootprints: carbonFootprints2023,
      },
    };
    const carbonFootprintsEntity2020 = {
      '2020-1': {
        participantId: 1,
        footprint: {
          name: 'transport',
          children: [
            {
              name: 'bus',
              cfKey: 'cf_bus',
              value: 2000,
            },
            {
              name: 'plane',
              cfKey: 'cf_plane',
              value: 200000,
            },
          ],
          value: 202000,
        },
      },
      '2020-2': {
        participantId: 2,
        footprint: {
          name: 'transport',
          children: [
            {
              name: 'bus',
              cfKey: 'cf_bus',
              value: 1000,
            },
            {
              name: 'plane',
              cfKey: 'cf_plane',
              value: 100000,
            },
          ],
          value: 101000,
        },
      },
    };
    const carbonFootprintsEntity2023 = {
      '2023-1': {
        participantId: 1,
        footprint: {
          name: 'transport',
          children: [
            {
              name: 'bus',
              cfKey: 'cf_bus',
              value: 500,
            },
            {
              name: 'plane',
              cfKey: 'cf_plane',
              value: 50000,
            },
          ],
          value: 50500,
        },
      },
      '2023-2': {
        participantId: 2,
        footprint: {
          name: 'transport',
          children: [
            {
              name: 'bus',
              cfKey: 'cf_bus',
              value: 100,
            },
            {
              name: 'plane',
              cfKey: 'cf_plane',
              value: 10000,
            },
          ],
          value: 10100,
        },
      },
    };

    const carbonFootprintsEntity = {
      ...carbonFootprintsEntity2020,
      ...carbonFootprintsEntity2023,
    };

    const localState = {
      workshop: {
        entities: {
          rounds: roundsEntity,
          carbonFootprints: carbonFootprintsEntity,
          citizenCarbonFootprints: carbonFootprintsEntity,
        },
        result: {
          currentYear: 2020,
        },
      },
    };
    it('should return carbonFootprints for round 2020', () => {
      const result = selectCarbonFootprintsEntityForRound(localState, 2020);
      expect(result).toEqual(carbonFootprintsEntity2020);
    });
    it('should return carbonFootprints for round 2023', () => {
      const result = selectCarbonFootprintsEntityForRound(localState, 2023);
      expect(result).toEqual(carbonFootprintsEntity2023);
    });
    it('should return empty carbonFootprints for round 2026', () => {
      const result = selectCarbonFootprintsEntityForRound(localState, 2026);
      expect(result).toEqual({});
    });
    it('should return empty carbonFootprints if there is no parameter', () => {
      const result = selectCarbonFootprintsEntityForRound();
      expect(result).toEqual({});
    });
    it('should return carbonFootprints for current round', () => {
      const result = selectCarbonFootprintsEntityForCurrentRound(localState);
      expect(result).toEqual(carbonFootprintsEntity2020);
    });
    it('should return citizenCarbonFootprints for round 2020', () => {
      const result = selectCitizenCarbonFootprintsEntityForRound(
        localState,
        2020
      );
      expect(result).toEqual(carbonFootprintsEntity2020);
    });
    it('should return citizenCarbonFootprints for round 2023', () => {
      const result = selectCitizenCarbonFootprintsEntityForRound(
        localState,
        2023
      );
      expect(result).toEqual(carbonFootprintsEntity2023);
    });
    it('should return empty citizenCarbonFootprints for round 2026', () => {
      const result = selectCitizenCarbonFootprintsEntityForRound(
        localState,
        2026
      );
      expect(result).toEqual({});
    });
    it('should return empty citizenCarbonFootprints if there is no parameter', () => {
      const result = selectCitizenCarbonFootprintsEntityForRound();
      expect(result).toEqual({});
    });
    it('should return citizenCarbonFootprints for current round', () => {
      const result = selectCitizenCarbonFootprintsEntityForCurrentRound(
        localState
      );
      expect(result).toEqual(carbonFootprintsEntity2020);
    });
  });
});
