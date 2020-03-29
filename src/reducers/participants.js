const initialState = {
  byId: {
    1: {
      firstName: 'François',
      lastName: 'Laugier',
      email: 'francois_laugier@outlook.com'
    },
    2: {
      firstName: 'Xavier',
      lastName: 'Arques',
      email: 'xavarques@gmail.com'
    }
  }
};

export default (state = initialState) => {
  return state;
};
