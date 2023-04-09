// 购物订单
import waGot from './utils/wa-got.js';

export async function uploadShoppingInfo(json, context) {
  let { body } = await waGot.post('user-order/orders', { json, context });
  return body;
}

export async function uploadShippingInfo(json, context) {
  let { body } = await waGot.post('user-order/orders/shippings', { json, context });
  return body;
}
