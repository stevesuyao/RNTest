
const logInRes = {
  data: {
    user: {
      userId: '12345678',
      token: '12345678abcdefgh',
    },
  },
};

const registerRes = {
  data: {
    registeredGita: {
      gitaId: 'abcdefgh12345678',
      offlineKey: '87654321abcdefgh',
    },
  },
};

const bleOfflineKey = {
  gitaId: 'abcdefgh12345678',
  offlineKey: '87654321abcdefgh',
};


export const login = payload => logInRes;

export const signUp = payload => logInRes;

export const register = payload => registerRes;

export const logout = () => null;

export const bleRegisteration = () => bleOfflineKey;
