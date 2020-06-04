import { schema } from 'normalizr';

// Participants
const participant = new schema.Entity('participants');

// Model
const actionCard = new schema.Entity('actionCards');
const actionCardBatch = new schema.Entity('actionCardBatches');
// Rounds
const globalCarbonVariables = new schema.Entity(
  'globalCarbonVariables',
  {},
  {
    idAttribute: (entity, parent) => parent.year,
  }
);
const carbonVariables = new schema.Entity(
  'carbonVariables',
  {},
  {
    idAttribute: (entity, parent) => `${parent.year}-${entity.participantId}`,
  }
);
const carbonFootprint = new schema.Entity(
  'carbonFootprints',
  {},
  {
    idAttribute: (entity, parent) => `${parent.year}-${entity.participantId}`,
  }
);
const roundsConfig = new schema.Entity(
  'roundsConfig',
  {},
  {
    idAttribute: (entity, parent) => `${parent.year}`,
  }
);
// Taken Actions
const individualChoices = new schema.Entity(
  'individualChoices',
  {
    individualChoices: [actionCard],
  },
  {
    idAttribute: (entity, parent) => `${parent.year}-${entity.participantId}`,
  }
);
const collectiveChoices = new schema.Entity(
  'collectiveChoices',
  {},
  {
    idAttribute: (entity, parent) => `${parent.year}`,
  }
);

const round = new schema.Entity(
  'rounds',
  {
    globalCarbonVariables,
    carbonVariables: [carbonVariables],
    carbonFootprints: [carbonFootprint],
    roundsConfig,
    individualChoices: [individualChoices],
    collectiveChoices,
  },
  { idAttribute: 'year' }
);

export const workshopSchema = {
  rounds: [round],
  participants: [participant],
  model: {
    actionCards: [actionCard],
    actionCardBatches: [actionCardBatch],
  },
};
