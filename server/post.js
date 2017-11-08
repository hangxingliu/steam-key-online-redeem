//@ts-check
let request = require('request');

module.exports = ( postAddress, subId, subName, server) => {
    let options = {
        uri: postAddress,
        method: 'POST',
        timeout: 20000,
        json: {
            subId: subId,
            subName: subName,
            server: server
        }
    };

    start(options);    
}

function start(options, i = 0) {
	doPost(options)
		.then(res =>
			(String(res || "").trim().toUpperCase() == 'OK' && i <  3) ||
				process.nextTick(start, options, i + 1))
		.catch(ex => void ex);
}

function doPost(options) {
    return new Promise( (resolve, reject) => {
        request(options, (error, response, body) => {
            if(!error) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    } );
}