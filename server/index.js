//@ts-check

let express = require('express');
let http = require('http');
let config = require('./config');
let { log, fatal } = require('./logger');

/** Web Server */
let web = require('./web');
/** WebSocket Server */
let ws = require('./ws');

let app = express();
let server = http.createServer(app);

web(app);
ws(server);

process.on('uncaughtException', ex => 
    console.error('uncaught exception:', ex.message, '\n', ex.stack));
process.on('unhandledRejection', ex => 
    console.error('unhandled rejection:', ex));


server.listen(config.port);
server.on('error', onListenError);
server.on('listening', () => log(`server is listening on port ${config.port}`));

function onListenError(error) {
    if (error.syscall !== 'listen')
        throw error;
    switch (error.code) {
        case 'EACCES':
            fatal(101, `listening port ${config.port} requires elevated privileges`);
        case 'EADDRINUSE':
            fatal(102, `port ${config.port} is already in use`);
        default:
            throw error;
    }
}
