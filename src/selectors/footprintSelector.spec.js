import {
  computeEvolutionGraph,
  participantsAverageFootprint,
  selectCarbonFootprintAveragesGroupByRounds,
  selectIndividualCarbonFootprintReduction,
} from './footprintSelectors';

describe('Footprint selector', () => {
  describe('Compute Evolution graph', () => {
    test('Should return an empty array when parameters are empty', () => {
      const roundsEntity = {};
      const carbonFootprintsEntity = {};
      const citizenFootprintsEntity = {};
      const footprintStructure = {};
      const result = computeEvolutionGraph(
        roundsEntity,
        carbonFootprintsEntity,
        citizenFootprintsEntity,
        footprintStructure
      );
      const expected = [];
      expect(result).toStrictEqual(expected);
    });
    test('Should return for each round: the averages footprints of each participant, the global average and the participants average ', () => {
      const roundsEntity = {
        2020: {
          year: 2020,
          carbonFootprints: ['2020-1', '2020-2'],
          citizenCarbonFootprints: ['2020-1', '2020-2'],
        },
        2023: {
          year: 2023,
          carbonFootprints: ['2023-1', '2023-2'],
          citizenCarbonFootprints: ['2023-1', '2023-2'],
        },
      };
      const carbonFootprintsEntity = {
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
      const citizenFootprintsEntity = {
        '2020-1': {
          participantId: 1,
          footprint: {
            name: 'transport',
            children: [
              {
                name: 'bus',
                cfKey: 'cf_bus',
                value: 5000,
              },
              {
                name: 'plane',
                cfKey: 'cf_plane',
                value: 500000,
              },
            ],
            value: 505000,
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
        '2023-1': {
          participantId: 1,
          footprint: {
            name: 'transport',
            children: [
              {
                name: 'bus',
                cfKey: 'cf_bus',
                value: 300,
              },
              {
                name: 'plane',
                cfKey: 'cf_plane',
                value: 20000,
              },
            ],
            value: 20200,
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
      const footprintStructure = {
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
      };

      const result = computeEvolutionGraph(
        roundsEntity,
        carbonFootprintsEntity,
        citizenFootprintsEntity,
        footprintStructure
      );
      const expected = [
        {
          year: 2020,
          '1': 202,
          '2': 101,
          // (151500 * 0.1 + (505000 + 101000) / 2 * 0.9) = 287850
          avg_global: 287.85,
          // (202000 + 101000) / 2 = 151500
          avg_participants: 151.5,
        },
        {
          year: 2023,
          '1': 50.5,
          '2': 10.1,
          // (30300 * 0.1 + (20200 + 10100) / 2 * 0.9) = 16665
          avg_global: 16.67,
          // (50500 + 10100) / 2 = 30300
          avg_participants: 30.3,
        },
      ];
      expect(result).toStrictEqual(expected);
    });
    test('REFACTO: Should return for each round: the averages footprints of each participant, the global average and the participants average ', () => {
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
      };
      const roundsEntity = {
        2020: {
          year: 2020,
          carbonFootprints: ['2020-1', '2020-2'],
          citizenCarbonFootprints: ['2020-1', '2020-2'],
        },
        2023: {
          year: 2023,
          carbonFootprints: ['2023-1', '2023-2'],
          citizenCarbonFootprints: ['2023-1', '2023-2'],
        },
      };
      const carbonFootprintsEntity = {
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
      const citizenCarbonFootprintsEntity = {
        '2020-1': {
          participantId: 1,
          footprint: {
            name: 'transport',
            children: [
              {
                name: 'bus',
                cfKey: 'cf_bus',
                value: 5000,
              },
              {
                name: 'plane',
                cfKey: 'cf_plane',
                value: 500000,
              },
            ],
            value: 505000,
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
        '2023-1': {
          participantId: 1,
          footprint: {
            name: 'transport',
            children: [
              {
                name: 'bus',
                cfKey: 'cf_bus',
                value: 300,
              },
              {
                name: 'plane',
                cfKey: 'cf_plane',
                value: 20000,
              },
            ],
            value: 20200,
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
      const initState = {
        workshop: {
          entities: {
            roundConfig: roundConfigEntity,
            rounds: roundsEntity,
            carbonFootprints: carbonFootprintsEntity,
            citizenCarbonFootprints: citizenCarbonFootprintsEntity,
          },
          result: {
            currentYear: 2029,
            rounds: Object.keys(roundsEntity),
            participants: [1, 2],
          },
        },
      };
      const result = selectCarbonFootprintAveragesGroupByRounds(initState);

      const expected = [
        {
          year: 2020,
          '1': 202,
          '2': 101,
          // (151500 * 0.1 + (505000 + 101000) / 2 * 0.9) = 287850
          avg_global: 287.85,
          // (202000 + 101000) / 2 = 151500
          avg_participants: 151.5,
          avg_citizens: 303,
        },
        {
          year: 2023,
          '1': 50.5,
          '2': 10.1,
          // (30300 * 0.1 + (20200 + 10100) / 2 * 0.9) = 16665
          avg_global: 16.66,
          // (50500 + 10100) / 2 = 30300
          avg_participants: 30.3,
          avg_citizens: 15.15,
        },
      ];
      expect(result).toStrictEqual(expected);
    });
  });
  describe('Compute Participant Average Footprint', () => {
    test('Should return the average footprint of all participants for a given round', () => {
      const carbonFootprintsEntityForOneRound = {
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
      const footprintStructure = {
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
      };
      const expected = {
        name: 'transport',
        children: [
          // (2000 + 1000) / 2 = 1500
          { name: 'bus', cfKey: 'cf_bus', value: 1500 },
          // (200000 + 100000) / 2 = 150000
          { name: 'plane', cfKey: 'cf_plane', value: 150000 },
        ],
        // (202000 + 101000) / 2 = 151500
        value: 151500,
      };
      const result = participantsAverageFootprint(
        carbonFootprintsEntityForOneRound,
        footprintStructure
      );
      expect(result).toStrictEqual(expected);
    });
  });
  describe('Should give the number of Tons of CO2 reduced by the participants thanks to the individual and collective actions since the begining of the workshop', () => {
    test('Should give the number of Tons of CO2 reduced by the participants thanks to the individual actions', () => {
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
        '2029': {
          actionCardType: 'collective',
          targetedYear: 2029,
          actionCardBatchIds: ['11'],
        },
      };
      const roundsEntity = {
        2020: {
          year: 2020,
          carbonFootprints: ['2020-1', '2020-2'],
          citizenCarbonFootprints: ['2020-1', '2020-2'],
        },
        2023: {
          year: 2023,
          carbonFootprints: ['2023-1', '2023-2'],
          citizenCarbonFootprints: ['2023-1', '2023-2'],
        },
        2026: {
          year: 2026,
          carbonFootprints: ['2026-1', '2026-2'],
          citizenCarbonFootprints: ['2026-1', '2026-2'],
        },
        2029: {
          year: 2029,
          carbonFootprints: ['2029-1', '2029-2'],
          citizenCarbonFootprints: ['2029-1', '2029-2'],
        },
      };
      const carbonFootprintsEntity = {
        '2020-1': {
          participantId: 1,
          footprint: {
            name: 'totalFootprint',
            value: 12,
          },
        },
        '2020-2': {
          participantId: 2,
          footprint: {
            name: 'totalFootprint',
            value: 8,
          },
        },
        '2023-1': {
          participantId: 1,
          footprint: {
            name: 'totalFootprint',
            value: 10,
          },
        },
        '2023-2': {
          participantId: 2,
          footprint: {
            name: 'totalFootprint',
            value: 8,
          },
        },
        '2026-1': {
          participantId: 1,
          footprint: {
            name: 'totalFootprint',
            value: 7,
          },
        },
        '2026-2': {
          participantId: 2,
          footprint: {
            name: 'totalFootprint',
            value: 6,
          },
        },
        '2029-1': {
          participantId: 1,
          footprint: {
            name: 'totalFootprint',
            value: 6,
          },
        },
        '2029-2': {
          participantId: 2,
          footprint: {
            name: 'totalFootprint',
            value: 4,
          },
        },
      };
      const initState = {
        workshop: {
          entities: {
            roundConfig: roundConfigEntity,
            rounds: roundsEntity,
            carbonFootprints: carbonFootprintsEntity,
          },
          result: {
            currentYear: 2029,
            rounds: Object.keys(roundsEntity),
            participants: [1, 2],
          },
        },
      };
      const result = selectIndividualCarbonFootprintReduction(initState);
      const participantsRedution = [
        '2020-1',
        '2020-2',
        '2026-1',
        '2026-2',
      ].reduce(
        (accumulator, key) =>
          accumulator + carbonFootprintsEntity[key].footprint.value,
        0
      );
      const expected = participantsRedution / 2;
      expect(result).toStrictEqual(expected);
    });
  });
});
