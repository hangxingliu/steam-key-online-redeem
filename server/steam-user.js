let SteamUser = require('steam-user');

SteamUser.prototype.bindWebSocket = function (webSocket) {
	this.webSocket = webSocket;
};

/**
 * overwrite steamGuardPrompt method to support webSocket
 * @param {(authCode: string) => any} callback
 */
SteamUser.prototype._steamGuardPrompt = function(domain, lastCodeWrong, callback) {
	if (this.options.promptSteamGuardCode) {

		//Original codes:
		/*
		var rl = require('readline').createInterface({
			"input": process.stdin,
			"output": process.stdout
		});
		rl.question('Steam Guard' + (!domain ? ' App' : '') + ' Code: ', function(code) {
			rl.close();
			callback(code);
		});
		*/

		this.authCode = null;
		// console.log('authCode wrong!')
		try {
			this.webSocket.send(JSON.stringify({ action: 'authCode' }));
		} catch (err) { 
			// TODO
		}
		this.once('inputAuthCode', callback.bind(this)); //callback(authCode)

	} else {
		this.emit('steamGuard', domain, callback, lastCodeWrong);
	}
};

module.exports = SteamUser;