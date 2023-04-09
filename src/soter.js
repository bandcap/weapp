// 生物认证
import waGot from './utils/wa-got.js';

export async function verifySignature(json, context) {
  let { body } = await waGot.post('cgi-bin/soter/verify_signature', { json, context });
  return body;
}
