const protocol: string = window.location.protocol;
const hostname: string = window.location.hostname;
const port: string = `:${+window.location.port - 1}`;
const ip: string = `${hostname}${port}`;
const baseUrl: string = `${protocol}//${ip}`;

export const environment = {
  production: true,
  apiUrl: `${baseUrl}/api/`,
  baseUrl: `${baseUrl}/`,
  allowedDomains: [ip],
  disallowedRoutes: [`${ip}/api/auth`],
};
