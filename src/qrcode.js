import waGot from './utils/wa-got.js';

/**
 * 生成带参数的二维码
 * @param {string} expire_seconds -	该二维码有效时间，以秒为单位。 最大不超过2592000（即30天），此字段如果不填，则默认有效期为60秒。
 * @param {string} action_name -	二维码类型，QR_SCENE为临时的整型参数值，QR_STR_SCENE为临时的字符串参数值，QR_LIMIT_SCENE为永久的整型参数值，QR_LIMIT_STR_SCENE为永久的字符串参数值
 * @param {string} action_info -	二维码详细信息
 * @param {string} scene_id -	场景值ID，临时二维码时为32位非0整型，永久二维码时最大值为100000（目前参数只支持1--100000）
 * @param {string} scene_str -	场景值ID（字符串形式的ID），字符串类型，长度限制为1到64
 * @returns {Promise<{ticket:string;expire_seconds:number;url:number;}>}
 * ticket	获取的二维码ticket，凭借此ticket可以在有效时间内换取二维码。
 * expire_seconds	该二维码有效时间，以秒为单位。 最大不超过2592000（即30天）。
 * url	二维码图片解析后的地址，开发者可根据该地址自行生成需要的二维码图片
 */
export async function qrcodeCreate(json) {
  let body = await waGot.post(`cgi-bin/qrcode/create`, { json }).json();
  return body;
}
/**
 *
 * @param {string} ticket 获取的二维码ticket，凭借此ticket可以在有效时间内换取二维码。
 * @returns
 */
export async function qrcodeGet(ticket) {
  return `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ticket}`;
}
