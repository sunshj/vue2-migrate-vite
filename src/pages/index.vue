<template>
  <booking-table
    :date-range.sync="dateRange"
    :labels="labels"
    :table-data="tableData"
    :loading="loading"
    @search="handleSearch"
  />
</template>

<script>
import BookingTable from '@/components/BookingTable.vue'
import datetimeMixin from '@/mixins/datetime'
import { delay } from '@/utils'

export default {
  components: { BookingTable },
  mixins: [datetimeMixin],
  data() {
    return {
      loading: false,
      dateRange: [],
      labels: [],
      tableData: []
    }
  },

  created() {
    const startTime = this.dateFormat(this.getPreviousDatetime(Date.now(), 7))
    const endTime = this.dateFormat(this.getNextDatetime(Date.now(), 7))
    this.dateRange = [startTime, endTime]

    this.getData()
  },

  methods: {
    handleSearch() {
      this.getData()
    },

    async getData() {
      this.loading = true

      await delay(1500)
      this.tableData = [
        {
          room: '801',
          '2023-11-24': 1888,
          '2023-11-25': 1888,
          '2023-11-26': [{ username: 'sunshj' }],
          '2023-11-27': 1888,
          '2023-11-28': 1968,
          '2023-11-29': 1968
        },
        {
          room: '803',
          '2023-11-24': [{ username: 'admin' }, { username: 'sunshj' }],
          '2023-11-25': 2088,
          '2023-11-26': 2088,
          '2023-11-27': 2648,
          '2023-11-28': 2648,
          '2023-11-29': 2648
        }
      ]
      this.labels = [
        { prop: '2023-11-24', label: '11/24 五 1' },
        { prop: '2023-11-25', label: '11/25 六 0' },
        { prop: '2023-11-26', label: '11/26 日 0' },
        { prop: '2023-11-27', label: '11/27 一 3' },
        { prop: '2023-11-28', label: '11/28 二 3' },
        { prop: '2023-11-29', label: '11/29 三 2' }
      ]

      this.loading = false
    }
  }
}
</script>

<style></style>
