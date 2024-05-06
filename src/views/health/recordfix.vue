<route lang="yaml">
  name: record
  meta:
    title: 健康记录
</route>

<script lang="ts">
import { ElButton, ElButtonGroup, ElCard, ElCol } from 'element-plus'
import apiHealth from '@/api/modules/health'

export default {
  data(): any {
    return {
      typeConst: {
        BMI: { type: 'BMI', desc: 'BMI' },
        BP: { type: 'BP', desc: '血压' },
        GSBR: { type: 'GSBR', desc: '握力值' },
        HR: { type: 'HR', desc: '心率' },
        HT: { type: 'HT', desc: '身高' },
        STEP: { type: 'STEP', desc: '步速' },
        W: { type: 'W', desc: '腰围' },
        WT: { type: 'WT', desc: '体重' },
      },
      data: {
        htValue: '暂未数据',
      },
      hasData: [{

      }],
      value: '',
      insertData: {
        value: '',
        healthDataType: '',
      },
    }
  },

  mounted() {
    this.updateValue()
  },

  methods: {
    updateValue() {
      apiHealth.healthRecord().then((res) => {
        this.data = res.data

        // 为空值设置信息
        const keys = Object.keys(this.data) // 获取所有键的数组
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i]
          const value = this.data[key]
          // eslint-disable-next-line style/max-statements-per-line
          if (value === null) { this.data[key] = '暂未添加' }
          // console.log(`${key}: ${value}`)
        }
      })
    },
    async insertValue(data: any) {
      await apiHealth.insertHealthData(data)
    },

    promptValueInsert(type: any) {
      this.insertData.healthDataType = type.type
      // eslint-disable-next-line no-alert
      this.insertData.value = prompt(type.desc, `请输入${type.desc}值`)
      this.insertValue(this.insertData)
      this.updateValue()
    },
  },
}
</script>

<!-- <style>
.button {
  font-size: 23px;
  color: red;
  background-color: #000;
}

.vertical-stack {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 可选，控制交叉轴对齐方式 */
}

.cate {
  width: 400px;
  height: 150px;
  overflow: auto;
}
</style> -->
<template>
  <div>
    <PageHeader title="健康记录" content="全面了解你当前的身体状态" />
    <div class="flex flex-col flex-wrap gap-4 px-4 lg:flex-row" :class="data">
      <PageMain title="身高（m）">
        <ElCard @click="promptValueInsert(typeConst.HT)">
          {{ data.htValue }}
        </ElCard>
      </PageMain>
      <PageMain title="体重（kg）">
        <ElCard @click="promptValueInsert(typeConst.WT)">
          {{ data.wtValue }}
        </ElCard>
      </PageMain>
      <PageMain title="腰围（m）">
        <ElCard @click="promptValueInsert(typeConst.W)">
          {{ data.wvalue }}
        </ElCard>
      </PageMain>
      <PageMain title="握力值（mm）">
        <ElCard @click="promptValueInsert(typeConst.GSBR)">
          {{ data.gsbrValue }}
        </ElCard>
      </PageMain>
      <PageMain title="BMI（kg/㎡）">
        <ElCard @click="promptValueInsert(typeConst.BMI)">
          {{ data.bmiValue }}
        </ElCard>
      </PageMain>
      <PageMain title="心率（次/min）">
        <ElCard @click="promptValueInsert(typeConst.HR)">
          {{ data.hrValue }}
        </ElCard>
      </PageMain>
      <PageMain title="血压（mmHg）">
        <ElCard @click="promptValueInsert(typeConst.BP)">
          {{ data.bpValue }}
        </ElCard>
      </PageMain>
      <PageMain title="步速（m/s）">
        <ElCard @click="promptValueInsert(typeConst.STEP)">
          {{ data.stepValue }}
        </ElCard>
      </PageMain>
    </div>
  </div>
</template>

<style>
.el-header {
  line-height: 60px;
  color: #333;
  background-color: #b3c0d1;
}

.el-aside {
  color: #333;
}

.cateName {
  font-size: 16px;
}

.details {
  font-size: 12px;
}

.el-tag {
  /* 想办法居中显示 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-card {
  /* 想办法居中显示 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-main {
  --at-apply: flex-grow-1 flex-shrink-1 flex-basis-350px m-0 min-h-50;

  min-height: 12.5rem;

  :deep(.main-container) {
    --at-apply: flex items-center justify-center flex-1 gap-4;
  }
}
</style>
