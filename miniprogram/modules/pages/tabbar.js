import {Logging} from '../../modules/utils.js';

function TabbarChange(event){
    switch(event.detail){
        case 0:
            Logging("点击了第一个下标");
            wx.navigateTo({
                url: "/pages/index/index",
            });
            break;
        case 1:
            Logging("点击了第2个下标");
            wx.navigateTo({
                url: "/pages/userConsole/userConsole",
            });
            break;
        case 2:
            Logging("点击了第3个下标");
            wx.navigateTo({
                url: "/pages/storageConsole/storageConsole",
            });
            break;
        case 3:
            Logging("点击了第4个下标");
            wx.navigateTo({
                url: "/pages/databaseGuide/databaseGuide",
            });
            break;
        default:
            Logging("没有找到对应的下标");
            wx.navigateTo({
                url: "/pages/index/index",
            });
    }
}

export {
    TabbarChange
}