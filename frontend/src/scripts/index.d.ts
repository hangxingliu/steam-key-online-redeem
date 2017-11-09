type WebSocketDataFromServer = {
	action: string;
	detail: any;
	result: string;
	message: string;
	server: string;
	version: string;
};

type RedeemDetail = {
	key: string;
	result: string;
	details: string;
	packages: { [subId: string]: string };
};
type RedeemStatus = "Waiting" | "Redeeming" | "OK" | "Fail";
type RedeemMessage = "" |
	"NoDetail" |
	"AlreadyPurchased" |
	"DuplicateActivationCode" |
	"BadActivationCode" |
	"RateLimited" |
	"DoesNotOwnRequiredApp" |
	"RestrictedCountry";

type RedeemTask = {
	no: number;
	key: string;
	/**
	 * Waiting|Redeeming|OK|Failed
	 */
	status: RedeemStatus;
	resultMsg: string;
	/**
	 * try to redeem times.
	 */
	redeemTimes: number,
	packages: {
		subId: string;
		name: string;
	}[];
}