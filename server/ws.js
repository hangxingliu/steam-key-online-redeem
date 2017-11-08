//@ts-check
/// <reference path="./index.d.ts" />

let WebSocket = require('ws');
let SteamUser = require('./steam-user');
let dm = require('domain');
let checker = require('./check');
let poster = require('./post');
let config = require('./config');
let allResults = require('./result-enum/result');
let allPurchaseResults = require('./result-enum/purchase-result');
let { debug } = require('./logger');

module.exports = server => {
    const wss = new WebSocket.Server({ server });
	wss.on('connection', ws => {
		debug('ws connected: ', ws.url);

        //const location = url.parse(ws.upgradeReq.url, true);
        //console.log('Connected!');
        wsSafeSend(ws, {
            'action': 'connect',
            'result': 'success',
            'server': config.name || 'Unknown',
        });

		/** @type {any} */
		let steamClient = new SteamUser();
		steamClient.bindWebSocket(ws);

		ws.on('message', message => {

			//console.log('received: %s', message);

			/** @type {WebSocketDataFromClient} */
			let data = parseJSON(message);
			if (!data.action) return;

			debug('ws received:', data.action);
			switch (data.action) {
				case 'ping':
					return wsSafeSend(ws, { action: 'pong' });
				case 'logOn':
					runCodeSafely(ws, 'logOn', () => {
						steamClient.logOn({
							accountName: (data.username || "").trim(),
							password: (data.password || "").trim(),
							twoFactorCode: (data.authcode || "").trim()
						});
					});
					steamClient.once('loggedOn', (details) => {
						debug(`steam logged on:`, JSON.stringify(details));
						//console.log("Logged into Steam as " + steamClient.steamID.getSteam3RenderedID());
						//if (serverConfig && ( serverConfig.id.startsWith('cn') || serverConfig.id.startsWith('test') )) {
						if (true) {
							wsSafeSend(ws, JSON.stringify({
								action: 'logOn',
								result: 'success',
								detail: {
									steamID: steamClient.steamID.getSteam3RenderedID(),
								}
							}));
							return;
						}
						// check if the account is limited
						//@ts-ignore 
						checker(steamClient.steamID.getSteamID64(), result => {

							//console.log(steamClient.steamID.getSteamID64(), result)
							if (result != 'OK') {
								sendErrorMsg(ws, 'logOn', result);
								steamClient.logOff();
							}
							else {
								wsSafeSend(ws, JSON.stringify({
									action: 'logOn',
									result: 'success',
									detail: { steamID: steamClient.steamID.getSteam3RenderedID() }
								}));
							}
						});
					});
					return;
				case 'authCode':
					let authCode = String(data.authCode || '').trim();
					if (!authCode)
						return sendErrorMsg(ws, 'logOn', 'AuthCodeError');
					runCodeSafely(ws, 'logOn', () => {
						steamClient.emit('inputAuthCode', authCode);
					});
					return;
				case 'redeem':
					//console.log('Key: %s', data.keys);
					runCodeSafely(ws, 'redeem', () => {
						// REDEEMING STARTS
						data.keys.forEach(keyElement => {
							steamClient.redeemKey(keyElement, (result, details, packages) => {
								let resData = {
									action: 'redeem',
									detail: {
										key: keyElement,
										result: allResults[result.toString()],
										details: allPurchaseResults[details.toString()],
										packages
									}
								};
								//console.log(resData);
								wsSafeSend(ws, resData);
								
								// send sub info via post
								if (result == 1 && config.log_enabled) {
									for (let subId in packages) {
										if (packages.hasOwnProperty(subId)) {
											poster(config.post_address, parseInt(subId), packages[subId], config.id);
											break;
										}
									}
								}
							});
						});
						// REDEEMING ENDS
					});
					return;
				default:
					return;	
			}
        });
		ws.on('close', () => {
			debug('ws close:', ws.url);
            steamClient.logOff();
            //console.log('close!');
        });
    });
};

function runCodeSafely(ws, name, runnable, ...parameters) { 
	let domain = dm.create();
	domain.on('error', (err) => sendErrorMsg(ws, name, err.message || ""));
	parameters && parameters.forEach(p => domain.add(p));
	domain.run(runnable);
	return domain;
}

function sendErrorMsg(ws, action, message) {
	wsSafeSend(ws, { action : action, result : 'fail', message:  message });
	debug('ws send error msg, action:', action, 'msg:', message);
}

/** @param {string|any} stuff it will be JSON.stringify if it is not a string */
function wsSafeSend(ws, stuff) {
    try {
		let data = typeof stuff == 'string' ? stuff : JSON.stringify(stuff);
		ws.send(data);
		debug('ws send back: ', data);
    } catch (error) {
        //do nothing
    }
}

function parseJSON(json, defaultValue = {}) { 
	try {
		return JSON.parse(json);
	} catch (ex) { 
		return defaultValue;
	}
}
