/**
 * @author Band Cap <wohugb@qq.com>
 * @version 1.0.1
 */
import * as ad from './src/ad.js';
import * as ai from './src/ai.js';
import * as custom from './src/custom.js';
import * as datacube from './src/datacube.js';
import * as device from './src/device.js';
import * as devop from './src/devop.js';
import * as express from './src/express.js';
import * as guard from './src/guard.js';
import * as link from './src/link.js'; // 小程序二维码
import * as qrcode from './src/qrcode.js'; // 公号二维码
import * as live from './src/live.js';
import * as manager from './src/manager.js';
import * as media from './src/media.js';
import * as message from './src/message.js';
import * as order from './src/order.js';
import * as plugin from './src/plugin.js';
import * as poi from './src/poi.js';
import * as redpacket from './src/redpacket.js';
import * as safe from './src/safe.js';
import * as soter from './src/soter.js';
import * as user from './src/user.js';
import Crypto from './src/crypto.js';

class weappApis {
  static ad = ad; //广告
  static ai = ai; // 人工智能
  static Crypto = Crypto; // 解密函数
  static custom = custom; // 客服
  static datacube = datacube; // 数据统计
  static device = device; // 硬件
  static devop = devop; // 运维
  static express = express; // 快递
  static guard = guard; // 保护
  static link = link; // 连接二维码
  static qrcode = qrcode; // 二维码
  static live = live; // 直播
  static manager = manager; // 管理
  static media = media; // 媒体
  static message = message; // 消息
  static order = order; // 订单
  static plugin = plugin; // 常见
  static poi = poi; // 地点
  static redpacket = redpacket; // 红包
  static safe = safe; // 保护
  static soter = soter; // 生物
  static user = user; // 用户
}

export default weappApis;
