import waGot from './utils/wa-got.js';

export async function createRoom(json, context) {
  let { body } = await waGot.post('wxaapi/broadcast/room/create', { json, context });
  return body;
}
export async function getLiveInfo(json, context) {
  let { body } = await waGot.post('wxa/business/getliveinfo', { json, context });
  return body;
}
