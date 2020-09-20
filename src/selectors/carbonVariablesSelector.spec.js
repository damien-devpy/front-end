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
          name: 'transports',
          children: [
            {
              name: 'plane',
              cfKey: 'cf_plane',
              value: 2,
            },
          ],
        },
        {
          name: 'transports',
          children: [
            {
              name: 'plane',
              cfKey: 'cf_boat',
              value: 0,
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
      const expectedVariablesArray = new Set(['kmPlane', 'EI_PLANE']);
      expect(actualVariablesArray).toEqual(expectedVariablesArray);
    });
    test('should list all variables used to compute this CfKey', () => {
      const actualVariablesArray = selectVariablesUsedInCfKey(
        state,
        'cf_car_commute'
      );
      const expectedVariablesArray = new Set([
        'kmCarCommutePerYear',
        'categoryCarCommute',
        'motorTypeCarCommute',
        'ageCategoryCarCommute',
        'coefficientEnergyEfficientDriving',
        'passengersPerCarCommute',
      ]);
      expect(actualVariablesArray).toEqual(expectedVariablesArray);
    });
  });
  describe('test selectFootprintValue ', () => {
    test('Works for easy case', () => {
      const actualValue = selectFootprintValue(state, 1, 2020, 'cf_plane');
      expect(actualValue).toBe(2);
    });
    test('Work s with 0 value', () => {
      const actualValue = selectFootprintValue(state, 1, 2020, 'cf_boat');
      expect(actualValue).toBe(0);
    });
    test('Works with root', () => {
      const actualValue = selectFootprintValue(state, 1, 2020, 'cf_plane');
      expect(actualValue).toBe(2);
    });
  });
});
