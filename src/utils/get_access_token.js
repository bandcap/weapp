import got from 'got';

import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
const result = dotenv.config({ debug: false });
if (result.error) throw result.error;
let { WEAPP_APPID, WEAPP_SECRET } = result.parsed;
if (!WEAPP_APPID || !WEAPP_SECRET) throw new Error('[WAGOT]:未定义小程序信息');

const ACCESS_TOKEN_KEY = `weapp_access_token_${WEAPP_APPID}`;

import redis from 'gb-redis';

// 定义拦截器
export default async function getAccessToken(options) {
  // ! 获取 token,session_key api  直接略过
  if (['/sns/jscode2session', '/cgi-bin/token'].includes(options.url.pathname)) return;
  /** @const {string} - 判断是否第三方，若appid存在，使用第三方token */
  const appid = options.context.appid;
  if (appid) return;
  // const redis = new Redis(REDIS_URI);
  let access_token = await redis.get(ACCESS_TOKEN_KEY);
  if (access_token) return options.searchParams.set('access_token', access_token);
  // 否则重新获取 access_token
  const body = await got
    .get('https://api.weixin.qq.com/cgi-bin/token', {
      searchParams: { grant_type: 'client_credential', appid: WEAPP_APPID, secret: WEAPP_SECRET },
    })
    .json();
  // 缓存 access_token 和过期时间
  if (body && body.access_token) {
    // expires_in = Date.now() + body.expires_in * 1000;
    await redis.set(ACCESS_TOKEN_KEY, body.access_token, 'EX', 7200);
    options.searchParams.set('access_token', body.access_token);
  } else {
    // 获取 access_token 失败，抛出异常
    throw new Error(`Failed to get access_token: ${body.errmsg}`);
  }
}
