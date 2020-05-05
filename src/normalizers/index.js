import { schema } from 'normalizr';

// Participants
const participant = new schema.Entity('participants');
// Model
const actionCard = new schema.Entity('actionCards');
const actionCardBatch = new schema.Entity('actionCardBatches');
// Rounds
const roundConfig = new schema.Entity(
  'roundConfig',
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
    roundConfig,
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
// export const round = new schema.Entity("rounds", {}, { idAttribute: "year" });
// export const participant = new schema.Entity("participants");
// export const actionCard = new schema.Entity("actionCards");
// export const actionCardBatch = new schema.Entity("actionCardBatch");
// const mySchema = {
//   rounds: [round],
//   participants: [participant],
//   model: {
//     actionCards: [actionCard],
//     actionCardBatches: [actionCardBatch],
//   },
// };
//const normalizedData = normalize(workshop, workshopSchema);
