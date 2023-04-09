// 微信服务市场
import waGot from './utils/wa-got.js';

export async function invokeService(json, context) {
  let { body } = await waGot.post('wxa/servicemarket', { json, context });
  return body;
}
