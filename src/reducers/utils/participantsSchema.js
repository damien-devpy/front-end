import participantSchema from './participantSchema';

const participantsSchema = {
  type: 'array',
  items: participantSchema,
};

export default participantsSchema;
