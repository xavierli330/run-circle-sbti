const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

exports.main = async (event) => {
  const { fileIds } = event
  if (!fileIds || !fileIds.length) {
    return { success: false, error: 'fileIds required', urls: {} }
  }
  try {
    const res = await cloud.getTempFileURL({ fileList: fileIds })
    const urls = {}
    for (const item of res.fileList) {
      if (item.tempFileURL) {
        urls[item.fileID] = item.tempFileURL
      }
    }
    return { success: true, urls }
  } catch (err) {
    return { success: false, error: err.message, urls: {} }
  }
}
