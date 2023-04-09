import waGot from './utils/wa-got.js';

/**
 * 文本内容安全识别
 * @description 功能描述: 该接口用于检查一段文本是否含有违法违规内容。
 * 应用场景:
 *  用户个人资料违规文字检测；
 *  媒体新闻类用户发表文章，评论内容检测；
 *  游戏类用户编辑上传的素材(如答题类小游戏用户上传的问题及答案)检测等。
 * 注意事项:
 *  -1.0 版本接口文档【点击查看】，1.0版本在2021年9月1日停止更新，请尽快更新至2.0
 *  频率限制：单个 appId 调用上限为 4000 次/分钟，2,000,000 次/天。
 * @param {string} content 需检测的文本内容，文本字数的上限为2500字，需使用UTF-8编码
 * @param {number} version 接口版本号，2.0版本为固定值2
 * @param {number} scene 场景枚举值（1 资料；2 评论；3 论坛；4 社交日志）
 * @param {string} openid 用户的openid（用户需在近两小时访问过小程序）
 * @param {string} [title] 文本标题，需使用UTF-8编码
 * @param {string} [nickname] 用户昵称，需使用UTF-8编码
 * @param {string} [signature] 个性签名，该参数仅在资料类场景有效(scene=1)，需使用UTF-8编码
 * @returns {Promise<{detail:DETAIL_DATA[];trace_id:string;result:RESULT_DATA;errcode:string;errmsg:string}>}
 * @prop {string} trace_id - 唯一请求标识，标记单次请求
 *
 * @typedef {object} DETAIL_DATA - 详细检测结果
 * @prop {string} strategy 策略类型
 * @prop {number} errcode 错误码，仅当该值为0时，该项结果有效
 * @prop {string} suggest 建议，有risky、pass、review三种值
 * @prop {number} label 命中标签枚举值，
 *  100 正常；
 *  10001 广告；
 *  20001 时政；
 *  20002 色情；
 *  20003 辱骂；
 *  20006 违法犯罪；
 *  20008 欺诈；
 *  20012 低俗；
 *  20013 版权；
 *  21000 其他
 * @prop {string} keyword 命中的自定义关键词
 * @prop {number} prob 0-100，代表置信度，越高代表越有可能属于当前返回的标签（label）
 * @typedef {object} RESULT_DATA - 综合结果
 * @prop {string}  suggest	建议，有risky、pass、review三种值
 * @prop {number} label	命中标签枚举值，
 *    100 正常；
 *    10001 广告；
 *    20001 时政；
 *    20002 色情；
 *    20003 辱骂；
 *    20006 违法犯罪；
 *    20008 欺诈；
 *    20012 低俗；
 *    20013 版权；
 *    21000 其他
 * @see {@link https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/sec-center/sec-check/msgSecCheck.html}
 */
const LABEL_ENUM = {
  100: '正常',
  10001: '广告',
  20001: '时政',
  20002: '色情',
  20003: '辱骂',
  20006: '违法犯罪',
  20008: '欺诈',
  20012: '低俗',
  20013: '版权',
  21000: '其他',
};
export async function msgSecCheck({ openid, content, scene = 3, title = '', nickname = '', signature = '' }) {
  let json = { openid, scene, content, version: 2 };
  if (title) json.title = title;
  if (nickname) json.nickname = nickname;
  if (scene === 1 && signature) json.signature = signature;
  let body = await waGot.post('wxa/msg_sec_check', { json }).json();
  console.log({ msgSecCheck: body });
  if (body.result && body.result.suggest === 'risky')
    return { errcode: 87014, errmsg: `内容含有${[body.result.label]}内容` };
  return body;
}
/**
 * 音视频内容安全识别
 * @param {string} media_url  要检测的图片或音频的url，
 * 支持图片格式包括jpg, jpeg, png, bmp, gif（取首帧），
 * 支持的音频格式包括mp3, aac, ac3, wma, flac, vorbis, opus, wav
 * @param {number} media_type  1:音频;2:图片
 * @param {number} version  接口版本号，2.0版本为固定值2
 * @param {number} scene   场景枚举值（1 资料；2 评论；3 论坛；4 社交日志）
 * @param {string} openid   用户的openid（用户需在近两小时访问过小程序）
 * @returns {Promise<{trace_id:string;errcode:string;errmsg:string}>}
 * @prop {string} trace_id - 唯一请求标识，标记单次请求，用于匹配异步推送结果
 * @see {@link https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/sec-center/sec-check/mediaCheckAsync.html}
 */
export async function mediaCheckAsync(json) {
  return await waGot.post('wxa/media_check_async', { json }).json();
}
/**
 * 获取用户安全等级
 * 功能描述: 该接口用于根据提交的用户信息数据获取用户的安全等级 risk_rank（无需用户授权）。
 * @param {string} appid - 小程序appid
 * @param {string} openid - 用户的openid
 * @param {number} scene - 场景值，0:注册，1:营销作弊
 * @param {string} [mobile_no] - 用户手机号
 * @param {string} client_ip - 用户访问源ip
 * @param {string} [email_address] - 用户邮箱地址
 * @param {string} [extended_info] - 额外补充信息
 * @param {boolean} [is_test] - 默认值false。false：正式调用，true：测试调用
 * @returns {Promise<{risk_rank:number;unoin_id:string;errcode:string;errmsg:string}>}
 * @prop {number} risk_rank 用户风险等级，合法值为0,1,2,3,4，数字越大风险越高。
 * @prop {number} unoin_id 唯一请求标识，标记单次请求
 * @see {@link https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/sec-center/safety-control-capability/getUserRiskRank.html}
 */
export async function getUserRiskRank(json) {
  return await waGot.post('wxa/getuserriskrank', { json }).json();
}
