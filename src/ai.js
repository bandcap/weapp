// 图像处理与文字识别
import waGot from './utils/wa-got.js';

export async function aiCrop(json, context) {
  let { body } = await waGot.post('cv/img/aicrop', { json, context });
  return body;
}
