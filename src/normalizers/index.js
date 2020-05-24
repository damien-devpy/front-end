import { schema } from 'normalizr';

// Participants
const participant = new schema.Entity('participants');
const persona = new schema.Entity('personas');
const citizen = new schema.Entity('citizens');
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
const citizenCarbonVariables = new schema.Entity(
  'citizenCarbonVariables',
  {},
  {
    idAttribute: (entity, parent) => `${parent.year}-${entity.citizenId}`,
  }
);
const citizenCarbonFootprint = new schema.Entity(
  'citizenCarbonFootprints',
  {},
  {
    idAttribute: (entity, parent) => `${parent.year}-${entity.citizenId}`,
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
const individualActionCards = new schema.Entity(
  'individualActionCards',
  {
    individualActionCards: [actionCard],
  },
  {
    idAttribute: (entity, parent) => `${parent.year}-${entity.participantId}`,
  }
);
const collectiveActionCards = new schema.Entity(
  'collectiveActionCards',
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
    citizenCarbonVariables: [citizenCarbonVariables],
    citizenCarbonFootprints: [citizenCarbonFootprint],
    roundsConfig,
    individualActionCards: [individualActionCards],
    collectiveActionCards,
  },
  { idAttribute: 'year' }
);

export const workshopSchema = {
  rounds: [round],
  participants: [participant],
  citizens: [citizen],
  personas: [persona],
  model: {
    actionCards: [actionCard],
    actionCardBatches: [actionCardBatch],
  },
};
