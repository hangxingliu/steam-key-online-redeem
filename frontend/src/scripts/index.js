//@ts-check
/// <reference path="index.d.ts" />

import api from "./api";
import exporter from "./export";
import * as utils from "./utils";
import * as status from "./status";
import * as redeem from "./redeem";
import * as i18n from "../i18n/index";
import * as notification from "./notification";

const MODAL_2FA = '#modal2FA';

const FORM_LOGIN = '#formLogin';
const FORM_2FA = '#form2fa';

const INPUT_USER = '#inputUser';
const INPUT_PWD = '#inputPasswd';
const INPUT_2FA = '#inputAuthCode';
const INPUT_KEYS = '#inputKeys';

const BTN_LOGIN = '#btnLogin';
const BTN_LOGINING = '#btnLogining';
const BTN_REDEEM = '#btnRedeem';
const BTN_LANGUAGE = '#btnSwitchLanguage';
const BTN_EXPORT = '#linkExport';

const ALERT_LOGIN_FAILED = '#alertLoginFailed';

const TXT_LOGIN_FAILED = '#txtLoginFailed';

let username = '';
let password = '';

$(main);
function main() {
	api()
		.on('connect', status.connected)
		.on('disconnect', () => status.broken(i18n.get('disconnect_with_server')))
		.on('auth', () => $(MODAL_2FA).modal({ keyboard: false, backdrop: 'static' }))
		.on('redeem', detail => redeem.onRedeem(detail))
		.on('login', onLogin)
	redeem.bindAPI(api().redeem);
	redeem.bindStringProvider(i18n.result);
	redeem.bindStopNowCallback(() => $('#cardInput').hide());

	installI18NButton();

	//show connecting status
	status.connecting();

	notification.init();

	//#region listening events
	$(FORM_LOGIN).submit(onClickLogin);
	$(FORM_2FA).submit(onClickAuth);

	$(BTN_REDEEM).click(() => {
		let keys = utils.extractKeysFromText(val(INPUT_KEYS));
		if (keys.length < 1)
			return;	
		$(INPUT_KEYS).val('');
		redeem.add(keys);
	});

	$(BTN_LANGUAGE).click(() => {
		let $this = $(BTN_LANGUAGE);
		i18n.setLanguage($this.attr('data-lang') || i18n.EN);
		installI18NButton();
	});

	$(BTN_EXPORT).click(() => exporter(redeem.getTasks()));
	
	$(MODAL_2FA).on('shown.bs.modal', () => $(INPUT_2FA).val('').focus());
	//#endregion listening events

	//debug
	// setTimeout(function () {
	// 	username = 'Sofia';
	// 	onLogin(null, { steamID: '[Hola!]' });
	// }, 1000);
}

function installI18NButton() { 
	let $btn = $(BTN_LANGUAGE);
	let lang = i18n.getLanguageName();
	$btn.attr('data-lang', lang == i18n.EN ? "zh-CN" : "en");
	$btn.text(lang == i18n.EN ? "中文" : "English");
}

function onLogin(err, detail) { 
	$(BTN_LOGINING).hide();
	$(BTN_LOGIN).show();
	
	if (err) { 
		console.error('login failed:', err);
		let errMsg = String(err);

		if (errMsg.match(/password/i))
			return addInputError(INPUT_PWD, i18n.result(errMsg));
		if (errMsg.match(/account/i))
			return addInputError(INPUT_USER, i18n.result(errMsg));

		$(TXT_LOGIN_FAILED).text(i18n.result(errMsg));
		$(ALERT_LOGIN_FAILED).show();
		return;
	}
	
	console.log('login success:', detail);
	status.logined(`${username} ${detail.steamID}`)
}

/** @param {JQuery.Event} event */
function onClickAuth(event) { 
	event.preventDefault();

	let auth = val(INPUT_2FA).trim().toUpperCase();
	if (auth) {
		api().auth(auth);
		$(MODAL_2FA).modal('hide');
	}
}

/** @param {JQuery.Event} event */
function onClickLogin(event) {
	event.preventDefault();

	$(ALERT_LOGIN_FAILED).hide();
	removeInputError(INPUT_USER);
	removeInputError(INPUT_PWD);
	
	username = val(INPUT_USER).trim();
	password = val(INPUT_PWD).trim();

	if (!username) return addInputError(INPUT_USER, i18n.get('login_missing_username'));
	if (!password) return addInputError(INPUT_PWD, i18n.get('login_missing_password'));

	api().login(username, password);

	$(BTN_LOGIN).hide();
	$(BTN_LOGINING).show();
}



// =======================================
//      D O M     O p e r a t i o n
// =======================================
function val(selector) { return String($(selector).val() || ""); }
function removeInputError(selector) { 
	$(selector).removeClass('is-invalid')
		.siblings('.form-control-feedback').text('');
}
function addInputError(selector, error) { 
	$(selector).addClass('is-invalid').focus()
		.siblings('.form-control-feedback').text(error);
}
