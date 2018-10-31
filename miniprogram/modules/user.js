import {WEB_HOST,SUCCESS_CODE} form "./const.js"

const app = getApp()

function UserLogin(){
	wx.login({
	  success (res) {
	  	RefreshUserLoginInfo(res, LoginSuccessCallback)
	  }
	})
}

/**
 * 刷新用户的登录态信息
 * @param {[type]}   res      {code:"xxx"},code是wx.login获取到的code
 * @param {Function} callback 登录成功回调函数
 */
function RefreshUserLoginInfo(res, callback){
	if (typeof(callback) !== "function") {
		throw "callback must be function";
	}
	wx.request({
		url: WEB_HOST+"/user_login",
		data: {
			code: res.code,
			method: "POST"
		},
		success: callback,
		fail: function(){
			console.log("refresh user login failed....");
		}
	})
}

/**
 * 登录成功回调函数
 * @param {[type]} res [description]
 */
function LoginSuccessCallback(res){
	if (res.code !== SUCCESS_CODE) {
		console.log("login failed!");
		return;
	}

	// 存储用户的userId,accessToken之类的信息
	app.global.user_id = res.info.user_id;
	app.global.access_token = res.info.access_token;
}