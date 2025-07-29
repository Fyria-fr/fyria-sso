const authRoot = '/auth';
const usersRoot = '/users';
const eventsRoot = '/events';
const logsRoot = '/logs';
const blogsRoot = '/blogs';
const imagesRoot = '/images';
const linksRoot = '/links';
const locationRoot = '/location';
const siteWebRoot = '/site-web';
const priceRoot = '/prices';

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
    byCustomerId: `${usersRoot}/user/:userEmail`,
  },
  events: {
    root: eventsRoot,
  },
  blogs: {
    root: blogsRoot,
  },
  logs: {
    root: logsRoot,
  },
  links: {
    root: linksRoot,
  },
  location: {
    root: locationRoot,
  },
  price: {
    root: priceRoot,
  },
  siteWeb: {
    root: siteWebRoot,
    bySection: `${siteWebRoot}/:section`,
  },
  image: {
    root: imagesRoot,
    upload: `${imagesRoot}/upload/:category`,
    getImage: `${imagesRoot}/:category/:imageName`,
  },
};
