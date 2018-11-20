import {WEB_HOST, SUCCESS_CODE} from "./const.js";
import {Logging} from "./utils.js";

const app = getApp()

function UserLogin(){
	// 先查看本地是否有sessionInfo信息,如果有，那么就直接使用本地的登录态信息
	if (LoadLocalSession()) {
		return;
	}
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
	Logging("wx.res.code=", res.code);
	wx.request({
		url: WEB_HOST+"/v1/mini_login",
		data: {
			code: res.code,
		},
		header: {
  			'content-type': 'application/x-www-form-urlencoded', // 默认值
			'Accept': 'application/json'
  		},
		method: "POST",
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
	res = res.data;
	if (res.code !== SUCCESS_CODE) {
		console.log("login failed!");
		return;
	}
	Logging("res=",res);
	// 先把session信息存储到本地
	try{
			wx.setStorage({
			key:"sessionInfo",
			data: {
				"user_id": res.data.user_id,
				"access_token": res.data.access_token
			}
		});
	}catch(e){
		Logging("储存sessionInfo 失败,错误信息err=", e)
	}
	
	// 存储用户的userId,accessToken之类的信息
	app.globalData.user_id = res.data.user_id;
	app.globalData.access_token = res.data.access_token;	
	Logging("res.globalData=", app.globalData);
}

/**
 * 获取用户登录态信息
 */
function GetUserLoginInfo(){
	return {
		user_id: app.globalData.user_id,
		access_token: app.globalData.access_token
	}
}
/*
 * 获取用户微信授权信息
 */
function GetWxUserInfo(){
	return new Promise((resolve, reject)=> {
		wx.getSetting({
			success: res=>{
				if (res.authSetting['scope.userInfo']) {
					wx.getUserInfo({
						success: function(res){
							resolve(res);
						},
						fail: function(res){
							reject(res);
						}
					});
				} else { // 开启授权模式
					Logging("get auth fail");
					reject(res);
				}
			}
		})
	});
}

// 加载本地的session信息
function LoadLocalSession(){
	try{
		var value = wx.getStorageSync("sessionInfo");
		if (value){
			app.globalData.user_id = value.user_id;
			app.globalData.access_token = value.access_token;
			return true;
		}
	}catch(e){
		Logging("get Local Session fail,e=", e);
	}
	return false;
}
export {
	GetWxUserInfo,
	UserLogin,
	LoadLocalSession
}