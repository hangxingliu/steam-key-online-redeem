export let strings = {
	title: "Steam Key 批量激活工具",
	title_login: '登录 Steam',

	disconnect_with_server: '与服务器断开连接! ',
	
	login_failed: '登录失败!',

	login_missing_username: '请输入你的Steam账号',
	login_missing_password: '请输入你的Steam密码',
	
	login_username: '用户名',
	login_password: '密码',

	login: '登录',
	logining: '登录中...',

	steam_guard: 'Steam 令牌',
	steam_guard_from: '你可以从你的手机APP或电子邮箱中找到',
	btn_continue: '继续登录',

	"export": '导出',
	cancel: '取消',
	export_file_name: '导出文件名',
	export_settings: '导出设置',
	export_asf: 'ASF格式',	
	export_redeemed: '已兑换的',
	export_failed: '兑换失败的',
	export_waiting: '未兑换的',
	export_results: '导出结果',
	export_filter: '筛选',
	
	export_filter_redeemed: '已兑换的',
	export_filter_waiting: '排队中的',
	export_filter_already: '失败:已拥有的',
	export_filter_rate: '失败:兑换次数上限',
	export_filter_country: '失败:区域限制',
	export_filter_required: '失败:需要主游戏',

	notification: '桌面通知(兑换完成/断开连接/兑换超限时通知)',
	notification_unsupported: '(你的浏览器不支持!)',
	finish: '兑换完成!',

	label_keys: '激活码(支持很多很多个):',
	redeem: '激活',
	redeem_result: '激活结果',
	redeem_limited: [
		'致命错误: Steam 限制了你的激活(短时间内激活/失败次数太多) ',
		'建议对这个账号的游戏激活在一个小时后再进行'
	],
	table_no: 'No.',
	table_key: 'Key',
	table_status: '状态',
	table_name: '信息',

	status_unsupported: [
		'你的浏览器太老了,此工具无法支持',
		'(推荐浏览器:Chrome, Firefox, Edge)',
		'(请保持你的浏览器是最新的版本)'
	],
	status_connecting: '正在连接到服务器...',
	status_connected: '已连接,现在你可以登录你的Steam账号了.',
	status_loggedin: '已登录,输入Key点击"激活"吧, 用户名: ',
	status_refresh: '请刷新过当前页面.',

	made_by: '本项目由我: ',
	based_on_project: '基于项目',
	based_on_project_from: ' 开发, 原项目作者: ',
	license_prefix: '本项目开源协议:',
	icon_from: '图标来源 ',
	framework_on: '前端页面基于 ',
	fonts_from_1: '使用了字体 (',
	fonts_from_2: ') 来源于',
	donate_link: '捐赠链接: ',
	donation_description: [
		'你的捐赠能撑起开源的美好明天, ',
		'也能让免费的公用SteamKey激活服务器走的更远'
	],

	'result:RetryLater': ' (稍后重试)',

	'result:InvalidPassword': '无效的密码',
	'result:TwoFactorCodeMismatch': '安全令错误',
	'result:Limited account': '受限用户暂无法使用',
	'result:AuthCodeError': '验证码有误',
	
	'result:Waiting': '排队中...',
	'result:Redeeming': '兑换中...',
	'result:OK': '成功',
	'result:Fail': '失败',

	'result:NoDetail': ' ',
	'result:AlreadyPurchased': '已拥有',
	'result:DuplicateActivationCode': '重复激活',
	'result:BadActivationCode': '无效激活码',
	'result:RateLimited': '次数上限',
	'result:DoesNotOwnRequiredApp': '缺少主游戏',
	'result:RestrictedCountry': '区域限制',

};