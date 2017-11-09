//@ts-check
/// <reference path="./index.d.ts" />

import * as utils from './utils';

//heartbeats duration: 10seconds
const HEART_BEAT_DURATION = 10 * 1000;

/** @type {WebSocket} */
let ws = null;

/** @type {{[name: string]: (param?: any) => void}} */
let listener = {};
let emit = (name, ...p) => name in listener && listener[name](...p);

let pingpongHandle = void 0;
let context = { on, login, auth, redeem };

export default function api() {
	if (!('WebSocket' in window))
		throw new Error(`Unsupported browser: WebSocket is required!`);

	if (ws)
		return context;	
	
	const protocol = location.protocol == 'https:' ? 'wss:' : 'ws:';
	ws = new WebSocket(`${protocol}//${location.host}/ws`);

	ws.onopen = () => { 
		pingpongHandle = setInterval(send, HEART_BEAT_DURATION, {action: 'ping'});
	};
	ws.onmessage = (rawData, flags) => {
		/** @type {WebSocketDataFromServer} */
		let data = utils.parseJSON(rawData.data, {});
		if (!data.action)
			return console.warn('Unknown ws message: ', rawData);
		console.log('Received ws message. action:', data.action)
		if (data.action == 'connect')
			return emit('connect', data);
		if (data.action == 'logOn')
			return emit('login', data.result == 'success' ? null : data.message, data.detail);
		if (data.action == 'authCode')
			return emit('auth');
		if (data.action == 'redeem')
			return emit('redeem', data.detail);
		if (data.action == 'pong')
			return;//ping pong	
			
	};
	ws.onclose = () => {
		clearInterval(pingpongHandle);
		emit('disconnect');
	}

	return context;
}


/** 
 * @param {"login"|"connect"|"auth"|"redeem"|"disconnect"} name
 */
function on(name, callback) {
	listener[name] = callback;
	return context;
}

/**
 * @param {string} username 
 * @param {string} password 
 */
function login(username, password) {
	send({ action: 'logOn', username, password });
	return context;
}

/**
 * @param {string} authCode 
 */
function auth(authCode) {
	send({ action: 'authCode', authCode });
	return context;	
}

/** 
 * @param {string[]} keys
 */
function redeem(keys) {
	send({ action: 'redeem', keys });
	return context;
}

function send(object) {
	try {
		ws.send(JSON.stringify(object));
	} catch (ex) {
		console.error('ws send failed:', object, 'error: ', ex);
	}
}

