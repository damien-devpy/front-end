const getStorage = () =>
  typeof Storage !== 'undefined'
    ? localStorage
    : {
        getItem: () => null,
        setItem: () => null,
        removeItem: () => null,
      };

export default getStorage;
