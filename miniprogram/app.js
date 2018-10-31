//app.js
import {WEB_HOST} from './modules/const.js'

App({
  onLaunch: function () {
    this.global = {
      user_id: "",
      access_token: "",
    }
  }
})
