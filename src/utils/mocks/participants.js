import {
  MUST_SEND_EMAIL,
  BILAN_RECEIVED,
  EMAIL_SENT,
} from '../../reducers/participants';

export default {
  byId: {
    1: {
      firstName: 'Emmanuel',
      lastName: 'M',
      email: 'manu@outlook.com',
      status: MUST_SEND_EMAIL,
      isValid: true,
      linkBC: null,
      personaId: null,
    },
    2: {
      firstName: 'Brigitte',
      lastName: 'M',
      email: 'brigitte@gmail.com',
      status: BILAN_RECEIVED,
      isValid: true,
      linkBC: 'http//www',
      personaId: null,
    },
    3: {
      firstName: 'Ivan',
      lastName: 'Dorne',
      email: 'ivan.dorne@gmail.com',
      status: EMAIL_SENT,
      isValid: true,
      linkBC: 'http//www',
      personaId: null,
    },
    4: {
      firstName: 'Yvan',
      lastName: 'Dornet',
      email: 'ivan.dornet@gmail.com',
      status: BILAN_RECEIVED,
      isValid: true,
      linkBC: null,
      personaId: 2,
    },
  },
  allIds: [1, 2, 3, 4],
};
