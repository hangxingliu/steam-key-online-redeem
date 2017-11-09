/*
	Debug Module

	This module inject a debug method into global(window object) for debugging

	Examples: (In console of browser)

		debug().redeem._debug_redeemSuccess();
	
*/

//@ts-check
/// <reference path="./index.d.ts" />

const DEBUG_USERNAME = 'Sofia';
const DEBUG_STEAM_ID = '[¡Hola!]';
const DEBUG_KEYS = `
	NE9QY-T9820-86MR8	(43686) International Snooker
	MIDQ0-XI4FY-LRQIG	(39925) Ionball 2 : Ionstorm
	T02D0-IWAJ6-TV8QB	(44489) Manhunter
	DL06F-FWMV9-R6KLM	(50205) Melissa K and the Heart of Gold
	FW9HF-BQMR3-CEP4F	(151524) MontaSayer
	`;
const DEBUG_PACKAGES = { "151524": "MontaSayer" };


import api from "./api";
import exporter from "./export";
import * as utils from "./utils";
import * as status from "./status";
import * as redeem from "./redeem";
import * as i18n from "../i18n/index";
import * as notification from "./notification";

let enabledDebug = false;
let context = {
	api, exporter, utils, status, redeem, i18n, notification,
	redeemDebugKeys,
	fakeRedeemOK, fakeRedeemFail, fakeRedeemRateLimited, fakeRedeemDoesNotOwnRequiredApp,
};
let _onLogin, _setUsername;

export function init({ onLogin, setUsername }) {
	_onLogin = onLogin;
	_setUsername = setUsername;
	//@ts-ignore
	global.startDebug = startDebug;
}	

function redeemDebugKeys() { redeem.add(utils.extractKeysFromText(DEBUG_KEYS)); }
function fakeRedeemResult(result, details) { 
	let task = redeem.getTasks().filter(t => t.status == 'Redeeming')[0];
	if (!task) return console.warn('debugger: no redeeming task');
	return redeem.onRedeem({ key: task.key, result, details, packages: DEBUG_PACKAGES });
}
function fakeRedeemOK() { fakeRedeemResult('OK', 'NoDetail'); }
function fakeRedeemFail(details) { fakeRedeemResult('Fail', details); }
function fakeRedeemRateLimited() { fakeRedeemFail('RateLimited'); }
function fakeRedeemDoesNotOwnRequiredApp() { fakeRedeemFail('DoesNotOwnRequiredApp'); }

function startDebug() { 
	if (!enabledDebug) {
		_setUsername(DEBUG_USERNAME);
		_onLogin(null, { steamID: DEBUG_STEAM_ID });
		//remove redeeming api
		redeem.bindAPI(keys =>
			console.log(`debugger received a redeeming request (${keys.length})`));
		
		//@ts-ignore
		global.debug = context;

		enabledDebug = true;
	}
	return context;
}