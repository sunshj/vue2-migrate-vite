<template>
  <div>
    <el-table
      v-loading="loading"
      border
      :data="localTableData"
      style="width: 100%"
      :cell-style="{ padding: 0 }"
    >
      <el-table-column width="180px" fixed="left" align="center" label-class-name="date_col_label">
        <template #default="scope">
          {{ scope.row.room }}
        </template>
        <template #header>
          <el-popover placement="right" width="420" class="w-full" trigger="click">
            <div class="flex flex-col gap-2">
              <el-date-picker
                v-model="localDateRange"
                class="w-full"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="開始日期"
                end-placeholder="結束日期"
              />
              <div class="flex-end">
                <el-button size="small" type="primary" @click="onSearchClick()">查詢</el-button>
              </div>
            </div>
            <template #reference>
              <div class="flex-center cursor-pointer bg-gray">
                <i class="el-icon-date text-6 w-full flex-center h-date_header_height" />
              </div>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in localLabels"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        header-align="center"
        align="center"
      >
        <template #default="scope">
          <div
            :ref="`${scope.$index}_${item.prop}`"
            class="cursor-pointer"
            :style="setRowStyle(scope.row, item.prop)"
            @click="handleCellClick(scope, item.prop, $event)"
          >
            {{ setRowContent(scope.row, item.prop) }}
          </div>
        </template>

        <template #header="scope">
          <div v-html="setHeaderHtml(scope)" />
        </template>
      </el-table-column>

      <el-popover
        :key="currentCellId"
        ref="popoverRef"
        :reference="popoverReference"
        placement="right"
        title="本房信息"
        width="450"
        trigger="click"
      >
        <el-table :data="currentCellData" border>
          <el-table-column property="username" align="center" label="用戶姓名" />
          <el-table-column label="入住日期" align="center">
            <template #default="scope"> {{ datetimeFormat(scope.row.in_time) }} </template>
          </el-table-column>
          <el-table-column align="center" label="離開日期">
            <template #default="scope"> {{ datetimeFormat(scope.row.out_time) }} </template>
          </el-table-column>
        </el-table>
      </el-popover>
    </el-table>
  </div>
</template>

<script>
import datetimeMixin from '@/mixins/datetime'

export default {
  mixins: [datetimeMixin],
  props: {
    dateRange: Array,
    labels: Array,
    tableData: Array,
    loading: Boolean
  },

  data() {
    return {
      popoverReference: null,
      currentCellId: '',
      currentCellData: []
    }
  },

  computed: {
    localTableData() {
      return this.tableData
    },

    localLabels() {
      return this.labels
    },

    localDateRange: {
      get() {
        return this.dateRange
      },

      set(val) {
        this.$emit('update:dateRange', val)
        return val
      }
    }
  },

  watch: {
    localLabels() {
      const date_col_label = document.querySelector('.el-table__cell.date_col_label')
      if (!date_col_label) return
      setTimeout(() => {
        document.body.style.setProperty('--date-header-height', `${date_col_label.clientHeight}px`)
      }, 100)
    }
  },

  beforeDestroy() {
    this.popoverReference = null
  },

  methods: {
    onSearchClick() {
      document.body.click()
      this.$emit('search')
    },

    setHeaderHtml({ column }) {
      const [date, week, rest] = column.label.split(' ')
      if (week === '六' || week === '日') {
        return `<div style="color: red;">${date}</div><div style="color: red;">${week}</div><div style="color: cyan;">${rest}</div>`
      }
      return `<div>${date}</div><div>${week}</div><div style="color: cyan;">${rest}</div>`
    },

    setRowStyle(row, prop) {
      const val = row[prop]
      const defaultStyle = { height: '40px', lineHeight: '40px' }
      if (Array.isArray(val)) return { backgroundColor: '#5cc2e3', ...defaultStyle }
      return defaultStyle
    },

    setRowContent(row, prop) {
      const value = row[prop]
      if (Array.isArray(value)) {
        if (value.length === 0) return value
        if (value.length === 1) return value[0].username
        return `有${value.length}張訂單`
      }
      return `￥${value}`
    },

    handleCellClick(scope, prop, event) {
      const id = `${scope.$index}_${prop}`
      if (id === this.currentCellId) return
      this.currentCellId = id
      this.popoverReference = event.target
      const cellData = scope.row[prop]
      this.currentCellData = Array.isArray(cellData) ? cellData : []
      this.$nextTick(() => {
        this.$refs.popoverRef.doShow()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.gap-2 {
  gap: 0.5rem;
}

.text-6 {
  font-size: 24px;
}

.h-date_header_height {
  height: var(--date-header-height);
}

::v-deep .cell {
  padding: 0;
}

::v-deep .el-table__cell:has(.date_col_label) {
  padding: 0;
  background-color: #e4e4e4;

  .date_col_label {
    padding: 0;
  }
}
</style>
