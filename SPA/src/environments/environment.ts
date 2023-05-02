const protocol: string = window.location.protocol;
const hostname: string = window.location.hostname;
const port: string = ':5062';
const ip: string = `${hostname}${port}`;
const baseUrl: string = `${protocol}//${ip}`;
const clientUrl: string = window.location.href;
export const environment = {
  production: false,
  apiUrl: `${baseUrl}/api/`,
  baseUrl: `${baseUrl}/`,
  clientUrl: clientUrl,
  allowedDomains: [ip],
  disallowedRoutes: [`${ip}/api/auth`],
};
