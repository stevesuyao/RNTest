export const centraConfig = {
  HOST_ADDRESS: 'https://centra-dev.piaggiofastforward.com',
  SERVICES_ENDPOINT: {
    USER: '/users',
    AUTH: '/auth',
    TRIBE: '/tribes',
    REGISTRATION: '/registrations',
    INVITE: '/invites',
    GITA: '/gitas',
    TEMP: '/temp',
  },
  DEFAULT_TIME_OUT: 15000, // ms
  REQUEST_TIME_OUT: 12000, // ms
  TIME_OUT_ERROR: 'The server is taking too long to response',
};

export const bleConfig = {
  SERVICE_UUID: '9999', // Gita service uuid
};
