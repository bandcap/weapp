// 附近小程序
import waGot from './utils/wa-got.js';

export async function addNearbyPoi(json, context) {
  let { body } = await waGot.post('wxa/addnearbypoi', { json, context });
  return body;
}
export async function deleteNearbyPoi(json, context) {
  let { body } = await waGot.post('wxa/delnearbypoi', { json, context });
  return body;
}
export async function getNearbyPoiList(json, context) {
  let { body } = await waGot.post('wxa/getnearbypoilist', { json, context });
  return body;
}
export async function setShowStatus(json, context) {
  let { body } = await waGot.post('wxa/setnearbypoishowstatus', { json, context });
  return body;
}
