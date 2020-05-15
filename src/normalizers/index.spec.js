import { normalize, denormalize, schema } from 'normalizr';
import workshop from '../utils/mocks/workshopBackend';

describe('Workshop', () => {
  // Participants
  const participant = new schema.Entity('participants');
  // Model
  const footprintStructure = new schema.Entity('footprintStructure');
  const variableFormulas = new schema.Entity('variableFormulas');
  const globalCarbonVariables = new schema.Entity('globalCarbonVariables');
  const actionCard = new schema.Entity('actionCards');
  const actionCardBatch = new schema.Entity('actionCardBatch');
  // Rounds
  const carbonVariables = new schema.Entity('carbonVariables');
  const carbonFootprint = new schema.Entity('carbonFootprint');
  const roundsConfig = new schema.Entity(
    'roundsConfig',
    {},
    {
      idAttribute: (entity, parent) => `${parent.year}`,
    }
  );
  const individualActions = new schema.Entity(
    'individualActions',
    {
      individualActions: [actionCard],
    },
    {
      idAttribute: (entity, parent) => `${parent.year}-${entity.participantId}`,
    }
  );
  const collectiveActions = new schema.Entity(
    'collectiveActions',
    {},
    {
      idAttribute: (entity, parent) => `${parent.year}`,
    }
  );
  const carbonInfo = new schema.Entity(
    'carbonInfo',
    {},
    {
      idAttribute: (entity, parent) => `${parent.year}-${entity.participantId}`,
    }
  );
  const round = new schema.Entity(
    'rounds',
    {
      carbonInfo: [carbonInfo],
      roundsConfig,
      individualActions: [individualActions],
      collectiveActions,
    },
    { idAttribute: 'year' }
  );
  const mySchema = {
    rounds: [round],
    participants: [participant],
    model: {
      // footprintStructure,
      // variableFormulas,
      // globalCarbonVariables,
      actionCards: [actionCard],
      actionCardBatches: [actionCardBatch],
    },
  };
  it('should normalize workshop', (done) => {
    const normalizedData = normalize(workshop, mySchema);
    //console.log(normalizedData);
    //console.log(JSON.stringify(normalizedData.result.model.actionCards));
    //console.log(JSON.stringify(normalizedData.result.model.actionCardBatches));
    // console.log(
    //   "entities.rounds",
    //   JSON.stringify(normalizedData.entities.rounds)
    // );
    // console.log(
    //   "entities.carbonInfo",
    //   JSON.stringify(normalizedData.entities.carbonInfo)
    // );
    console.log('normalizedData', JSON.stringify(normalizedData));
    done();
  });
  it('should denormalize workshop', (done) => {
    const normalizedData = normalize(workshop, mySchema);
    const entities = normalizedData.entities;
    const input = normalizedData.result;
    const denormalizedData = denormalize(input, mySchema, entities);
    //console.log("denormalizedData", JSON.stringify(denormalizedData));
    expect(denormalizedData).toEqual(workshop);
    done();
  });
});
