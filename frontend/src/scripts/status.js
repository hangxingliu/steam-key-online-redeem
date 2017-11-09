//@ts-check

import * as notification from "./notification";

export let connecting = () => displayStatus('statusConnecting');

/** @param {WebSocketDataFromServer} serverInfo */
export let connected = (serverInfo) => {
	if (serverInfo) { 
		$('#serverName').text(serverInfo.server);
		$('#serverVersion').text('v' + serverInfo.version);
	}


	displayStatus('statusConnected');
	$('#cardLogin').show();
}
export let logined = username => {
	displayStatus('statusLogined');
	$('#txtUsername').text(username);
	
	$('#cardLogin').hide();
	$('#cardInput').show();
}
export let broken = reason => {
	displayStatus('statusBroken');
	$('#txtBrokenReason').text(reason);

	$('#cardLogin').hide();
	$('#cardInput').hide();

	notification.disconnected();
}

function displayStatus(id) {
	$('.card-status').hide()
		.filter(`#${id}`).show();
}