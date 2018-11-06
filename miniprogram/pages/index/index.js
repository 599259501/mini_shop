//index.js
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
  },

  tabbarChange: TabbarChange
})
