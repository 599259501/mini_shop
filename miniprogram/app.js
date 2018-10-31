//app.js
import {WEB_HOST} from './modules/const.js';
import {Logging} from './modules/utils.js';

App({
  onLaunch: function () {
  	this.initGlobalData()
  	// 获取用户信息
  	var _this = this;
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
                _this.global.avatar_url = res.userInfo.avatarUrl;
                _this.global.user_info = res.userInfo;
            }
          })
        }
      }

    })
  },

  initGlobalData: function(){
  	this.global = {
      user_id: "",
      access_token: "",
      avatar_url: "",
      user_info: {}
    }
  }

})
