//@ts-check
/// <reference path="index.d.ts" />

let fs = require('fs');
let { fatal, log, debug } = require('./logger');

const CONFIG_FILE_NAME = 'serverconfig.json';
const CONFIG_FILE_PATH = `${__dirname}/../${CONFIG_FILE_NAME}`;

/** @type {ServerConfig} */
let config = null;

if (!fs.existsSync(CONFIG_FILE_PATH))
	fatal(1001, `server config file ${CONFIG_FILE_NAME} is missing!`);
	
try {
	config = JSON.parse(fs.readFileSync(CONFIG_FILE_PATH, 'utf8'));
} catch (ex) { 
	fatal(1002, `server config file is invalid json file!`);
}

if (!Number.isInteger(config.port) || config.port < 0 || config.port >= 65536) 
	fatal(1003, `serverconfig port is not valid!`)

module.exports = config;