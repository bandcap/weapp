import waGot from './utils/wa-got.js';

export async function setTyping(json, context) {
  let body = await waGot.post('cgi-bin/message/custom/typing', { json }).json();
  return body;
}
/**
 * 当用户在小程序中发送客服消息时，开发者可以在48小时内使用发送客服消息接口向用户发送最多5条消息，以提供更好的客服服务。
 * @param {string}  touser string 是 用户的 OpenID
 * @param {string}  msgtype string 是 消息类型。
 * text表示文本消息；
 * image表示图片消息；
 * link表示图文链接；
 * miniprogrampage表示小程序卡片。
 * @param {TEXT_DATA} [text]   文本消息，msgtype="text" 时必填
 * @param {IMAGE_DATA} [image]   图片消息，msgtype="image" 时必填
 * @param {LINK_DATA} [link]   图文链接，msgtype="link" 时必填
 * @param {MINIPROGRAMPAGE_DATA}  [miniprogrampage] 小程序卡片，msgtype="miniprogrampage" 时必填
 * @returns {Promise<{errcode:number;errmsg:string}>}
 *
 * @typedef {object} TEXT_DATA
 * @prop {string} [content] 文本消息内容。msgtype="text" 时必填
 * @typedef {object} IMAGE_DATA
 * @prop {string} [media_id] 发送的图片的媒体ID，通过 uploadTempMedia上传图片文件获得。
 * @typedef {object} LINK_DATA
 * @prop {string} [title] 消息标题
 * @prop {string} [description] 图文链接消息
 * @prop {string} [url] 图文链接消息被点击后跳转的链接
 * @prop {string} [thumb_url] 图文链接消息的图片链接，支持 JPG、PNG 格式，较好的效果为大图 640 X 320，小图 80 X 80
 * @typedef {object} MINIPROGRAMPAGE_DATA
 * @prop {string} [title]   消息标题
 * @prop {string} [pagepath]   小程序的页面路径，跟app.json对齐，支持参数，比如pages/index/index?foo=bar
 * @prop {string} [thumb_media_id]   小程序消息卡片的封面， image 类型的 media_id，通过 uploadTempMedia接口上传图片文件获得，建议大小为 520*416
 *
 * @see {@link https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/kf-mgnt/kf-message/sendCustomMessage.html}
 * @see {@link https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/customer-message/send.html}
 */
export async function sendCustomMessage(json) {
  let body = await waGot.post('cgi-bin/message/custom/send', { json }).json();
  return body;
}
