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
  it('should normalize workshop', (done) => {
    const normalizedData = normalize(
      workshopWithIndividualActions,
      workshopSchema
    );
    expect(normalizedData).toEqual(normalizedWorkshopWithIndividualActions);

    // console.log(
    //   'workshopWithIndividualActions',
    //   JSON.stringify(workshopWithIndividualActions, null, 2)
    // );
    // console.log('normalizedData', JSON.stringify(normalizedData, null, 2));
    // console.log(JSON.stringify(normalizedData.result.model.actionCards));
    // console.log(JSON.stringify(normalizedData.result.model.actionCardBatches));
    // console.log(
    //   'entities.rounds',
    //   JSON.stringify(normalizedData.entities.rounds, null, 2)
    // );

    // const { entities } = normalizedData;
    // const input = normalizedData.result;
    // const denormalizedData = denormalize(input, mySchema, entities);
    // console.log('denormalizedData', JSON.stringify(denormalizedData, null, 2));

    // console.log(
    //   'entities.carbonInfo',
    //   JSON.stringify(normalizedData.entities.carbonInfo)
    // );
    done();
  });
  it('should denormalize workshop', (done) => {
    const normalizedData = normalize(
      workshopWithIndividualActions,
      workshopSchema
    );
    const { entities } = normalizedData;
    const input = normalizedData.result;
    const denormalizedData = denormalize(input, workshopSchema, entities);
    // console.log("denormalizedData", JSON.stringify(denormalizedData));
    expect(denormalizedData).toEqual(workshopWithIndividualActions);
    done();
  });
});
