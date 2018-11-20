import {WEB_HOST,HTTP_SUCC_CODE,SUCCESS_CODE,SERVER_NOT_ALIVEABLE} from './const.js';

/**
 * TODO success函数需要对服务器做特殊处理，
 */
function POST_SERVER(request_uri, form_data){
    return new Promise((resolve,reject)=>{
        // 调用微信的request接口
        wx.request({
            url: WEB_HOST+"/"+request_uri,
            data: form_data,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: "POST",
            success:(res)=>{
                if (res.statusCode !== HTTP_SUCC_CODE && res.data.code !== SUCCESS_CODE){
                    // 如果是登录态失效，那么就让客户重新登录
                    reject(res);
                    return;
                }
                resolve(res);
            },
            fail:()=>{
                var res = {
                    code: SERVER_NOT_ALIVEABLE,
                    msg: "server is busy..."
                };
                reject(res);
                // TODO 可以做一些接口上报处理
            }
        });
    });
}

/**
 * TODO 需要对success做特殊处理
 * 
 */
function GET_SERVER(request_uri){
    return new Promise((resolve,reject)=>{
        wx.request({
            url: WEB_HOST+"/"+request_uri,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            success:(res)=>{
                if (res.statusCode !== HTTP_SUCC_CODE && res.data.code !== SUCCESS_CODE){
                    resolve(res);
                    return;
                }
                resolve(res);
            },
            fail:(res)=>{
                var res = {
                    code: SERVER_NOT_ALIVEABLE,
                    msg: "server is busy..."
                };
                reject(res);
                // TODO 可以做一些接口上报处理
            }
        });
    });
}

export {
    POST_SERVER
}