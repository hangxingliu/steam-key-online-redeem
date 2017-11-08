//@ts-check
/// <reference path="index.d.ts" />

/**
 * @param {string} text
 * @returns {string[]}
 */
export function extractKeysFromText(text) {
	text = text.trim().toUpperCase();
	let regexp = /([0-9,A-Z]{5}\-){2,4}[0-9,A-Z]{5}/g;
	let keys = [];
	let matched = null;
	while (!!(matched = regexp.exec(text)) )
		keys.push(matched[0]);
	return keys;
}

/**
 * @param {string} json 
 * @param {T|any} defaultValue 
 * @returns {T}
 * @template T
 */
export function parseJSON(json, defaultValue) { 
	try {
		return JSON.parse(json);
	} catch (ex) { 
		return defaultValue;
	}
}