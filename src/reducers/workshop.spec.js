import workshopReducer from './workshop';
import { DELETE_WORKSHOP } from '../actions/workshops';

describe('Test effect of redux actions related to model on the workshop state', () => {
  test('Action COMPUTE_FOOTPRINTS computes all footprints and leaves everything else unchanged.', () => {
    const initialState = {
      entities: {
        carbonVariables: {
          '2020-1': {
            participantId: 1,
            variables: {
              km_bus: 200,
              km_plane: 2000,
            },
          },
          '2020-2': {
            participantId: 2,
            variables: {
              km_bus: 200,
              km_plane: 2000,
            },
          },
          '2023-1': {
            participantId: 1,
            variables: {
              km_bus: 200,
              km_plane: 1000,
            },
          },
          '2023-2': {
            participantId: 2,
            variables: {
              km_bus: 200,
              km_plane: 4000,
            },
          },
        },
        globalCarbonVariables: {
          2020: {
            WEEKS_PER_YEAR: 52,
            DAYS_PER_YEAR: 365,
            DAYS_PER_WEEK: 7,
            MONTHS_PER_YEAR: 12,
            EI_BUS: 10,
            EI_PLANE: 100,
          },
          2023: {
            WEEKS_PER_YEAR: 52,
            DAYS_PER_YEAR: 365,
            DAYS_PER_WEEK: 7,
            MONTHS_PER_YEAR: 12,
            EI_BUS: 10,
            EI_PLANE: 100,
          },
        },
        carbonFootprints: {
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
        },
        roundConfig: {
          2020: {
            actionCardType: 'individual',
            targetedYear: 2023,
            budget: 4,
            actionCardBatchIds: [1, 2],
          },
        },
        rounds: {
          2020: {
            year: 2020,
            globalCarbonVariables: 2020,
            carbonVariables: ['2020-1', '2020-2'],
            carbonFootprints: ['2020-1', '2020-2'],
            roundConfig: '2020',
          },
          2023: {
            year: 2023,
            globalCarbonVariables: 2023,
            carbonVariables: ['2023-1', '2023-2'],
          },
        },
        participants: {
          1: {
            id: 1,
            firstName: 'Emmanuel',
            lastName: 'Macron',
            email: 'emacron@elysees.fr',
            role: 'participant',
            status: 'registered',
            carbonFootprintId: '123456',
            surveyVariables: {
              hours_urban_bus_per_week: 5,
              km_car_commute_per_day: 25,
            },
          },
          2: {
            id: 2,
            firstName: 'Brigitte',
            lastName: 'Macron',
            email: 'bmacron@elysees.fr',
            role: 'participant',
            status: 'registered',
            carbonFootprintId: '123456678',
            surveyVariables: {
              hours_urban_bus_per_week: 5,
              km_car_commute_per_day: 25,
            },
          },
        },
      },
      result: {
        workshopId: '987654321',
        model: {
          footprintStructure: {
            name: 'transport',
            children: [
              {
                name: 'bus',
                cfKey: 'cf_bus',
              },
              {
                name: 'plane',
                cfKey: 'cf_plane',
              },
            ],
          },
          variableFormulas: {
            cf_bus: {
              '*': [{ var: 'km_bus' }, { var: 'EI_BUS' }],
            },
            cf_plane: {
              '*': [{ var: 'km_plane' }, { var: 'EI_PLANE' }],
            },
          },
          actionCards: [1],
          actionCardBatches: [1],
        },
        participants: [1, 2],
        rounds: [2020],
      },
    };
    const action = {
      type: 'COMPUTE_FOOTPRINTS',
      payload: { year: 2023 },
    };
    const expectedState = {
      entities: {
        carbonVariables: {
          '2020-1': {
            participantId: 1,
            variables: {
              km_bus: 200,
              km_plane: 2000,
            },
          },
          '2020-2': {
            participantId: 2,
            variables: {
              km_bus: 200,
              km_plane: 2000,
            },
          },
          '2023-1': {
            participantId: 1,
            variables: {
              km_bus: 200,
              km_plane: 1000,
            },
          },
          '2023-2': {
            participantId: 2,
            variables: {
              km_bus: 200,
              km_plane: 4000,
            },
          },
        },
        globalCarbonVariables: {
          2020: {
            WEEKS_PER_YEAR: 52,
            DAYS_PER_YEAR: 365,
            DAYS_PER_WEEK: 7,
            MONTHS_PER_YEAR: 12,
            EI_BUS: 10,
            EI_PLANE: 100,
          },
          2023: {
            WEEKS_PER_YEAR: 52,
            DAYS_PER_YEAR: 365,
            DAYS_PER_WEEK: 7,
            MONTHS_PER_YEAR: 12,
            EI_BUS: 10,
            EI_PLANE: 100,
          },
        },
        carbonFootprints: {
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
          '2023-1': {
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
                  value: 100000,
                },
              ],
              value: 102000,
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
                  value: 2000,
                },
                {
                  name: 'plane',
                  cfKey: 'cf_plane',
                  value: 400000,
                },
              ],
              value: 402000,
            },
          },
        },
        roundConfig: {
          2020: {
            actionCardType: 'individual',
            targetedYear: 2023,
            budget: 4,
            actionCardBatchIds: [1, 2],
          },
        },
        rounds: {
          2020: {
            year: 2020,
            globalCarbonVariables: 2020,
            carbonVariables: ['2020-1', '2020-2'],
            carbonFootprints: ['2020-1', '2020-2'],
            roundConfig: '2020',
          },
          2023: {
            year: 2023,
            globalCarbonVariables: 2023,
            carbonVariables: ['2023-1', '2023-2'],
            carbonFootprints: ['2023-1', '2023-2'],
          },
        },
        participants: {
          1: {
            id: 1,
            firstName: 'Emmanuel',
            lastName: 'Macron',
            email: 'emacron@elysees.fr',
            role: 'participant',
            status: 'registered',
            carbonFootprintId: '123456',
            surveyVariables: {
              hours_urban_bus_per_week: 5,
              km_car_commute_per_day: 25,
            },
          },
          2: {
            id: 2,
            firstName: 'Brigitte',
            lastName: 'Macron',
            email: 'bmacron@elysees.fr',
            role: 'participant',
            status: 'registered',
            carbonFootprintId: '123456678',
            surveyVariables: {
              hours_urban_bus_per_week: 5,
              km_car_commute_per_day: 25,
            },
          },
        },
      },
      result: {
        workshopId: '987654321',
        model: {
          footprintStructure: {
            name: 'transport',
            children: [
              {
                name: 'bus',
                cfKey: 'cf_bus',
              },
              {
                name: 'plane',
                cfKey: 'cf_plane',
              },
            ],
          },
          variableFormulas: {
            cf_bus: {
              '*': [{ var: 'km_bus' }, { var: 'EI_BUS' }],
            },
            cf_plane: {
              '*': [{ var: 'km_plane' }, { var: 'EI_PLANE' }],
            },
          },
          actionCards: [1],
          actionCardBatches: [1],
        },
        participants: [1, 2],
        rounds: [2020],
      },
    };

    const result = workshopReducer(initialState, action);
    expect(result).toStrictEqual(expectedState);
  });
  test('Action APPLY_INDIVIDUAL_ACTIONS applies selected actions and computes carbonVariables', () => {
    const initialState = {
      entities: {
        carbonVariables: {
          '2020-1': {
            participantId: 1,
            variables: {
              km_bus: 200,
              km_plane: 2000,
            },
          },
          '2020-2': {
            participantId: 2,
            variables: {
              km_bus: 200,
              km_plane: 2000,
            },
          },
          '2020-3': {
            participantId: 3,
            variables: {
              km_bus: 200,
              km_plane: 2000,
            },
          },
        },
        carbonFootprints: {
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
          '2020-3': {
            participantId: 3,
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
        },
        globalCarbonVariables: {
          2020: {
            WEEKS_PER_YEAR: 52,
            DAYS_PER_YEAR: 365,
            DAYS_PER_WEEK: 7,
            MONTHS_PER_YEAR: 12,
            EI_BUS: 10,
            EI_PLANE: 100,
          },
        },
        roundConfig: {
          2020: {
            actionCardType: 'individual',
            targetedYear: 2023,
            budget: 4,
            actionCardBatchIds: [1, 2],
          },
        },
        rounds: {
          2020: {
            year: 2020,
            carbonVariables: ['2020-1', '2020-2', '2020-3'],
            carbonFootprints: ['2020-1', '2020-2', '2020-3'],
            roundConfig: '2020',
          },
          2023: {
            year: 2023,
          },
        },
        participants: {
          1: {
            id: 1,
            firstName: 'Emmanuel',
            lastName: 'Macron',
            email: 'emacron@elysees.fr',
            role: 'participant',
            status: 'registered',
            carbonFootprintId: '123456',
            surveyVariables: {
              hours_urban_bus_per_week: 5,
              km_car_commute_per_day: 25,
            },
          },
          2: {
            id: 2,
            firstName: 'Brigitte',
            lastName: 'Macron',
            email: 'bmacron@elysees.fr',
            role: 'participant',
            status: 'registered',
            carbonFootprintId: '123456678',
            surveyVariables: {
              hours_urban_bus_per_week: 5,
              km_car_commute_per_day: 25,
            },
          },
          3: {
            id: 3,
            firstName: 'Barack',
            lastName: 'Obama',
            email: 'oba@whitehouse.fr',
            role: 'participant',
            status: 'registered',
            carbonFootprintId: '123456679',
            surveyVariables: {
              hours_urban_bus_per_week: 5,
              km_car_commute_per_day: 25,
            },
          },
        },
        actionCards: {
          less_plane: {
            id: 'less_plane',
            cost: 2,
            operations: [
              {
                variable: 'km_plane',
                operation: { '/': [{ var: 'km_plane' }, 2] },
              },
            ],
          },
          plane_to_bus: {
            id: 'plane_to_bus',
            cost: 2,
            operations: [
              {
                variable: 'km_plane',
                operation: { '/': [{ var: 'km_plane' }, 2] },
              },
              {
                variable: 'km_bus',
                operation: {
                  '+': [{ var: 'km_bus' }, { '/': [{ var: 'km_plane' }, 2] }],
                },
              },
            ],
          },
        },
        individualChoices: {
          '2020-1': {
            key: '2020-1',
            participantId: 1,
            actionCardIds: ['plane_to_bus'],
          },
          '2020-2': {
            key: '2020-2',
            participantId: 2,
            actionCardIds: ['less_plane'],
          },
          '2020-3': {
            key: '2020-3',
            participantId: 3,
            actionCardIds: ['less_plane', 'plane_to_bus'],
          },
        },
      },
      result: {
        workshopId: '987654321',
        model: {
          footprintStructure: {
            name: 'transport',
            children: [
              {
                name: 'bus',
                cfKey: 'cf_bus',
              },
              {
                name: 'plane',
                cfKey: 'cf_plane',
              },
            ],
          },
          variableFormulas: {
            cf_bus: {
              '*': [{ var: 'km_bus' }, { var: 'EI_BUS' }],
            },
            cf_plane: {
              '*': [{ var: 'km_plane' }, { var: 'EI_PLANE' }],
            },
          },
          actionCards: [1],
          actionCardBatches: [1],
        },
        participants: [1, 2, 3],
        rounds: [2020],
      },
    };
    const action = {
      type: 'APPLY_INDIVIDUAL_ACTIONS',
      payload: { yearFrom: 2020, yearTo: 2023 },
    };
    const expectedState = {
      entities: {
        carbonVariables: {
          '2020-1': {
            participantId: 1,
            variables: {
              km_bus: 200,
              km_plane: 2000,
            },
          },
          '2020-2': {
            participantId: 2,
            variables: {
              km_bus: 200,
              km_plane: 2000,
            },
          },
          '2020-3': {
            participantId: 3,
            variables: {
              km_bus: 200,
              km_plane: 2000,
            },
          },
          '2023-1': {
            participantId: 1,
            variables: {
              km_bus: 1200,
              km_plane: 1000,
            },
          },
          '2023-2': {
            participantId: 2,
            variables: {
              km_bus: 200,
              km_plane: 1000,
            },
          },
          '2023-3': {
            participantId: 3,
            variables: {
              km_bus: 700,
              km_plane: 500,
            },
          },
        },
        carbonFootprints: {
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
          '2020-3': {
            participantId: 3,
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
        },
        globalCarbonVariables: {
          2020: {
            WEEKS_PER_YEAR: 52,
            DAYS_PER_YEAR: 365,
            DAYS_PER_WEEK: 7,
            MONTHS_PER_YEAR: 12,
            EI_BUS: 10,
            EI_PLANE: 100,
          },
          2023: {
            WEEKS_PER_YEAR: 52,
            DAYS_PER_YEAR: 365,
            DAYS_PER_WEEK: 7,
            MONTHS_PER_YEAR: 12,
            EI_BUS: 10,
            EI_PLANE: 100,
          },
        },
        roundConfig: {
          2020: {
            actionCardType: 'individual',
            targetedYear: 2023,
            budget: 4,
            actionCardBatchIds: [1, 2],
          },
        },
        rounds: {
          2020: {
            year: 2020,
            carbonVariables: ['2020-1', '2020-2', '2020-3'],
            carbonFootprints: ['2020-1', '2020-2', '2020-3'],
            roundConfig: '2020',
          },
          2023: {
            year: 2023,
            carbonVariables: ['2023-1', '2023-2', '2023-3'],
          },
        },
        participants: {
          1: {
            id: 1,
            firstName: 'Emmanuel',
            lastName: 'Macron',
            email: 'emacron@elysees.fr',
            role: 'participant',
            status: 'registered',
            carbonFootprintId: '123456',
            surveyVariables: {
              hours_urban_bus_per_week: 5,
              km_car_commute_per_day: 25,
            },
          },
          2: {
            id: 2,
            firstName: 'Brigitte',
            lastName: 'Macron',
            email: 'bmacron@elysees.fr',
            role: 'participant',
            status: 'registered',
            carbonFootprintId: '123456678',
            surveyVariables: {
              hours_urban_bus_per_week: 5,
              km_car_commute_per_day: 25,
            },
          },
          3: {
            id: 3,
            firstName: 'Barack',
            lastName: 'Obama',
            email: 'oba@whitehouse.fr',
            role: 'participant',
            status: 'registered',
            carbonFootprintId: '123456679',
            surveyVariables: {
              hours_urban_bus_per_week: 5,
              km_car_commute_per_day: 25,
            },
          },
        },
        actionCards: {
          less_plane: {
            id: 'less_plane',
            cost: 2,
            operations: [
              {
                variable: 'km_plane',
                operation: { '/': [{ var: 'km_plane' }, 2] },
              },
            ],
          },
          plane_to_bus: {
            id: 'plane_to_bus',
            cost: 2,
            operations: [
              {
                variable: 'km_plane',
                operation: { '/': [{ var: 'km_plane' }, 2] },
              },
              {
                variable: 'km_bus',
                operation: {
                  '+': [{ var: 'km_bus' }, { '/': [{ var: 'km_plane' }, 2] }],
                },
              },
            ],
          },
        },
        individualChoices: {
          '2020-1': {
            key: '2020-1',
            participantId: 1,
            actionCardIds: ['plane_to_bus'],
          },
          '2020-2': {
            key: '2020-2',
            participantId: 2,
            actionCardIds: ['less_plane'],
          },
          '2020-3': {
            key: '2020-3',
            participantId: 3,
            actionCardIds: ['less_plane', 'plane_to_bus'],
          },
        },
      },
      result: {
        workshopId: '987654321',
        model: {
          footprintStructure: {
            name: 'transport',
            children: [
              {
                name: 'bus',
                cfKey: 'cf_bus',
              },
              {
                name: 'plane',
                cfKey: 'cf_plane',
              },
            ],
          },
          variableFormulas: {
            cf_bus: {
              '*': [{ var: 'km_bus' }, { var: 'EI_BUS' }],
            },
            cf_plane: {
              '*': [{ var: 'km_plane' }, { var: 'EI_PLANE' }],
            },
          },
          actionCards: [1],
          actionCardBatches: [1],
        },
        participants: [1, 2, 3],
        rounds: [2020],
      },
    };
    const result = workshopReducer(initialState, action);
    expect(result).toStrictEqual(expectedState);
  });
  describe('Action APPLY_COLLECTIVE_ACTIONS applies selected actions and computes carbonVariables', () => {
    test('Actions that apply to everyone', () => {
      const initialState = {
        entities: {
          carbonVariables: {
            '2020-1': {
              participantId: 1,
              variables: {
                km_bus: 200,
                km_plane: 2000,
              },
            },
            '2020-2': {
              participantId: 2,
              variables: {
                km_bus: 200,
                km_plane: 2000,
              },
            },
            '2023-1': {
              participantId: 1,
              variables: {
                km_bus: 200,
                km_plane: 2000,
              },
            },
            '2023-2': {
              participantId: 2,
              variables: {
                km_bus: 200,
                km_plane: 2000,
              },
            },
          },
          globalCarbonVariables: {
            2020: {
              WEEKS_PER_YEAR: 52,
              DAYS_PER_YEAR: 365,
              DAYS_PER_WEEK: 7,
              MONTHS_PER_YEAR: 12,
              EI_BUS: 10,
              EI_PLANE: 100,
            },
          },
          carbonFootprints: {
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
          },
          roundConfig: {
            2020: {
              actionCardType: 'collective',
              targetedYear: 2023,
              budget: 4,
              actionCardBatchIds: [1, 2],
            },
          },
          rounds: {
            2020: {
              year: 2020,
              carbonVariables: ['2020-1', '2020-2'],
              carbonFootprints: ['2020-1', '2020-2'],
              globalCarbonVariables: 2020,
              roundConfig: '2020',
            },
            2023: {
              year: 2023,
              roundConfig: '2023',
            },
          },
          participants: {
            1: {
              id: 1,
              firstName: 'Emmanuel',
              lastName: 'Macron',
              email: 'emacron@elysees.fr',
              role: 'participant',
              status: 'registered',
              carbonFootprintId: '123456',
              surveyVariables: {
                hours_urban_bus_per_week: 5,
                km_car_commute_per_day: 25,
              },
            },
            2: {
              id: 2,
              firstName: 'Brigitte',
              lastName: 'Macron',
              email: 'bmacron@elysees.fr',
              role: 'participant',
              status: 'registered',
              carbonFootprintId: '123456678',
              surveyVariables: {
                hours_urban_bus_per_week: 5,
                km_car_commute_per_day: 25,
              },
            },
          },
          actionCards: {
            plane_forbidden: {
              id: 'plane_forbidden',
              cost: 2,
              type: 'collective',
              impactType: 'everyone',
              operations: [
                {
                  variable: 'km_plane',
                  operation: 0,
                },
              ],
            },
          },
          collectiveChoices: {
            2020: {
              key: 2020,
              actionCardIds: ['plane_forbidden'],
            },
          },
        },
        result: {
          workshopId: '987654321',
          model: {
            footprintStructure: {
              name: 'transport',
              children: [
                {
                  name: 'bus',
                  cfKey: 'cf_bus',
                },
                {
                  name: 'plane',
                  cfKey: 'cf_plane',
                },
              ],
            },
            variableFormulas: {
              cf_bus: {
                '*': [{ var: 'km_bus' }, { var: 'EI_BUS' }],
              },
              cf_plane: {
                '*': [{ var: 'km_plane' }, { var: 'EI_PLANE' }],
              },
            },
            actionCards: ['plane_forbidden'],
            actionCardBatches: [1],
          },
          participants: [1, 2],
          rounds: [2020],
        },
      };
      const action = {
        type: 'APPLY_COLLECTIVE_ACTIONS',
        payload: { yearFrom: 2020, yearTo: 2023 },
      };
      const expectedState = {
        entities: {
          carbonVariables: {
            '2020-1': {
              participantId: 1,
              variables: {
                km_bus: 200,
                km_plane: 2000,
              },
            },
            '2020-2': {
              participantId: 2,
              variables: {
                km_bus: 200,
                km_plane: 2000,
              },
            },
            '2023-1': {
              participantId: 1,
              variables: {
                km_bus: 200,
                km_plane: 0,
              },
            },
            '2023-2': {
              participantId: 2,
              variables: {
                km_bus: 200,
                km_plane: 0,
              },
            },
          },
          carbonFootprints: {
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
          },
          globalCarbonVariables: {
            2020: {
              WEEKS_PER_YEAR: 52,
              DAYS_PER_YEAR: 365,
              DAYS_PER_WEEK: 7,
              MONTHS_PER_YEAR: 12,
              EI_BUS: 10,
              EI_PLANE: 100,
            },
            2023: {
              WEEKS_PER_YEAR: 52,
              DAYS_PER_YEAR: 365,
              DAYS_PER_WEEK: 7,
              MONTHS_PER_YEAR: 12,
              EI_BUS: 10,
              EI_PLANE: 100,
            },
          },
          roundConfig: {
            2020: {
              actionCardType: 'collective',
              targetedYear: 2023,
              budget: 4,
              actionCardBatchIds: [1, 2],
            },
          },
          rounds: {
            2020: {
              year: 2020,
              carbonVariables: ['2020-1', '2020-2'],
              carbonFootprints: ['2020-1', '2020-2'],
              globalCarbonVariables: 2020,
              roundConfig: '2020',
            },
            2023: {
              year: 2023,
              carbonVariables: ['2023-1', '2023-2'],
              globalCarbonVariables: 2023,
              roundConfig: '2023',
            },
          },
          participants: {
            1: {
              id: 1,
              firstName: 'Emmanuel',
              lastName: 'Macron',
              email: 'emacron@elysees.fr',
              role: 'participant',
              status: 'registered',
              carbonFootprintId: '123456',
              surveyVariables: {
                hours_urban_bus_per_week: 5,
                km_car_commute_per_day: 25,
              },
            },
            2: {
              id: 2,
              firstName: 'Brigitte',
              lastName: 'Macron',
              email: 'bmacron@elysees.fr',
              role: 'participant',
              status: 'registered',
              carbonFootprintId: '123456678',
              surveyVariables: {
                hours_urban_bus_per_week: 5,
                km_car_commute_per_day: 25,
              },
            },
          },
          actionCards: {
            plane_forbidden: {
              id: 'plane_forbidden',
              cost: 2,
              type: 'collective',
              impactType: 'everyone',
              operations: [
                {
                  variable: 'km_plane',
                  operation: 0,
                },
              ],
            },
          },
          collectiveChoices: {
            2020: {
              key: 2020,
              actionCardIds: ['plane_forbidden'],
            },
          },
        },
        result: {
          workshopId: '987654321',
          model: {
            footprintStructure: {
              name: 'transport',
              children: [
                {
                  name: 'bus',
                  cfKey: 'cf_bus',
                },
                {
                  name: 'plane',
                  cfKey: 'cf_plane',
                },
              ],
            },
            variableFormulas: {
              cf_bus: {
                '*': [{ var: 'km_bus' }, { var: 'EI_BUS' }],
              },
              cf_plane: {
                '*': [{ var: 'km_plane' }, { var: 'EI_PLANE' }],
              },
            },
            actionCards: ['plane_forbidden'],
            actionCardBatches: [1],
          },
          participants: [1, 2],
          rounds: [2020],
        },
      };
      const result = workshopReducer(initialState, action);
      expect(result).toStrictEqual(expectedState);
    });
    test('Actions that apply globally', () => {
      const initialState = {
        entities: {
          carbonVariables: {
            '2020-1': {
              participantId: 1,
              variables: {
                km_bus: 200,
                km_plane: 2000,
              },
            },
            '2020-2': {
              participantId: 2,
              variables: {
                km_bus: 200,
                km_plane: 2000,
              },
            },
            '2023-1': {
              participantId: 1,
              variables: {
                km_bus: 200,
                km_plane: 2000,
              },
            },
            '2023-2': {
              participantId: 2,
              variables: {
                km_bus: 200,
                km_plane: 2000,
              },
            },
          },
          globalCarbonVariables: {
            2020: {
              WEEKS_PER_YEAR: 52,
              DAYS_PER_YEAR: 365,
              DAYS_PER_WEEK: 7,
              MONTHS_PER_YEAR: 12,
              EI_BUS: 10,
              EI_PLANE: 100,
            },
            2023: {
              WEEKS_PER_YEAR: 52,
              DAYS_PER_YEAR: 365,
              DAYS_PER_WEEK: 7,
              MONTHS_PER_YEAR: 12,
              EI_BUS: 5,
              EI_PLANE: 100,
            },
          },
          carbonFootprints: {
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
          },
          roundConfig: {
            2020: {
              actionCardType: 'collective',
              targetedYear: 2023,
              budget: 4,
              actionCardBatchIds: [1, 2],
            },
          },
          rounds: {
            2020: {
              year: 2020,
              carbonVariables: ['2020-1', '2020-2'],
              carbonFootprints: ['2020-1', '2020-2'],
              globalCarbonVariables: 2020,
              roundConfig: '2020',
            },
            2023: {
              year: 2023,
              roundConfig: '2023',
            },
          },
          participants: {
            1: {
              id: 1,
              firstName: 'Emmanuel',
              lastName: 'Macron',
              email: 'emacron@elysees.fr',
              role: 'participant',
              status: 'registered',
              carbonFootprintId: '123456',
              surveyVariables: {
                hours_urban_bus_per_week: 5,
                km_car_commute_per_day: 25,
              },
            },
            2: {
              id: 2,
              firstName: 'Brigitte',
              lastName: 'Macron',
              email: 'bmacron@elysees.fr',
              role: 'participant',
              status: 'registered',
              carbonFootprintId: '123456678',
              surveyVariables: {
                hours_urban_bus_per_week: 5,
                km_car_commute_per_day: 25,
              },
            },
          },
          actionCards: {
            plane_forbidden: {
              id: 'plane_forbidden',
              cost: 2,
              type: 'collective',
              impactType: 'everyone',
              operations: [
                {
                  variable: 'km_plane',
                  operation: 0,
                },
              ],
            },
            clean_bus: {
              id: 'clean_bus',
              cost: 2,
              type: 'collective',
              impactType: 'global',
              operations: [
                {
                  variable: 'EI_BUS',
                  operation: { '/': [{ var: 'EI_BUS' }, 2] },
                },
              ],
            },
            cleaner_bus: {
              id: 'cleaner_bus',
              cost: 2,
              type: 'collective',
              impactType: 'global',
              operations: [
                {
                  variable: 'EI_BUS',
                  operation: { '/': [{ var: 'EI_BUS' }, 5] },
                },
              ],
            },
          },
          collectiveChoices: {
            2020: {
              key: 2020,
              actionCardIds: ['clean_bus', 'cleaner_bus'],
            },
          },
        },
        result: {
          workshopId: '987654321',
          model: {
            footprintStructure: {
              name: 'transport',
              children: [
                {
                  name: 'bus',
                  cfKey: 'cf_bus',
                },
                {
                  name: 'plane',
                  cfKey: 'cf_plane',
                },
              ],
            },
            variableFormulas: {
              cf_bus: {
                '*': [{ var: 'km_bus' }, { var: 'EI_BUS' }],
              },
              cf_plane: {
                '*': [{ var: 'km_plane' }, { var: 'EI_PLANE' }],
              },
            },
            actionCards: ['plane_forbidden'],
            actionCardBatches: [1],
          },
          participants: [1, 2],
          rounds: [2020],
        },
      };
      const action = {
        type: 'APPLY_COLLECTIVE_ACTIONS',
        payload: { yearFrom: 2020, yearTo: 2023 },
      };
      const expectedState = {
        entities: {
          carbonVariables: {
            '2020-1': {
              participantId: 1,
              variables: {
                km_bus: 200,
                km_plane: 2000,
              },
            },
            '2020-2': {
              participantId: 2,
              variables: {
                km_bus: 200,
                km_plane: 2000,
              },
            },
            '2023-1': {
              participantId: 1,
              variables: {
                km_bus: 200,
                km_plane: 2000,
              },
            },
            '2023-2': {
              participantId: 2,
              variables: {
                km_bus: 200,
                km_plane: 2000,
              },
            },
          },
          globalCarbonVariables: {
            2020: {
              WEEKS_PER_YEAR: 52,
              DAYS_PER_YEAR: 365,
              DAYS_PER_WEEK: 7,
              MONTHS_PER_YEAR: 12,
              EI_BUS: 10,
              EI_PLANE: 100,
            },
            2023: {
              WEEKS_PER_YEAR: 52,
              DAYS_PER_YEAR: 365,
              DAYS_PER_WEEK: 7,
              MONTHS_PER_YEAR: 12,
              EI_BUS: 1,
              EI_PLANE: 100,
            },
          },
          carbonFootprints: {
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
          },
          roundConfig: {
            2020: {
              actionCardType: 'collective',
              targetedYear: 2023,
              budget: 4,
              actionCardBatchIds: [1, 2],
            },
          },
          rounds: {
            2020: {
              year: 2020,
              carbonVariables: ['2020-1', '2020-2'],
              carbonFootprints: ['2020-1', '2020-2'],
              globalCarbonVariables: 2020,
              roundConfig: '2020',
            },
            2023: {
              year: 2023,
              roundConfig: '2023',
              carbonVariables: ['2023-1', '2023-2'],
              globalCarbonVariables: 2023,
            },
          },
          participants: {
            1: {
              id: 1,
              firstName: 'Emmanuel',
              lastName: 'Macron',
              email: 'emacron@elysees.fr',
              role: 'participant',
              status: 'registered',
              carbonFootprintId: '123456',
              surveyVariables: {
                hours_urban_bus_per_week: 5,
                km_car_commute_per_day: 25,
              },
            },
            2: {
              id: 2,
              firstName: 'Brigitte',
              lastName: 'Macron',
              email: 'bmacron@elysees.fr',
              role: 'participant',
              status: 'registered',
              carbonFootprintId: '123456678',
              surveyVariables: {
                hours_urban_bus_per_week: 5,
                km_car_commute_per_day: 25,
              },
            },
          },
          actionCards: {
            plane_forbidden: {
              id: 'plane_forbidden',
              cost: 2,
              type: 'collective',
              impactType: 'everyone',
              operations: [
                {
                  variable: 'km_plane',
                  operation: 0,
                },
              ],
            },
            clean_bus: {
              id: 'clean_bus',
              cost: 2,
              type: 'collective',
              impactType: 'global',
              operations: [
                {
                  variable: 'EI_BUS',
                  operation: { '/': [{ var: 'EI_BUS' }, 2] },
                },
              ],
            },
            cleaner_bus: {
              id: 'cleaner_bus',
              cost: 2,
              type: 'collective',
              impactType: 'global',
              operations: [
                {
                  variable: 'EI_BUS',
                  operation: { '/': [{ var: 'EI_BUS' }, 5] },
                },
              ],
            },
          },
          collectiveChoices: {
            2020: {
              key: 2020,
              actionCardIds: ['clean_bus', 'cleaner_bus'],
            },
          },
        },
        result: {
          workshopId: '987654321',
          model: {
            footprintStructure: {
              name: 'transport',
              children: [
                {
                  name: 'bus',
                  cfKey: 'cf_bus',
                },
                {
                  name: 'plane',
                  cfKey: 'cf_plane',
                },
              ],
            },
            variableFormulas: {
              cf_bus: {
                '*': [{ var: 'km_bus' }, { var: 'EI_BUS' }],
              },
              cf_plane: {
                '*': [{ var: 'km_plane' }, { var: 'EI_PLANE' }],
              },
            },
            actionCards: ['plane_forbidden'],
            actionCardBatches: [1],
          },
          participants: [1, 2],
          rounds: [2020],
        },
      };
      const result = workshopReducer(initialState, action);
      expect(result).toStrictEqual(expectedState);
    });
  });
  describe('Action DELETE_WORKSHOP should remove current workshop if it exists', () => {
    const defaultState = workshopReducer(undefined, {});
    test('Local workshop exists and is equals to the workshop to remove: It should be removed', () => {
      const initialState = {
        ...defaultState,
        result: {
          id: 1,
        },
      };
      const expectedState = defaultState;
      const action = {
        type: DELETE_WORKSHOP,
        payload: { workshopId: 1 },
      };
      const result = workshopReducer(initialState, action);
      expect(result).toStrictEqual(expectedState);
    });
    test('Local workshop exists and is different from the one to be removed: No change in state', () => {
      const initialState = {
        ...defaultState,
        result: {
          id: 1,
        },
      };
      const expectedState = initialState;
      const action = {
        type: DELETE_WORKSHOP,
        payload: { workshopId: 2 },
      };
      const result = workshopReducer(initialState, action);
      expect(result).toStrictEqual(expectedState);
    });
    test("Local workshop doesn't exists: No change in state", () => {
      const initialState = {
        ...defaultState,
      };
      const expectedState = initialState;
      const action = {
        type: DELETE_WORKSHOP,
        payload: { workshopId: 2 },
      };
      const result = workshopReducer(initialState, action);
      expect(result).toStrictEqual(expectedState);
    });
  });
});
