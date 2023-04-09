// 插件管理
import waGot from './utils/wa-got.js';

export async function managePluginApplication(json, context) {
  let { body } = await waGot.post('wxa/devplugin', { json, context });
  return body;
}
export async function managePlugin(json, context) {
  let { body } = await waGot.post('wxa/plugin', { json, context });
  return body;
}
