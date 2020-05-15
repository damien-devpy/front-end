import { schema } from 'normalizr';

// Participants
const participant = new schema.Entity('participants');
// Model
const actionCard = new schema.Entity('actionCards');
const actionCardBatch = new schema.Entity('actionCardBatches');
// Rounds
const carbonInfo = new schema.Entity(
  'carbonInfo',
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
    carbonInfo: [carbonInfo],
    roundsConfig,
    individualActionCards: [individualActionCards],
    collectiveActionCards,
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
