type ServerConfig = {
	"port": number;
	"id": string;
	"name": string;
	"log_enabled": boolean;
	"post_address": string;
};

type WebSocketDataFromClient = {
	action: string;
	username: string;
	password: string;
	authcode: string;
	authCode: string;
	keys: string[];
};

type SteamUserInstance = {

};