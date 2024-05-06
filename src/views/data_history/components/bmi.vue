<route lang="yaml">
  name: foodSearch
  meta:
    title: 食物分类
</route>

<script lang="ts">
import type { TableColumnCtx } from 'element-plus'
import { ElButton, ElButtonGroup, ElCol } from 'element-plus'
import * as Echarts from 'echarts'
import $ from 'lib/query'
import apiHealth from '@/api/modules/health'

enum CompositionStatus {
  BothEnabled = 0,
  InputEnabled = 1,
  SelectEnabled = 2,
}
// let chart2Ref: any

export default {
  setup() {
    return {
      chart2Ref: ref<HTMLElement>() as Ref<HTMLElement>,

      tableData: [
        {
          col1: 'BMI数值',
          col2: '<18.5kg/m²',
          col3: '18.5-24kg/m²',
          col4: '>24kg/m²',
        },
      ],

    }
  },
  data() {
    return {
      compositionStatus: CompositionStatus.BothEnabled,
      foodName: '',
      typeConst: { type: 'BMI', desc: 'BMI' },
      chart2: undefined as any,
      all_list: [{
        uid: '0',
        value: '',
        time: '',
        healthDataType: '',
      }],
      list: [],
      update_data: {
        id: '',
        value: '',
        healthDataType: '',
      } as any,
    }
  },

  mounted() {
    this.getDataHistory()
    this.initChart2()
    window.addEventListener('resize', () => {
      this.chart2.resize()
    })
  },

  methods: {
    getDataHistory() {
      const healthDataType = this.typeConst.type
      return apiHealth.getHealthDataHistory({ healthDataType }).then((res) => {
        this.list = res.data as any

        this.list.sort((a: { time: any }, b: { time: any }) => {
          return (new Date(a.time)).valueOf() - new Date(b.time).valueOf()
        })
        this.list.forEach((val: any, ind, arr: any[]) => {
          arr[ind].time = ref(new Date(val.time).toLocaleDateString())
        })
        // console.log(this.list)
        // 传入数据
        this.chart2.setOption({
          title: {
            text: this.typeConst.desc,
          },
          xAxis: {
            data: this.list.map((element: any) => { return element.time }),
          },
          series: [
            {
              // 根据名字对应到相应的系列
              name: '销量',
              data: this.list.map((element: any) => { return element.value }),
            },
          ],
        })
        // console.log(this.list)
        // console.log(this.list.map((element) => { return element.time }))
      })
    },
    updateDataHistory(data: any) {
      apiHealth.updateHealthDataHistory(data).then(() => {
        this.getDataHistory()
      })
    },

    handleEdit(row: any) {
      this.update_data.healthDataType = this.typeConst.type
      this.update_data.id = row.id.toString()
      // console.log(row.id)
      // eslint-disable-next-line no-alert
      this.update_data.value = prompt(this.typeConst.desc, `请输入${this.typeConst.desc}值`)
      this.updateDataHistory(this.update_data)
    },

    initChart2() {
      // console.log(this.chart2Ref.value)
      // console.log(!this.chart2Ref)
      // const chart2Ref = ref()
      this.chart2 = Echarts.init(this.chart2Ref)
      // 配置数据
      const option = {
        title: {
          text: '堆叠区域图',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        legend: {
          data: [this.typeConst.desc],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: [],
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: this.typeConst.desc,
            type: 'bar',
            stack: '总量',
            areaStyle: {},
            data: [],
          },
        ],
        itemStyle: {
          barBorderRadius: 5,
          borderWidth: 1,
          borderType: 'solid',
          borderColor: '#73c0de',
          shadowColor: '#5470c6',
          shadowBlur: 3,
        },
      }
      this.chart2.setOption(option)
    },
    open(url: string) {
      window.open(url, '_blank')
    },

    // handleSelectChange() {
    //   this.setCompositionState(this.fid === 0 ? CompositionStatus.BothEnabled : CompositionStatus.SelectEnabled)
    // },

  },
}
</script>

<template>
  <PageMain>
    <!-- <el-card id="result"> -->
    <el-table :data="list" height="200" border style="width: 100%;">
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="value" :label="typeConst.desc" width="180">
        <!-- <template #default="scope">
            <el-link type="primary">
              <RouterLink :to="`/community/management/${scope.row.clubID}`">
                {{ scope.row.name }}
              </RouterLink>
            </el-link>
          </template> -->
      </el-table-column>
      <!-- <el-table-column prop="category" label="类别" :filters="categoryFilters()" :filter-method="categoryFilterMethod" width="180" /> -->
      <el-table-column prop="time" label="记录时间" />
      <el-table-column
        fixed="right"
        label="操作"
        width="300"
      >
        <template #default="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">
            编辑
          </el-button>
          <el-button type="text" size="small">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- </el-card> -->
  </PageMain>
  <PageMain>
    <ElCol :md="12">
      <PageMain style=" width: 800px;margin: 10px 0;">
        <div ref="chart2Ref" style="width: 800px; height: 600px;" />
      </PageMain>
    </ElCol>
  </PageMain>
  <PageMain title="身体质量指数 BMI" collaspe height="200px">
    <p>
      身体质量指数，是BMI（Body Mass Index [3]）指数，简称体质指数，是国际上常用的衡量人体胖瘦程度以及是否健康的一个标准。
    </p>
    <p>计算公式为：BMI=体重÷身高2。（体重单位：千克；身高单位：米）</p>
    <p>BMI由19世纪中期的比利时通才朗伯·阿道夫·雅克·凯特勒最先提出。</p>

    <divider />
    <el-table :data="tableData" style="width: 100%;">
      <el-table-column prop="col1" label="人体胖瘦程度" width="180" />
      <el-table-column prop="col2" label="消瘦" width="180" />
      <el-table-column prop="col3" label="正常值" width="180" />
      <el-table-column prop="col4" label="超重" width="180" />
    </el-table>
  </PageMain>

  <PageMain />
</template>

<style scoped>
#search .el-input {
  margin-right: 50px;
}

/* .el-card {
  margin: 10px;
} */
</style>
