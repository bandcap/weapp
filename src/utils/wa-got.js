import got from 'got';
import getAccessToken from './get_access_token.js';
// import getAuthorizerAccessToken from './get_authorizer_access_token.js';

const pkg = { name: 'bandcap-weapp', version: 'v1.1.1' };

const getRateLimit = (headers) => ({
  limit: Number.parseInt(headers['x-ratelimit-limit'], 10),
  remaining: Number.parseInt(headers['x-ratelimit-remaining'], 10),
  reset: new Date(Number.parseInt(headers['x-ratelimit-reset'], 10) * 1000),
});

const instance = got.extend({
  prefixUrl: 'https://api.weixin.qq.com',
  headers: {
    'Content-Type': 'application/json',
    'user-agent': `${pkg.name}(${pkg.version}):https://github.com/wohugb/weapp`,
  },
  responseType: 'json',
  handlers: [
    async (options, next) => {
      options.decompress = false;
      return (async () => {
        try {
          const response = await next(options);
          if (!options.isStream) {
            response.rateLimit = getRateLimit(response.headers); // Rate limit for the Response object
          }
          let { errcode, errmsg } = response.body;
          if (errcode) {
            let errmsgs = errmsg.split(',');
            console.warn(`[${options.url.pathname}]: ${errmsgs}`);
            response.body.errmsg = errmsgs[0] || '未知错误';
            // throw new Error(`[${options.url.pathname}]: ${response.body.errmsg}`);
          }
          return response;
        } catch (error) {
          if (error) console.error(error);
          const { response = {} } = error;
          /** body, url, ip, requestUrl, timings, isFromCache, redirectUrls, retryCount, */
          let { request = {}, body = {}, statusCode = 0 } = response;
          // console.log({ body: util.inspect(body) });
          // console.log({
          //   request: util.inspect(request, { depth: null }),
          // });
          // console.warn(request);
          error.name = 'WeAppError';
          error.message = body.message;
          // throw error;
          if (statusCode === 404) {
            // body = { code: 'API_NOT_FOUND', message: 'nginx:404 Not Found' };
            if (!body.code) body.code = 'API_NOT_FOUND';
            if (!body.message) body.message = 'nginx:404 Not Found';
          }
          return { body: Object.assign(body, { statusCode }), request };
        }
      })();
    },
  ],
  hooks: {
    init: [
      (raw, options) => {
        if (typeof options.url === 'string' && options.url.startsWith('/')) {
          options.url = options.url.slice(1);
        }
      },
    ],
    beforeRequest: [
      // (options) => {
      //   if (typeof options.context.token !== 'string') {
      //     throw new Error('Token required');
      //   }
      //   options.headers.token = options.context.token;
      // },
      getAccessToken,
      // getAuthorizerAccessToken,
    ],
  },
});

export default instance;
