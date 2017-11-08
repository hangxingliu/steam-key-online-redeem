//@ts-check
/// <reference path="./index.d.ts" />

import * as i18n from "./i18n/index";

const KEY = 'steam-key-redeem-notification';

const CB_NOTIFICATION = '#cbNotification';
const TXT_UNSUPPORTED = '#txtNotificationUnsupported';

const DISABLED = 'disabled';
const IS_CHECKED = ':checked';

let enable = localStorage.getItem(KEY) == 'true';
//@ts-ignore
if (Notification.permission != "granted")
	enable = false;

export function init() { 
	let $cb = $(CB_NOTIFICATION);
	console.log('notification enable:', enable);

	if (typeof Notification == 'undefined') { 
		$(TXT_UNSUPPORTED).show();
		$cb.attr(DISABLED, DISABLED).addClass(DISABLED);
		return;
	}	

	//@ts-ignore
	$cb[0].checked = enable;
	$cb.change(() => {
		console.log('notification checkbox changed!');
		if ($cb.is(IS_CHECKED))
			return requestPermission();
		disable();
	})
}

function requestPermission() { 
	Notification.requestPermission(permission => {
		console.log('notification permission:', permission);
		if (permission == 'granted') {
			enable = true;
			localStorage.setItem(KEY, 'true');
			return;
		}
		disable();
	});
}

function disable() { 
	enable = false;
	localStorage.setItem(KEY, 'false');
	//@ts-ignore
	$(CB_NOTIFICATION)[0].checked = false;
}

export let disconnected = () => notify('disconnect_with_server');
export let finish = () => notify('finish');
export let rateLimited = () => notify('redeem_limited');

function notify(i18nStringName) { 
	if (enable)
		new Notification(i18n.get('title'), {
			body: i18n.get(i18nStringName)
		});
}