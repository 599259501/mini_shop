import {WEB_HOST,LOG_LEVEL} from "./const.js"

<<<<<<< .merge_file_a07732
/**
 * 上传文件
 * @param  {[type]}   file_name 文件名
 * @param  {[type]}   form_data 表单数据
 * @param  {Function} callback  成功回调函数
 * @param  {[type]}   uptask    进度函数
 * @return {[type]}             [description]
 */
function UploadFile(file_name, form_data, callback, uptask){
	if (typeof(callback) !== "function") {
=======
/*
    上传文件
 */
function uploadFile(file_name, form_data, callback, uptask){
    if (typeof(callback) !== "function") {
>>>>>>> .merge_file_a10180
		throw "callback must be function type";
	}

	const uploadTask = wx.uploadFile({
      url: WEB_HOST+"/file_upload",
      filePath: tempFilePaths[0],
      name: 'file',
      formData: form_data,
      success: callback
	})
    // 处理上传进度
    uploadTask.onProgressUpdate(uptask)

    return uploadTask
}


function Logging(msg){
  if (LOG_LEVEL == "debug") {
    console.log(msg)
  }
}

export {
	UploadFile,
  Logging
}