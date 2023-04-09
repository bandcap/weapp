import waGot from './utils/wa-got.js';

/**
 * A: 获取小程序码 - 永久有效，有数量限制
 * @description 该接口用于获取小程序码，适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制，详见获取小程序码。
 * 注意事项：
 * - 如果调用成功，会直接返回图片二进制内容，如果请求失败，会返回 JSON 格式的数据。
 * - POST 参数需要转成 JSON 字符串，不支持 form 表单提交。
 * - 与 createQRCode 总共生成的码数量限制为 100,000，请谨慎调用。已生成码数量参考HTTP Header的Num-Used
 * @param {string} json.path - 扫码进入的小程序页面路径，最大长度 1024 字节，不能为空；对于小游戏，可以只传入 query 部分，来实现传参效果，如：传入 "?foo=bar"，即可在 wx.getLaunchOptionsSync 接口中的 query 参数获取到 {foo:"bar"}。
 * @param {number} [json.width=430] - 二维码的宽度，单位 px。最小 280px，最大 1280px
 * @param {boolean} [json.auto_color=false] - 自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调
 * @param {object} [json.line_color={"r":0,"g":0,"b":0}] - auto_color 为 false 时生效，使用 rgb 设置颜色 例如 {"r":"xxx","g":"xxx","b":"xxx"} 十进制表示
 * @param {boolean} [json.is_hyaline=false] - 是否需要透明底色，为 true 时，生成透明底色的小程序码
 * @returns {Promise<{ "errcode": number, "errmsg": string, "contentType": string, "buffer": Buffer}>}
 * @see {@link=https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/qrcode-link/qr-code/getQRCode.html}
 */
export async function getQRCode(json) {
  let { body } = waGot.stream.post('wxa/getwxacode', { json });
  body = body.toString();
  if (body.includes('errmsg')) return JSON.parse(body);
  return body;
}
/**
 * B: 获取不限制的小程序码
 * @description 该接口用于获取小程序码，适用于需要的码数量极多的业务场景。
 * 通过该接口生成的小程序码，永久有效，数量暂无限制。 更多用法详见 获取小程序码。
 * 注意事项:
 * - 如果调用成功，会直接返回图片二进制内容，如果请求失败，会返回 JSON 格式的数据。
 * - POST 参数需要转成 JSON 字符串，不支持 form 表单提交。
 * - 调用分钟频率受限（5000次/分钟），如需大量小程序码，建议预生成
 * 获取 scene 值:
 * - scene 字段的值会作为 query 参数传递给小程序/小游戏。用户扫描该码进入小程序/小游戏后，开发者可以获取到二维码中的 scene 值，再做处理逻辑。
 * - 调试阶段可以使用开发工具的条件编译自定义参数 scene=xxxx 进行模拟，开发工具模拟时的 scene 的参数值需要进行 encodeURIComponent

 * @param {string} json.scene - ?foo=bar,问号后面参数 最大32个可见字符，只支持数字，大小写英文以及部分特殊字符
 * @param {string} [json.page] - 页面 page，默认是主页，例如 pages/index/index，根路径前不要填加 /，不能携带参数
 * @param {boolean} [json.checkPath=true] - 检查 page 是否存在，为 true 时 page 必须是已经发布的小程序存在的页面；为 false 时允许小程序未发布或者 page 不存在，但 page 有数量上限（60000个）
 * @param {string} [json.envVersion='release'] - 要打开的小程序版本。
 * 正式版为 "release"，
 * 体验版为 "trial"，
 * ! 开发版为 "develop"。
 * 默认是正式版。
 * @param {number} [json.width=430] - 二维码的宽度，单位 px，最小 280px，最大 1280px
 * @param {boolean} [json.autoColor=false] - 自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调，默认 false
 * @param {object} [json.lineColor={"r":0,"g":0,"b":0}] - autoColor 为 false 时生效，使用 rgb 设置颜色，例如 {"r":"xxx","g":"xxx","b":"xxx"} 十进制表示
 * @param {boolean} [json.isHyaline=false] - 是否需要透明底色，为 true 时，生成透明底色的小程序
 * @returns {Promise<{ "errcode": number, "errmsg": string, "contentType": string, "buffer": Buffer}>} 图片 Buffer
 * @throws {Error} 如果请求失败，会抛出异常
 * @example
 * {
 *  "page": "pages/index/index",
 *  "scene": "a=1",
 *  "check_path": true,
 *  "env_version": "release"
 * } 
 * 返回：
 * {
 *  "errcode": 0,
 *  "errmsg": "ok",
 *  "contentType": "image/jpeg",
 *  "buffer": Buffer
 * } 


 * @see {@link https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/qrcode-link/qr-code/getUnlimitedQRCode.html}
 */
export async function getUnlimitedQRCode(json) {
  let { body } = await waGot.post('wxa/getwxacodeunlimit', { json, responseType: 'buffer' });
  body = body.toString();
  if (body.includes('errmsg')) return JSON.parse(body);
  return body;
}
/**
 * C：获取小程序二维码
 * @deprecated 不推荐
 * @description 获取小程序二维码，适用于需要的码数量较少的业务场景。
 * 通过该接口生成的小程序码，永久有效，有数量限制，详见获取二维码。
 * 注意事项:
 * - POST 参数需要转成 JSON 字符串，不支持 form 表单提交。
 * - 接口只能生成已发布的小程序的二维码。
 * - 开发版的带参二维码可以在开发者工具预览时生成。
 * - 与 wxacode.get 总共生成的码数量限制为 100,000，请谨慎调用。
 * @param {string} path - 扫码进入的小程序页面路径，最大长度 128 字节，不能为空；
 * 对于小游戏，可以只传入 query 部分，来实现传参效果，如：传入 "?foo=bar"，
 * 即可在 wx.getLaunchOptionsSync 接口中的 query 参数获取到 {foo:"bar"}。
 * @param {number} [width] - 二维码的宽度，单位 px。最小 280px，最大 1280px;默认是430
 * @returns {Promise<{ "errcode": number, "errmsg": string, "contentType": string, "buffer": Buffer}>}
 * @see {@link https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/qrcode-link/qr-code/createQRCode.html}
 */
