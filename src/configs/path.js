let SERVICE_BASE_PATH = `/APIs/`;
let ROUTER_BASE_PATH = '/';
let IS_DEV = false;
let JWT_TOKEN_KEY = 'x-the-diet-journal';
let DEV_PORT = 4000;
let PRIVATE_ROUTE_REDIRECT = '/SignIn';

let url = window.location.href;
if (url.search('localhost') > -1 || url.search('127.0.0.1') > -1 || url.search(`:${DEV_PORT}`) > -1) {
	IS_DEV = true;
}

if (IS_DEV) {
	SERVICE_BASE_PATH = `http://127.0.0.1:${DEV_PORT}${SERVICE_BASE_PATH}`;
}

export {
    SERVICE_BASE_PATH,
    ROUTER_BASE_PATH,
    IS_DEV,
    JWT_TOKEN_KEY,
    PRIVATE_ROUTE_REDIRECT
};