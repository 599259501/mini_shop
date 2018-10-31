import {WEB_HOST} from "./const.js"

function uploadFile(file_name, form_data, callback, uptask){
	if typeof(callback) !== "function" {
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

export {
	uploadFile
}