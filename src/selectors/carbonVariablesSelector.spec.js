import {
  selectFootprintValue,
  selectVariablesUsedInCfKey,
} from './carbonVariablesSelector';

const carbonFootprints = {
  '2020-1': {
    participantId: '1',
    footprint: {
      name: 'totalFootprint',
      value: 17,
      children: [
        {
          name: 'transports_1',
          children: [
            {
              name: 'plane',
              cfKey: 'cf_plane',
              value: 2,
            },
          ],
        },
        {
          name: 'transports_2',
          children: [
            {
              name: 'boat',
              cfKey: 'cf_boat',
              value: 0,
            },
            {
              name: 'other',
              cfKey: 'cf_other',
              value: 3,
            },
          ],
        },
      ],
    },
  },
};

const variableFormulas = {
  cf_plane: {
    '*': [
      {
        var: 'kmPlane',
      },
      {
        var: 'EI_PLANE',
      },
    ],
  },
  cf_car_commute: {
    '/': [
      {
        '*': [
          { var: 'kmCarCommutePerYear' },
          {
            var: {
              cat: [
                'EI_CAR.',
                {
                  var: 'categoryCarCommute',
                },
                '.',
                {
                  var: 'motorTypeCarCommute',
                },
              ],
            },
          },
          {
            var: {
              cat: [
                'MOTOR_AGING_FACTOR.',
                {
                  var: 'motorTypeCarCommute',
                },
                '.',
                {
                  var: 'ageCategoryCarCommute',
                },
              ],
            },
          },
          {
            var: 'coefficientEnergyEfficientDriving',
          },
        ],
      },
      {
        var: 'passengersPerCarCommute',
      },
    ],
  },
};
const model = {
  variableFormulas,
};

const workshop = {
  entities: { carbonFootprints },
  result: { model },
};
const state = {
  workshop,
};

describe('carbonVariablesSelector', () => {
  describe('Test selectVariablesUsedInCfKey', () => {
    test('should list all variables used to compute this CfKey', () => {
      const actualVariablesArray = selectVariablesUsedInCfKey(
        state,
        'cf_plane'
      );
      const expectedVariablesArray = ['kmPlane', 'EI_PLANE'];
      expect(actualVariablesArray.sort()).toEqual(
        expectedVariablesArray.sort()
      );
    });
    test('should list all variables used to compute this CfKey', () => {
      const actualVariablesArray = selectVariablesUsedInCfKey(
        state,
        'cf_car_commute'
      );
      const expectedVariablesArray = [
        'kmCarCommutePerYear',
        'categoryCarCommute',
        'motorTypeCarCommute',
        'ageCategoryCarCommute',
        'coefficientEnergyEfficientDriving',
        'passengersPerCarCommute',
      ];
      expect(actualVariablesArray.sort()).toEqual(
        expectedVariablesArray.sort()
      );
    });
  });
  describe('test selectFootprintValue ', () => {
    test('Returns correct value when given the name of a footprint category', () => {
      const actualValue = selectFootprintValue(state, 1, 2020, 'plane');
      expect(actualValue).toBe(2);
    });
    test('Returns 0 if value is 0', () => {
      const actualValue = selectFootprintValue(state, 1, 2020, 'boat');
      expect(actualValue).toBe(0);
    });
    test('Returns null if not found', () => {
      const actualValue = selectFootprintValue(state, 1, 2020, 'missing_name');
      expect(actualValue).toBe(null);
    });
  });
});
