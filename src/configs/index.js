// import io from 'socket.io-client';

let URL = window.location.href;
let BASE_URL = `/APIs/`; // for services;
let BASE_PATH = '/'; // for react app route;
let IS_DEV;
let TOKEN_KEY = 'x-the-diet-journal';
// let socket;

if (URL.search('localhost') > -1 || URL.search('127.0.0.1') > -1 || URL.search(':3000') > -1) {
	IS_DEV = true;
}

if (IS_DEV) {
	let PORT = 4000;
	BASE_URL = `http://127.0.0.1:${PORT}${BASE_URL}`;
	// socket = io(`http://127.0.0.1:${PORT}`);
} else {
	// socket = io();
}

export {
	BASE_URL,
	BASE_PATH,
	// socket,
	IS_DEV,
	TOKEN_KEY
};