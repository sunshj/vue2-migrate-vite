/**
 * 提供日期時間處理函數
 */
import {
  daysDiff,
  getFirstTime,
  getFullHourMinutes,
  getLastTime,
  getNextDatetime,
  getPreviousDatetime,
  timeFormat
} from '@/utils'

export default {
  methods: {
    timeFormat,
    daysDiff,
    getFirstTime,
    getFullHourMinutes,
    getLastTime,
    getNextDatetime,
    getPreviousDatetime,
    datetimeFormat(time) {
      return timeFormat(time, 'yyyy-MM-DD HH:mm')
    },

    dateFormat(time) {
      return timeFormat(time, 'yyyy-MM-DD')
    }
  }
}
