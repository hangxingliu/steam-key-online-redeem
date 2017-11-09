//@ts-check
/// <reference path="./index.d.ts" />

import download from 'downloadjs';
import * as i18n from '../i18n/index';

/** @type {{[name: string]: (task: RedeemTask) => boolean}} */
const FILTER = {
	redeemed: t => t.status == 'OK',
	waiting: t => t.status == 'Waiting' || t.status == 'Redeeming',
	already: t => t.status == 'Fail' && t.resultMsg == 'AlreadyPurchased',
	rate: t => t.status == 'Fail' && t.resultMsg == 'RateLimited',
	country: t => t.status == 'Fail' && t.resultMsg == 'RestrictedCountry',
	required: t => t.status == 'Fail' && t.resultMsg == 'DoesNotOwnRequiredApp',
};
const DEFAULT_FILTER = {
	waiting: true, already: true,
	rate: true, country: true, required: true
};

const MODAL_EXPORT = '#modalExport';

const BTN_EXPORT = '#btnExport';

const BTN_FILTER_ARRAY = '.export-filter';

const INPUT_FILENAME = '#txtFileName';
const TXT_REDEEMED_COUNT = '#txtRedeemedCount';
const TXT_FAILED_COUNT = '#txtFailedCount';
const TXT_WAITING_COUNT = '#txtWaitingCount';

const CB_ASF = '#cbASF';

const CHECKED = 'ion-android-checkbox-outline';
const UNCHECKED = 'ion-android-checkbox-outline-blank';
const CHECKED_BADGE = 'badge-primary';
const UNCHECKED_BADGE = 'badge-light';

let bindEvents = false;

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
	
	// set default filter status
	$(BTN_FILTER_ARRAY).each(function () {
		/** @type {JQuery} */
		let $filter = $(this);
		let filter = $filter.data('filter');
		if (!(filter in FILTER))
			return console.error('Unknown export filter:', filter);
		let count = tasks.filter(FILTER[filter]).length;
		let checked = filter in DEFAULT_FILTER && count > 0;
		$filter.find('i')[0].className = checked ? CHECKED : UNCHECKED;
		$filter.find('.badge').text(String(count))[0].className = 'badge float-right ' +
			(checked ? CHECKED_BADGE : UNCHECKED_BADGE);
	});

	if (!bindEvents) {
		$(BTN_EXPORT).on('click', onExport);
		// switch filter status
		$(BTN_FILTER_ARRAY).click(function () {
			swapClass($(this).find('i'), CHECKED, UNCHECKED);
			swapClass($(this).find('.badge'), 'badge-light', 'badge-primary');
		});
		bindEvents = true;
	}

	// open modal dialog
	$(MODAL_EXPORT).modal();
}
function to2(i) { return i < 10 ? `0${i}` : `${i}`; }
function swapClass($dom, c1, c2) { 
	if ($dom.hasClass(c1)) $dom.removeClass(c1).addClass(c2);
	else $dom.removeClass(c2).addClass(c1);
}

function onExport() {
	let filename = String($(INPUT_FILENAME).val()).trim() || defaultFileName;
	let asf = $(CB_ASF).is(':checked');
	let exportTasks = [];
	$(BTN_FILTER_ARRAY).find(`.${CHECKED}`).parent().each(function () {
		let filter = $(this).data('filter');
		if (!(filter in FILTER)) return console.error('Unknown export filter:', filter);
		exportTasks = exportTasks.concat(tasks.filter(FILTER[filter]));
	});	
	
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