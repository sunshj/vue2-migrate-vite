import moment from 'moment'
import 'moment/dist/locale/zh-tw'

moment.updateLocale('zh-tw', {
  week: {
    dow: 1
  }
})

/**
 * @description 格式化時間
 */
export function timeFormat(time, fmt = 'YYYY-MM-DD HH:mm:ss') {
  return moment(time).format(fmt)
}

/**
 * @description 獲取當前{startOf}的最初时间
 * @param {string|number}  time 當前時間
 * @param {moment.unitOfTime.StartOf}  startOf 年/月/周...
 */
export function getFirstTime(time, startOf) {
  return timeFormat(moment(time).startOf(startOf))
}

/**
 * @description 獲取當前{endOf}的最末时间
 * @param {string|number}  time 當前時間
 * @param {moment.unitOfTime.StartOf}  endOf 年/月/周...
 */
export function getLastTime(time, endOf) {
  return timeFormat(moment(time).endOf(endOf))
}

/**
 * @description 獲取當前時間的整點分鐘數
 * @param {string|number} time
 * @returns {number} 分钟数
 */
export function getFullHourMinutes(time) {
  const date = new Date(time)
  const h = date.getHours()
  return h * 60
}

/**
 * 計算時間天數差值
 * @param begin 開始
 * @param end 結束
 */
export function daysDiff(begin, end) {
  const beginTime = moment(begin)
  const endTime = moment(end)
  const diff = endTime.diff(beginTime, 'seconds')
  return Math.ceil(diff / 86400)
}

/**
 * 獲取num天后某時某刻時間
 * @param date 基礎日期
 * @param num 加幾天
 * @param {moment.MomentSetObject} [options] 配置
 */
export function getNextDatetime(date, num, options = {}) {
  return moment(date).add(num, 'days').set(options).format('yyyy-MM-DD HH:mm')
}

/**
 * 獲取num天前某時某刻時間
 * @param date 基礎日期
 * @param num 減幾天
 * @param {moment.MomentSetObject} [options] 配置
 */
export function getPreviousDatetime(date, num, options = {}) {
  return moment(date).subtract(num, 'days').set(options).format('yyyy-MM-DD HH:mm')
}
