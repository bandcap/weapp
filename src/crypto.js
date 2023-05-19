import crypto from "crypto";
import * as dotenv from "dotenv";

const result = dotenv.config({ debug: false });
if (result.error) throw result.error;
let { WEAPP_APPID, WEAPP_SECRET } = result.parsed;
if (!WEAPP_APPID || !WEAPP_SECRET) throw new Error("[WAGOT]:未定义小程序信息");

export default class Crypto {
  constructor(sessionKey) {
    this.sessionKey = sessionKey;
  }
  decryptData(encryptedData, iv) {
    if (!this.sessionKey) return { errcode: 9205, errmsg: "缺少解码秘钥" };
    if (!encryptedData)
      return { errcode: 9404, errmsg: "encryptedData undefined" };
    if (!iv) return { errcode: 9404, errmsg: "iv未找到！" };
    // base64 decode
    let sessionKey = Buffer.from(this.sessionKey, "base64");
    encryptedData = Buffer.from(encryptedData, "base64");
    iv = Buffer.from(iv, "base64");
    let decipher = crypto.createDecipheriv("aes-128-cbc", sessionKey, iv); // 解密
    decipher.setAutoPadding(true); // 设置自动 padding 必须为 true，删除填充补位，否则报错
    let decoded = decipher.update(encryptedData, "binary", "utf8");
    decoded += decipher.final("utf8");
    try {
      decoded = JSON.parse(decoded);
    } catch (err) {
      console.warn("[decryptData-JSON.parse]:", decoded, err.message);
    }
    if (decoded.watermark && decoded.watermark.appid !== WEAPP_APPID) {
      return {
        errmsg: 9406,
        errcode: "appid不匹配",
        remote: decoded.watermark.appid,
        local: WEAPP_APPID,
      };
    }
    return decoded;
  }
}
