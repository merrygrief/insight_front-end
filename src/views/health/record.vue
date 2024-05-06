<route lang="yaml">
  name: record
  meta:
    title: 健康记录
</route>

<script lang="ts">
import { ElButton, ElButtonGroup, ElCol, ElTag } from 'element-plus'
import apiFood from '@/api/modules/food'

export default {
  data() {
    return {
      data: [{
        uid: '',
        bmiValue: '',
        bpValue: '',
        gsbrValue: '',
        hrValue: '',
        htValue: '',
        stepValue: '',
        wtValue: '',
        wvalue: '',
      }],
    }
  },

  mounted() {
    this.updateValue()
  },

  methods: {
    updateValue() {
      apiFood.foodcate().then((res) => {
        this.data = res.data
      })
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
    <div class="flex flex-col flex-wrap gap-4 px-4 lg:flex-row">
      <PageMain title="Button">
        <ElTag>
          BMI
        </ElTag>
        <ElTag :value="date.bmiValue" />
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
</style>
