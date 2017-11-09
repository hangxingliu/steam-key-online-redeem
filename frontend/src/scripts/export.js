//@ts-check
/// <reference path="./index.d.ts" />

import download from 'downloadjs';
import * as i18n from '../i18n/index';

const MODAL_EXPORT = '#modalExport';

const BTN_EXPORT = '#btnExport';

const INPUT_FILENAME = '#txtFileName';
const TXT_REDEEMED_COUNT = '#txtRedeemedCount';
const TXT_FAILED_COUNT = '#txtFailedCount';
const TXT_WAITING_COUNT = '#txtWaitingCount';

const CB_ASF = '#cbASF';
const CB_REDEEMED = '#cbRedeemed';
const CB_FAILED = '#cbFailed';
const CB_WAITING = '#cbWaiting';

const CHECKED = 'checked';
const IS_CHECKED = ':checked';

/** @type {RedeemTask[]} */
let tasks = [];
let defaultFileName = '';

/** @param {RedeemTask[]} tasks */
export default function exporter(_tasks) {
	tasks = _tasks;

	let now = new Date();
	defaultFileName = `redeem-export-` +
		`${now.getFullYear()}-${to2(now.getMonth() + 1)}-${to2(now.getDate())}-` +
		`${to2(now.getHours())}-${to2(now.getMinutes())}.txt`;
	$(INPUT_FILENAME).val(defaultFileName);
	
	let r = 0, f = 0, w = 0;
	for (let task of tasks) { 
		switch (task.status) {
			case 'OK': r++; break;
			case 'Fail': f++; break;
			case 'Waiting': w++; break;
		}
	}
	
	$(TXT_REDEEMED_COUNT).text(r);
	$(TXT_FAILED_COUNT).text(f);
	$(TXT_WAITING_COUNT).text(w);

	//@ts-ignore
	$(CB_REDEEMED)[0].checked = false;
	//@ts-ignore
	$(CB_FAILED)[0].checked = true;
	//@ts-ignore
	$(CB_WAITING)[0].checked = true;

	$(BTN_EXPORT).off('click').on('click', onExport);
	$(MODAL_EXPORT).modal();
}
function to2(i) { return i < 10 ? `0${i}`: `${i}`;}

function onExport() { 
	let filename = String($(INPUT_FILENAME).val()).trim() || defaultFileName;
	let asf = $(CB_ASF).is(IS_CHECKED);
	let r = $(CB_REDEEMED).is(IS_CHECKED),
		f = $(CB_FAILED).is(IS_CHECKED),
		w = $(CB_WAITING).is(IS_CHECKED);
	let exportTasks = tasks.filter(task => (
		(task.status == 'OK' && r) ||
		(task.status == 'Fail' && f) ||
		(task.status == 'Waiting' && w)));
	
	let content = '';
	if (asf)
		content = '!redeem ' + exportTasks.map(t => t.key).join(',');
	else
		content = exportTasks.map(t => [t.key, i18n.get(t.status),
			t.packages.map(p => `(${p.subId}) ${p.name}`).join(',')].join('\t'))
			.join('\r\n');
	download(content, filename, 'text/plain');
	$(MODAL_EXPORT).modal('hide');
}