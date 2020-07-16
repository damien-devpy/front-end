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
const roundConfig = new schema.Entity(
  'roundConfig',
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
const citizenIndividualChoices = new schema.Entity(
  'citizenIndividualChoices',
  {
    citizenIndividualChoices: [actionCard],
  },
  {
    idAttribute: (entity, parent) => `${parent.year}-${entity.citizenId}`,
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
    citizenCarbonVariables: [citizenCarbonVariables],
    citizenCarbonFootprints: [citizenCarbonFootprint],
    roundConfig,
    individualChoices: [individualChoices],
    citizenIndividualChoices: [citizenIndividualChoices],
    collectiveChoices,
  },
  { idAttribute: 'year' }
);

// eslint-disable-next-line import/prefer-default-export
export const workshopSchema = {
  rounds: [round],
  participants: [participant],
  model: {
    actionCards: [actionCard],
    actionCardBatches: [actionCardBatch],
    personas: [persona],
    citizens: [citizen],
  },
};
