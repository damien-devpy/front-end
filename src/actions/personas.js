export const PERSONAS_RETRIEVED = 'PERSONAS_RETRIEVED';
export const RETRIEVE_PERSONAS = 'RETRIEVE_PERSONAS';
export const PERSONAS_LOAD_ERROR = 'PERSONASLOAD_ERROR';

export const personasRetrieved = (personas) => ({
  type: PERSONAS_RETRIEVED,
  payload: { personas },
});

export const retrievePersonas = () => ({
  type: RETRIEVE_PERSONAS,
  payload: [],
});

export const personasLoadError = (error) => ({
  type: PERSONAS_LOAD_ERROR,
  payload: error,
});
