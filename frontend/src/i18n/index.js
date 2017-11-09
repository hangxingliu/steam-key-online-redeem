//@ts-check
/// <reference path="../scripts/index.d.ts" />

import * as zhCN from "./zh-CN";
import * as en from "./en";

const KEY = 'steam-key-redeem-language';

export const EN = 'en';
const languages = { 'zh-CN': zhCN, en };
const english = languages[EN];

let languageName = localStorage.getItem(KEY) || EN;
let language = languages[languageName] || english;

//convert from array to string
Object.keys(languages).map(lang => languages[lang].strings).forEach(lang =>
	Object.keys(lang).filter(key => Array.isArray(lang[key]))
		.forEach(key => lang[key] = lang[key].join('')));

updateUI();
export function updateUI() { 
	let doms = document.querySelectorAll('[data-i18n]'),
		length = doms.length,
		strEng = english.strings,
		strCurrent = language.strings;
	for (let i = 0; i < length; i++) { 
		let dom = doms[i],
			name = dom.getAttribute('data-i18n'),
			text = strCurrent[name] || strEng[name];

		if (!text)
			continue;	

		if (dom.tagName == 'INPUT' || dom.tagName == 'TEXTAREA')
			//@ts-ignore	
			dom.value = text;
		else
			dom.innerHTML = text;	
	}
}

export function get(name = '') { 
	return language.strings[name] || english.strings[name] || name;
}
export function result(name = '') { 
	let key = `result:${name}`;
	return language.strings[key] || english.strings[key] || name;
}

export function getLanguageName() { return languageName; }
export function setLanguage(newLanguage = EN) { 
	if (!(newLanguage in languages))
		return;	
	languageName = newLanguage;
	language = languages[newLanguage];
	updateUI();
	
	localStorage.setItem(KEY, newLanguage);
}