export async function createQRCode(json) {
  let body = await waGot.post('cgi-bin/wxaapp/createwxaqrcode', { json }).json();
  return body;
}
/**
 * 查询scheme码
 * @description 该接口用于查询小程序 scheme 码。
 * @param {string} json.scheme 小程序 scheme 码
 * @returns {Promise<{errcode:number;errmsg:string;scheme_info:SCHEME_INFO}>}
 * @prop {number} errcode 错误码
 * @prop {string} errmsg 错误信息
 * @typedef {object} SCHEME_INFO 配置
 * @prop {string} appid 小程序 appid
 * @prop {string} path 小程序页面路径
 * @prop {string} query 小程序页面query
 * @prop {string} create_time 创建时间，为 Unix 时间戳
 * @prop {string} expire_time 到期失效时间，为 Unix 时间戳，0 表示永久生效
 * @prop {string} env_version 要打开的小程序版本。正式版为"release"，体验版为"trial"，开发版为"develop"
 * @prop {string} visit_openid 访问scheme的用户openid，为空表示未被访问过
 * @example
 * {
 *     "scheme": "weixin://dl/business/?t=XTSkBZlzqmn"
 * }
 */
export async function queryScheme(json) {
  let body = await waGot.post('wxa/queryscheme', { json }).json();
  return body;
}
/**
 * 获取scheme码
 * @description
 * 该接口用于获取小程序 scheme 码，适用于短信、邮件、外部网页、微信内等拉起小程序的业务场景。
 * - 每天生成 URL Scheme 和 URL Link 总数量上限为50万
 * - URL Scheme有效期最长 30 天
 * - 只能被1个用户访问
 * @param {JSON_DATA} json
 * @returns {Promise<RETURN_DATA>}
 *
 * @typedef {object} JUMP_WXA
 * @prop {string} [path] - 通过 scheme 码进入的小程序页面路径，必须是已经发布的小程序存在的页面，不可携带 query。path 为空时会跳转小程序主页。
 * @prop {string} [query] - 通过 scheme 码进入小程序时的 query，最大1024个字符，只支持数字，大小写英文以及部分特殊字符：`!#$&'()*+,/:;=?@-._~%``
 * @prop {string} [env_version] - 默认值"release"。要打开的小程序版本。正式版为"release"，体验版为"trial"，开发版为"develop"，仅在微信外打开时生效
 *
 * @typedef {object} JSON_DATA
 * @prop {JUMP_WXA} [jump_wxa] - 跳转到的目标小程序信息。
 * @prop {boolean} [is_expire] - 默认值false。生成的 scheme 码类型，到期失效：true，30天有效：false。
 * @prop {number} [expire_time] - 到期失效的 scheme 码的失效时间，为 Unix 时间戳。生成的到期失效 scheme 码在该时间前有效。最长有效期为30天。is_expire 为 true 且 expire_type 为 0 时必填
 * @prop {number} [expire_type] - 默认值0，到期失效的 scheme 码失效类型，失效时间：0，失效间隔天数：1
 * @prop {number} [expire_interval] - 到期失效的 scheme 码的失效间隔天数。生成的到期失效 scheme 码在该间隔时间到达前有效。最长间隔天数为30天。is_expire 为 true 且 expire_type 为 1 时必填
 *
 * @typedef {object} RETURN_DATA
 * @prop {number} errcode	错误码
 * @prop {string} errmsg 错误信息
 * @prop {string} openlink 生成的小程序 scheme 码
 */
export async function generateScheme(json) {
  let body = await waGot.post('wxa/generatescheme', { json }).json();
  return body;
}
/**
 * 获取 NFC 的小程序 scheme
 * @param {JSON_DATA} json
 * @returns {Promise<RETURN_DATA>}
 *
 * @typedef {object} JSON_DATA
 * @prop {JUMP_WXA} [jump_wxa] - 跳转到的目标小程序信息。
 * @prop {string} model_id - scheme对应的设备model_id
 * @prop {string} [sn] - scheme对应的设备sn，仅一机一码时填写
 * @typedef {object} JUMP_WXA
 * @prop {string} [path] - 通过 scheme 码进入的小程序页面路径，必须是已经发布的小程序存在的页面，不可携带 query。path 为空时会跳转小程序主页
 * @prop {string} [query] - 通过 scheme 码进入小程序时的 query，最大1024个字符，只支持数字，大小写英文以及部分特殊字符：`!#$&'()*+,/:;=?@-._~%``
 * @prop {string} [env_version] - 要打开的小程序版本。正式版为"release"，体验版为"trial"，开发版为"develop"，仅在微信外打开时生效
 * @typedef {object} RETURN_DATA
 * @prop {number} errcode - 错误码
 * @prop {string} errmsg - 错误信息
 * @prop {string} openlink - 生成的小程序 scheme 码
 */
export async function generateNFCScheme(json) {
  let body = await waGot.post('wxa/generatenfcscheme', { json }).json();
  return body;
}
export async function generateUrlLink(json) {
  let body = await waGot.post('wxa/generate_urllink', { json }).json();
  return body;
}
export async function queryUrlLink(json) {
  let body = await waGot.post('queryUrlLink', { json }).json();
  return body;
}
export async function generateShortLink(json) {
  let body = await waGot.post('wxa/genwxashortlink', { json }).json();
  return body;
}
