import waGot from './utils/wa-got.js';

/**
 * 发送订阅消息
 * @param {string} json.touser - 接收者（用户）的 openid
 * @param {string} json.template_id - 所需下发的订阅模板id
 * @param {string} json.page - 点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数,（示例index?foo=bar）。该字段不填则模板无跳转
 * @param {object} json.data - 模板内容，格式形如 { "key1": { "value": any }, "key2": { "value": any } }的object
 * @returns
 */
export async function sendMessage(json) {
  let { body } = await waGot.post('cgi-bin/message/subscribe/send', { json });
  return body;
}
/**
 * 获取类目 该接口用于获取小程序账号的类目。
 * @returns {Promise<{errcode: number, errmsg: string, data:[{id,name}]}>} - {  "errcode": 0,  "errmsg": "ok",data:[{"id": 616,"name": "公交"}]}
 * @see {@link https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/mp-message-management/subscribe-message/getCategory.html}
 */
export async function getCategory() {
  return await waGot.get('wxaapi/newtmpl/getcategory').json();
}
/**
 * 获取所属类目下的公共模板
 * @param {string} ids - 类目 id，多个用逗号隔开
 * @param {number} start - 用于分页，表示从 start 开始。从 0 开始计数
 * @param {number} limit - 用于分页，表示拉取 limit 条记录。最大为 30
 * @returns {Promise<{}>}
 */
export async function getPubTemplateTitleList(ids, start = 0, limit = 30) {
  let { body } = await waGot.get('wxaapi/newtmpl/getpubtemplatetitles', { searchParams: { ids, start, limit } });
  return body;
}
/**
 * 获取关键词列表 该接口用于获取模板标题下的关键词列表。
 * @param {*} tid - 模板标题 id，可通过接口获取
 * @returns {Promise<{"errcode": 0,"errmsg": "ok","data": [ {  "kid": 1,  "name": "物品名称",  "example": "名称",  "rule": "thing" }]}>}
 */
export async function getPubTemplateKeyWordsById(tid) {
  let { body } = await waGot.get('wxaapi/newtmpl/getpubtemplatekeywords', { searchParams: { tid } });
  return body;
}
/**
 * 添加模板 该接口用于组合模板并添加至帐号下的个人模板库。
 * @param {string} tid - 模板标题 id，可通过接口获取，也可登录小程序后台查看获取
 * @param {Array} kidList  - 开发者自行组合好的模板关键词列表，关键词顺序可以自由搭配（例如 [3,5,4] 或 [4,5,3]），最多支持5个，最少2个关键词组合
 * @param {string} sceneDesc -  服务场景描述，15个字以内
 * @returns
 * @example
 * 请求数据示例
 * {
 *   "tid":"401",
 *   "kidList":[1,2],
 *   "sceneDesc": "测试数据"
 * }
 *
 * 返回数据示例
 * {
 *   "errmsg": "ok",
 *   "errcode": 0,
 *   "priTmplId": "9Aw5ZV1j9xdWTFEkqCpZ7jWySL7aGN6rQom4gXINfJs"
 * }
 */
export async function addMessageTemplate(tid, kidList, sceneDesc) {
  let body = await waGot.post('wxaapi/newtmpl/addtemplate', { json: { tid, kidList, sceneDesc } }).json();
  return body;
}
/**
 * 获取个人模板列表
 * @returns
 */
export async function getMessageTemplateList() {
  let body = await waGot.get('wxaapi/newtmpl/gettemplate').json();
  return body;
}
/**
 * 删除模板
 * @param {*} priTmplId - 要删除的模板id
 * @returns
 */
export async function deleteMessageTemplate(priTmplId) {
  let { body } = await waGot.post('wxaapi/newtmpl/deltemplate', { json: { priTmplId } });
  return body;
}
/**
 * 下发统一消息 该接口用于下发小程序和公众号统一的服务消息。
 * @param {*} touser
 * @param {*} weapp_template_msg - 小程序模板消息相关的信息，可以参考小程序模板消息接口; 有此节点则优先发送小程序模板消息；（小程序模板消息已下线，不用传此节点）
 * @param {*} mp_template_msg - 公众号模板消息相关的信息，可以参考公众号模板消息接口；有此节点并且没有weapp_template_msg节点时，发送公众号模板消息
 * @returns
 */
export async function sendUniformMessage(touser, weapp_template_msg, mp_template_msg) {
  let { body } = await waGot.post('cgi-bin/message/wxopen/template/uniform_send', {
    json: { touser, weapp_template_msg, mp_template_msg },
  });
  return body;
}
/**
 * 创建 activity_id 该接口用于创建被分享动态消息或私密消息的 activity_id。详见动态消息。
 * @param {Object} json
 * @param {string} [json.unionid]	-	为私密消息创建activity_id时，指定分享者为 unionid 用户。其余用户不能用此activity_id分享私密消息。openid与 unionid 填一个即可。私密消息暂不支持云函数生成activity id。
 * @param {string} [json.openid]	-	为私密消息创建activity_id时，指定分享者为 openid 用户。其余用户不能用此activity_id分享私密消息。openid与 unionid 填一个即可。私密消息暂不支持云函数生成activity id。
 * @returns {Promise<{activity_id: string, expiration_time: number, errcode: number, errmsg: string}>} - {  "errcode": "42001",  "errmsg": "access_token 过期"}
 * @throws {Error} - Throws an error if the API call fails.
 * @see {@link https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/mp-message-management/updatable-message/createActivityId.html}
 */
export async function createActivityId(searchParams) {
  let { body } = await waGot.get('cgi-bin/message/wxopen/activityid/create', { searchParams });
  return body;
}
/**
 * 修改动态消息
 * @param {*} activity_id - 动态消息的 ID，通过 createActivityId 接口获取
 * @param {*} target_state - 动态消息修改后的状态（具体含义见后文）
 * @param {object} template_info - 动态消息对应的模板信息 [{name:'',value:''}]
 * @returns
 */
export async function setUpdatableMsg(activity_id, target_state, template_info) {
  let { body } = await waGot.post('cgi-bin/message/wxopen/updatablemsg/send', {
    json: { activity_id, target_state, template_info },
  });
  return body;
}
