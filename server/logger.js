//@ts-check

let DEBUG = true;

if (process.env.NODE_ENV == 'production')
	DEBUG = false;
if (process.argv.slice(2).filter(word =>
	word == 'production' || word == '-p' || word == '--production').length > 0)
	DEBUG = false;

function fatal(id, err) { 
	let msg = typeof err == 'string' ? err :
		(err instanceof Error ?
			(err.message + '\n' + err.stack.replace(/\n/g, '\n  ')) : String(err));
	console.error(`\n  Fatal error: (${id}) ${msg}\n`);
	process.exit(id);
}

function log(...parameter) { 
	console.log('log:', ...parameter);
}

function debug(...parameter) { 
	DEBUG && console.log('debug:', ...parameter);
}

module.exports = {
	fatal, log, debug
};