import waGot from './utils/wa-got.js';

/**
 * https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/openApi-mgnt/clearQuota.html
 * @param {*} appid
 * @param {*} context
 * @returns
 */
export async function clearQuota(appid, context) {
  let { body } = await waGot.post(`clear_quota`, { json: { appid }, context });
  return body;
}
export async function getApiQuota(cgi_path, context) {
  let { body } = await waGot.post(`openapi/quota/get`, { json: { cgi_path }, context });
  return body;
}
export async function getRidInfo(rid, context) {
  let { body } = await waGot.post(`openapi/rid/get`, { json: { rid }, context });
  return body;
}
/**
 * 本接口用于清空公众号/小程序等接口的每日调用接口次数
 * @param {*} appid
 * @param {*} appsecret
 * @param {*} context
 * @returns
 */
export async function clearQuotaByAppSecret(appid, appsecret, context) {
  let { body } = await waGot.post(`clear_quota`, { json: { appid, appsecret }, context });
  return body;
}
