import { denormalize, normalize } from 'normalizr';

import { workshopSchema } from './index';

const workshopWithIndividualActions = {
  rounds: [
    {
      year: 2020,
      individualChoices: [
        { participantId: '1', actionCardIds: ['10'] },
        { participantId: '2', actionCardIds: ['11'] },
      ],
    },
    {
      year: 2023,
      collectiveChoices: { actionCardIds: ['20, 21'] },
    },
  ],
};

const normalizedWorkshopWithIndividualActions = {
  entities: {
    individualChoices: {
      '2020-1': { participantId: '1', actionCardIds: ['10'] },
      '2020-2': { participantId: '2', actionCardIds: ['11'] },
    },
    collectiveChoices: {
      2023: {
        actionCardIds: ['20, 21'],
      },
    },
    rounds: {
      2020: {
        year: 2020,
        individualChoices: ['2020-1', '2020-2'],
      },
      2023: {
        year: 2023,
        collectiveChoices: '2023',
      },
    },
  },
  result: { rounds: [2020, 2023] },
};

describe('Workshop', () => {
  it('should normalize workshop', () => {
    const normalizedData = normalize(
      workshopWithIndividualActions,
      workshopSchema
    );
    expect(normalizedData).toEqual(normalizedWorkshopWithIndividualActions);
  });
  it('should denormalize workshop', () => {
    const normalizedData = normalize(
      workshopWithIndividualActions,
      workshopSchema
    );
    const { entities } = normalizedData;
    const input = normalizedData.result;
    const denormalizedData = denormalize(input, workshopSchema, entities);
    expect(denormalizedData).toEqual(workshopWithIndividualActions);
  });
});
