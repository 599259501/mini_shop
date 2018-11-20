//index.js
import {GetWxUserInfo,UserLogin} from '../../modules/user.js';
import {Logging} from '../../modules/utils.js';
import {TabbarChange} from '../../modules/pages/tabbar.js';
import {GetHomeData} from "../../modules/index.js";

const app = getApp();

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
    tabbarActive: 0,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function() {
    // 查看用户是否已经授权过了
    Logging("canIUse=",this.data.canIUse);
    var _this = this;
    // 获取用户信息
    GetWxUserInfo().then(function(res){
      app.globalData.userInfo = res.userInfo
      _this.setData({
        userInfo: res.userInfo,
        avatarUrl: res.userInfo.avatarUrl
      });
    }, function(res){
          Logging('res=',res);
          // 如果是授权不通过，那么就重定向到授权页面
          if (res.hasOwnProperty('authSetting') && !res.authSetting['scope.userInfo']) {
            wx.navigateTo({
              'url': '/pages/test_auth/test_auth'
            });
          }
        }
    );

    // 去换取用户的登录态信息
    UserLogin();

    // 获取首页数据
    GetHomeData();
  },

  tabbarChange: TabbarChange
})
