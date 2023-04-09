// 微信红包封面
import waGot from './utils/wa-got.js';

export async function getRedPacketCoverUrl(json, context) {
  let { body } = await waGot.post('redpacketcover/wxapp/cover_url/get_by_token', { json, context });
  return body;
}
