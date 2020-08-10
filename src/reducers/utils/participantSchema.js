import surveyVariablesSchema from './surveyVariablesSchema';

const participantSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    email: { type: 'string' },
    status: { type: 'string' },
    personaId: { type: 'string' },
    surveyVariables: surveyVariablesSchema,
  },
};
export default participantSchema;
