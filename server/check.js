//@ts-check

let request = require('request');
let xml = require('xml2js').parseString;

module.exports = (steamId, callback) => {
	let url = `http://steamcommunity.com/profiles/${steamId}/?xml=1`;
	
	return start(url)
		.then(result => callback(result))
		.catch(err => callback(err.message));
};

function start(url) {
	return getXml(url)
		.then(xmlData => parseXml(xmlData))
		.then(result => {
			if (!result || !result['profile']
				|| !result['profile']['isLimitedAccount']) {
				console.log('Unable to check! Url: ' + url);
				// FIXME
				return Promise.resolve('OK');
			}

			if (result['profile']['isLimitedAccount'][0] == '0') {
				return Promise.resolve('OK');
			} else {
				throw Promise.reject(new Error('Limited account'));
			}
		});
}

function getXml(url) {
    return new Promise( (resolve, reject) => {
        //console.log('getting xml...');
        request(url, (error, response, body) => {
            if(!error && response.statusCode == 200) {
                //console.log(body);
                resolve(body);
            } else {
                reject("Cannot get the xml");
            }
        });
    });
}

function parseXml(xmlData) {
    return new Promise((resolve, reject) => {
        //console.log('parsing xml...');

        xml(xmlData, (error, result) => {

            if(!error) {
                //console.log(result);
                resolve(result);
            } else {
                reject("Cannot parse the xml");
            }
        } );
    });
}
