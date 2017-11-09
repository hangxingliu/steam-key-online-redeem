//@ts-check
/// <reference path="./index.d.ts" />
/*
	Surprise:
	GIX0W-XN2YY-4FCF9	40420 Ampu-Tea
	V3TVM-IQ25B-CA8H5	37396 Canyon Capers
	0X6DR-D7N2B-2LZCD	41220 Chompy Chomp Chomp
*/

import * as notification from "./notification"

const CARD_RESULT = '#cardResult';
const TB_RESULT = '#tbResult';
const TXT_REDEEM_FATAL = '#txtRedeemFatal';

// Rate limit, stop every things
const STOP_NOW = 'RateLimited';
const NEED_MAIN = 'DoesNotOwnRequiredApp';

// duration for one key: 80 sec / 9 = 9 sec 
const DURATION = 9 * 1000;

// 300 ms
const TIMER_DURATION = 300;

/** @type {RedeemTask[]} */
let tasks = [];
let keyUniq = {};
let lastRedeemTime = 0;

let timerHandle = void 0;
let stopNowCallback = null;

/**
 * redeem interface
 * @type {(keys: string[]) => any}
 */
let redeem = (keys) => void keys;
/**
 * result string provider
 * @type {(result: string) => string}
 */
let str = (result) => result;

/** @param {RedeemTask} task */
function executeTask(task) {
	console.log(`redeeming task #${task.no} (${task.redeemTimes || 'first time'})`)

	redeem([task.key]);
	
	task.status = 'Redeeming';
	task.redeemTimes++;
	
	lastRedeemTime = Date.now();
	updateUI();	
}
function timerLoop() { 
	let now = Date.now();
	let finish = true;
	if (now > lastRedeemTime + DURATION &&
		tasks.filter(task => task.status == 'Redeeming').length == 0) {

		/** @type {RedeemTask} */
		let retryTask = null;

		for (let task of tasks) { 
			if (task.status == 'Waiting') {
				executeTask(task);
				finish = false;
				break;
			}
			// if all task finish then retry this task
			if (task.resultMsg == NEED_MAIN && task.redeemTimes == 1)
				retryTask = task;
		}

		if (finish) {
			if (retryTask) {
				executeTask(retryTask);
			} else {
				// finish and has not retry task
				timerHandle = void 0;
				notification.finish();
				console.log('redeem finish!');
				return;//all finish	
			}
		}
	}
	timerHandle = setTimeout(timerLoop, TIMER_DURATION);
}
function startTimer() { 
	if (typeof timerHandle == 'undefined')
		timerHandle = setTimeout(timerLoop, TIMER_DURATION);
}

function stopEveryThings() { 
	clearTimeout(timerHandle);
	timerHandle = void 0;
	$(TXT_REDEEM_FATAL).show();
	notification.rateLimited();
	stopNowCallback && stopNowCallback();
}

const $LINK = $('<a target="_blank"></a>');
function updateUI() { 
	//If I could use React in here ...
	//But I don't use it in here, lol
	$(TB_RESULT).html(tasks.map(task => {
		let statusColor = '', statusWeight = 'span';
		if (task.status == 'OK' || task.status == 'Fail') {
			statusWeight = 'b';
			statusColor = task.status == 'OK' ? 'text-primary' : 'text-danger';
		}
		let packages = '--';
		if (task.packages.length) {
			packages = '';
			for (let p of task.packages) {
				let $link = $LINK.clone();
				$link.attr('href', `https://steamdb.info/sub/${p.subId}/`);
				$link.text(`(${p.subId}) ${p.name }`);
				packages += $link.prop('outerHTML') + '<br/>';
			}
		}
		let status = '';
		if (task.resultMsg == NEED_MAIN && task.redeemTimes == 1)
			status = `${str(task.resultMsg)}<b>${str('RetryLater')}</b>`;
		else if (task.status == 'Redeeming')
			status = str(task.status);
		else	
			status = ` <${statusWeight}>${str(task.status)}</${statusWeight}> ${str(task.resultMsg)}`;

		return `<tr>
			<td>${task.no}</td>
			<td><code>${task.key}</code></td>
			<td class="${statusColor}"> ${status} </td>
			<td>${packages}</td>
		</tr>`;
	}).join('\n'));
}

export function getTasks() { return tasks; }

/** @param {RedeemDetail} redeemInfo */
export function onRedeem(redeemInfo) { 
	tasks.filter(task => task.key == redeemInfo.key)
		.forEach(task => {
			//@ts-ignore
			task.status = redeemInfo.result;
			task.resultMsg = redeemInfo.details;
			task.packages = Object.keys(redeemInfo.packages).map(subId =>
				({ subId, name: redeemInfo.packages[subId] }));
		});
	updateUI();
	if (redeemInfo.details == STOP_NOW)
		stopEveryThings();
}

/** @param {(keys: string[]) => any} redeemMethod */
export function bindAPI(redeemMethod) { redeem = redeemMethod; }
export function bindStringProvider(provider) { str = provider; }
export function bindStopNowCallback(cb) { stopNowCallback = cb; }

/** @param {string[]} keys  */
export function add(keys) { 
	console.log(`adding ${keys.length} keys.`);
	let added = 0;
	for (let key of keys) {
		if (key in keyUniq) { 
			console.log('key: (duplicated)', key);
			continue;
		}	
		console.log('key:', key);
		added++;
		keyUniq[key] = true;
		tasks.push({
			no: tasks.length, key, status: 'Waiting', 
			resultMsg: '', packages: [], redeemTimes: 0
		});
	}
	if (added) {
		$(CARD_RESULT).show();
		updateUI();
		startTimer();
	}
}