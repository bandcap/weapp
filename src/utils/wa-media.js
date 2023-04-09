import fs from 'fs';
import FormData from 'form-data';
import got from 'got';
const pkg = { name: 'nosy', version: 'v1.1.1' };
import getAccessToken from './get_access_token.js';

/**
 * Authorization: 认证类型 签名信息
 * 认证类型，目前为W ECHATPAY2-SHA256-RSA2048
 * 签名信息
 *   发起请求的商户（包括直连商户、服务商或渠道商）的商户号 mchid
 *   商户API证书序列号，用于声明所使用的证书 serial_no
 *   请求随机串 nonce_str
 *   时间戳 timestamp
 *   签名值 signature
 *  注: 以上五项签名信息，无顺序要求。
 */
const create = () =>
  got.extend({
    prefixUrl: process.env.WEPAY_ENDPOINT || 'https://api.mch.weixin.qq.com',
    headers: {
      // 'content-type': 'multipart/form-data;boundary=boundary',
      'user-agent': `${pkg.name}(${pkg.version}):https://github.com/wohugb/wepay`,
    },
    responseType: 'json',
    handlers: [
      (options, next) => {
        let { file } = options.context;
        const form = new FormData();
        let binaryFile = fs.readFileSync(file.filepath);
        form.append('meta', JSON.stringify(options.json), { contentType: 'application/json' });
        form.append('media', binaryFile, {
          filename: file.originalFilename,
          filelength: file.length,
          contentType: file.mimetype,
        });
        options.form = form;
        if (options.isStream) return next(options);
        return (async () => {
          try {
            return await next(options);
          } catch (error) {
            // console.warn(error);
            const { response = {} } = error;
            /** body, url, ip, requestUrl, timings, isFromCache, redirectUrls, retryCount, */
            const { body = {}, statusCode = 0 } = response;
            // console.log({ body: util.inspect(body) });
            // console.log({
            //   request: util.inspect(request, { depth: null }),
            // });
            // console.log(request);
            error.name = body.code;
            error.message = body.message;
            // throw error;
            return { body: Object.assign(body, { statusCode }) };
          }
        })();
      },
    ],
    hooks: {
      init: [
        (options) => {
          // TODO: This should be fixed in Got
          // Remove leading slashes
          if (typeof options.url === 'string' && options.url.startsWith('/')) {
            options.url = options.url.slice(1);
          }
        },
      ],
      beforeRequest: [getAccessToken],
    },
  });

const wpGot = create();

export default wpGot;
