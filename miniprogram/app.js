//app.js
import {WEB_HOST} from './modules/const.js'

App({
  onLaunch: function () {
    this.globalData = {
      user_id: "",
      access_token: "",
      canIUse: false,
      user_info: {}
    };
  }
})
