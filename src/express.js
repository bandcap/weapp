// 即时配送
import waGot from './utils/wa-got.js';

export async function getAllImmeDelivery(json, context) {
  let { body } = await waGot.post('cgi-bin/express/local/business/delivery/getall', { json, context });
  return body;
}
