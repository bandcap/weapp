import waGot from './utils/wa-got.js';
// import waMedia from './utils/wa-media.js';

export async function getTempMedia(json) {
  let { body } = await waGot.post('cgi-bin/media/get', { json });
  return body;
}
/**
 * @see {@ink=https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/kf-mgnt/kf-message/uploadTempMedia.html}
 * 新增图片素材接口，用于把媒体文件上传到微信服务器。目前仅支持图片。用于发送客服消息或被动回复用户消息。
 * @param {string} type - 文件类型，可填“image”，表示图片。
 * @param {Buffer|ReadableStream} form.media - 媒体文件数据，支持 Buffer 或 ReadableStream 类型。
 * @returns {Promise<{type: string, media_id: string, created_at: number}>} - 返回上传后的媒体文件信息，包含文件类型、媒体文件标识、上传时间戳。
 */
export async function uploadTempMedia(form) {
  return await waGot.post('cgi-bin/media/upload', { searchParams: { type: 'image' }, form }).json();
}
