// 运维中心
import waGot from './utils/wa-got.js';

export async function getDomainInfo(json, context) {
  let { body } = await waGot.post('wxa/getwxadevinfo', { json, context });
  return body;
}
export async function getPerformance(json, context) {
  let { body } = await waGot.post('wxaapi/log/get_performance', { json, context });
  return body;
}
