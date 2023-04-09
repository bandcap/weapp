// 广告
import waGot from './utils/wa-got.js';
// 上传购物详情
// 接口应在服务器端调用，详细说明参见服务端API。
export async function adAddUserAction(json, context) {
  let { body } = await waGot.post('marketing/user_actions/add', { json, context });
  return body;
}

export async function adAddUserActionSet(json, context) {
  let { body } = await waGot.post('marketing/user_action_sets/add', { json, context });
  return body;
}
