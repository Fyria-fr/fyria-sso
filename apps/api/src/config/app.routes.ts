const authRoot = '/auth';
const usersRoot = '/users';

const v1 = 'v1';

export const routesV1 = {
  version: v1,
  auth: {
    root: authRoot,
    login: `${authRoot}/login`,
    logout: `${authRoot}/logout`,
    me: `${authRoot}/me`,
  },
  users: {
    root: usersRoot,
    byId: `${usersRoot}/:userEmail`,
  },
};
