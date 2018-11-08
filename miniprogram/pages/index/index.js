//index.js
import {GetWxUserInfo} from '../../modules/user.js';
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: ''
  },

  onLoad: function() {
    var _this = this;
    // 获取用户信息
    GetWxUserInfo().then(function(res){
      app.globalData.userInfo = res.userInfo
      _this.setData({
        userInfo: res.userInfo,
        avatarUrl: res.userInfo.avatarUrl
      });
    });
  }
})
