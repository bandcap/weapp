// 即时配送
import waGot from './utils/wa-got.js';

export async function GetPenaltyList(json, context) {
  let { body } = await waGot.post('wxaapi/wxamptrade/get_penalty_list', { json, context });
  return body;
}

export async function GetGuaranteeStatus(json, context) {
  let { body } = await waGot.post('wxaapi/wxamptrade/get_guarantee_status', { json, context });
  return body;
}
