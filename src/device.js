import waGot from './utils/wa-got.js';

export async function sendHardwareDeviceMessage(json, context) {
  let { body } = await waGot.post('cgi-bin/message/device/subscribe/send', { json, context });
  return body;
}
export async function getSnTicket(json, context) {
  let { body } = await waGot.post('wxa/getsnticket', { json, context });
  return body;
}
