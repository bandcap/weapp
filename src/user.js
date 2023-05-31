import * as dotenv from 'dotenv';
import waGot from './utils/wa-got.js';

const result = dotenv.config({ debug: false });
if (result.error) throw result.error;
let { WEAPP_APPID, WEAPP_SECRET } = result.parsed;
if (!WEAPP_APPID || !WEAPP_SECRET) throw new Error('[WAGOT]:未定义小程序信息');
/**
 * 小程序登录
 * 登录凭证校验。通过 wx.login 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程。更多使用方法详见小程序登录。
 * @see {@link https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-login/code2Session.html}
 * @param {string} appid -	小程序 appId
 * @param {string} secret	-	小程序 appSecret
 * @param {string} js_code	-	登录时获取的 code，可通过wx.login获取
 * @param {string} grant_type	-	授权类型，此处只需填写 authorization_cod
 * @returns
 */
export async function code2Session(js_code) {
  let body = await waGot
    .get(`sns/jscode2session`, {
      searchParams: { appid: WEAPP_APPID, secret: WEAPP_SECRET, js_code, grant_type: 'authorization_code' },
    })
    .json();
  return body;
}
/**
 * 获取插件用户openpid
 * docs: https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-info/basic-info/getPluginOpenPId.html
 * @param { string } code - 通过 wx.pluginLogin 获得的插件用户标志凭证 code，有效时间为5分钟，一个 code 只能获取一次 openpid。
 * @returns
 */
export async function getpluginopenpid(code) {
  let { body } = await waGot.post(`wxa/getpluginopenpid`, { json: { code } });
  return body;
}
/**
 * 检查加密信息
 * https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-info/basic-info/checkEncryptedData.html
 * @param {*} encrypted_msg_hash 加密数据的sha256，通过Hex（Base16）编码后的字符串
 * @param {*} context
 * @returns
 */
export async function checkencryptedmsg(encrypted_msg_hash) {
  let { body } = await waGot.post(`wxa/business/checkencryptedmsg`, { json: { encrypted_msg_hash } });
  return body;
}
/**
 * 支付后获取 Unionid
 * https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-info/basic-info/getPaidUnionid.html
 * @param {*} searchParams.openid 是	支付用户唯一标识
 * @param {*} searchParams.transaction_id 否	微信支付订单号
 * @param {*} searchParams.mch_id 否	微信支付分配的商户号，和商户订单号配合使用
 * @param {*} searchParams.out_trade_no 否	微信支付商户订单号，和商户号配合使用
 * @param {*} context
 * @returns
 * unionid	string	用户唯一标识，调用成功后返回
 * errcode	number	错误码
 * errmsg	string	错误信息
 */
export async function getpaidunionid(searchParams) {
  let { body } = await waGot.get(`wxa/getpaidunionid`, { searchParams });
  return body;
}
/**
 * https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-info/internet/getUserEncryptKey.html
 * 获取用户encryptKey
 * @param {*} json.openid	-	用户的openid
 * @param {*} json.signature	-	用 sessionkey 对空字符串签名得到的结果。session_key可通过code2Session接口获得。
 * @param {*} json.sig_method	-	签名方法，只支持 hmac_sha256
 * @param {*} context
 * @returns
 */
export async function getuserencryptkey(json) {
  let { body } = await waGot.post(`wxa/business/getuserencryptkey`, { json });
  return body;
}
/**
 * 获取手机号
 * https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-info/phone-number/getPhoneNumber.html
 * @param {*} code 手机号获取凭证
 * @param {*} context
 * @returns
 */
export async function getuserphonenumber(code) {
  let { body } = await waGot.post(`wxa/business/getuserphonenumber`, { json: { code } });
  return body;
}
