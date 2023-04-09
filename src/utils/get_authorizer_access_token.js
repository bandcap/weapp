import wecomApis from '../../../wecom/index.js';

export default async function getAccessToken(options) {
  /** @const {string} - 判断是否第三方，若appid不存在，使用独立开发 token */
  let appid = options.context.appid;
  if (!appid) return;
  let body = await wecomApis.component.getAuthorizerAccessToken(appid);
  if (body && body.authorizer_access_token) {
    options.searchParams.set('access_token', body.authorizer_access_token);
  } else {
    throw new Error(`Failed to get authorizer_access_token: ${body.errmsg}`);
  }
}
