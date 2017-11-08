type WebSocketDataFromServer = {
	action: string;
	detail: any;
	result: string;
	message: string;
};

type RedeemDetail = {
	key: string;
	result: string;
	details: string;
	packages: { [subId: string]: string };
};

type RedeemTask = {
	no: number;
	key: string;
	/**
	 * Waiting|Redeeming|OK|Failed
	 */
	status: "Waiting" | "Redeeming" | "OK" | "Fail";
	resultMsg: string;
	packages: {
		subId: string;
		name: string;
	}[];
}