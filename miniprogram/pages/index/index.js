//index.js
import {GetWxUserInfo} from '../../modules/user.js';
import {Logging} from '../../modules/utils.js';
import {TabbarChange} from '../../modules/pages/tabbar.js';
const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    imgUrls: [
      '../../images/120x160a0a0.jpg'
    ],
    homeModules: [
    ],
    tabbarActive: 0
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
  },

  tabbarChange: TabbarChange
})
