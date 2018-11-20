import {POST_SERVER} from 'request_server.js';
import {Logging} from 'utils.js';
const app = getApp()

function GetHomeData(){
    POST_SERVER("v1/get_home_data", {
        'user_id': app.globalData.user_id,
        'access_token': app.globalData.access_token,
    }).then(function(res){
        // 如果请求成功了，那么就
        Logging("request succ");
    }, function(reason){
        Logging(reason);
    });
}

export{
    GetHomeData
}