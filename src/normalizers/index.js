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

export const workshopSchema = {
  rounds: [round],
  participants: [participant],
  model: {
    actionCards: [actionCard],
    actionCardBatches: [actionCardBatch],
  },
};
