import waGot from './utils/wa-got.js';

export async function getWeeklyRetain(json, context) {
  let { body } = await waGot.post('datacube/getweanalysisappidweeklyretaininfo', { json, context });
  return body;
}
export async function getMonthlyRetain(json, context) {
  let { body } = await waGot.post('datacube/getweanalysisappidmonthlyretaininfo', { json, context });
  return body;
}
export async function getDailyRetain(json, context) {
  let { body } = await waGot.post('datacube/getweanalysisappiddailyretaininfo', { json, context });
  return body;
}
export async function getMonthlyVisitTrend(json, context) {
  let { body } = await waGot.post('datacube/getweanalysisappidmonthlyvisittrend', { json, context });
  return body;
}
export async function getDailyVisitTrend(json, context) {
  let { body } = await waGot.post('datacube/getweanalysisappiddailyvisittrend', { json, context });
  return body;
}
export async function getWeeklyVisitTrend(json, context) {
  let { body } = await waGot.post('datacube/getweanalysisappidweeklyvisittrend', { json, context });
  return body;
}
export async function getDailySummary(json, context) {
  let { body } = await waGot.post('datacube/getweanalysisappiddailysummarytrend', { json, context });
  return body;
}
export async function getVisitPage(json, context) {
  let { body } = await waGot.post('datacube/getweanalysisappidvisitpage', { json, context });
  return body;
}
export async function getUserPortrait(json, context) {
  let { body } = await waGot.post('datacube/getweanalysisappiduserportrait', { json, context });
  return body;
}
export async function getPerformanceData(json, context) {
  let { body } = await waGot.post('wxa/business/performance/boot', { json, context });
  return body;
}
export async function getVisitDistribution(json, context) {
  let { body } = await waGot.post('datacube/getweanalysisappidvisitdistribution', { json, context });
  return body;
}
