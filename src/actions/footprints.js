export const FOOTPRINTS_RETRIEVED = 'FOOTPRINTS_RETRIEVED';
export const RETRIEVE_FOOTPRINTS = 'RETRIEVE_FOOTPRINTS';
export const FOOTPRINTS_LOAD_ERROR = 'FOOTPRINTS_LOAD_ERROR';

export const footprintsRetrieved = (footprints) => ({
  type: FOOTPRINTS_RETRIEVED,
  payload: { footprints },
});

export const retrieveFootprints = () => ({
  type: RETRIEVE_FOOTPRINTS,
  payload: [],
});

export const footprintsLoadError = (error) => ({
  type: FOOTPRINTS_LOAD_ERROR,
  payload: error,
});


