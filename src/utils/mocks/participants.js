import { MUST_SEND_EMAIL, BILAN_RECEIVED, EMAIL_SENT } from '../../reducers/participants'

export default {
  byId: {
    1: {
      firstName: 'François',
      lastName: 'Laugier',
      email: 'francois_laugier@outlook.com',
      status: MUST_SEND_EMAIL,
      isValid: true,
      linkBC: 'http//www'
    },
    2: {
      firstName: 'Xavier',
      lastName: 'Arques',
      email: 'xavarques@gmail.com',
      status: BILAN_RECEIVED,
      isValid: true,
      linkBC: 'http//www'
    },
    3: {
      firstName: 'Ivan',
      lastName: 'Dorne',
      email: 'ivan.dorne@gmail.com',
      status: EMAIL_SENT,
      isValid: true,
      linkBC: 'http//www'
    }
  },
  allIds: [1, 2, 3]
}