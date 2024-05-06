<route lang="yaml">
  name: tips
  meta:
    title: 健康贴士
</route>

<script lang="ts">
import { ElButton, ElButtonGroup, ElCard, ElCol } from 'element-plus'

const image1 = new URL('../../assets/tips_images/image1.jpg', import.meta.url).href
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
    <PageHeader title="健康贴士" content="仔细品味健康小贴士，获得受益一生的智慧宝库" />
    <el-row>
      <el-col :span="8" :offset="2">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="image1">
          <img src="../../assets/tips_images/image1.jpg" class="image">
          <div style="padding: 14px;">
            <span>戒烟、限制酒精和远离毒品是保持身体健康的基本法则。培养感恩之心，重视积极的情感体验，有助于减轻抑郁和焦虑。定期进行体检以早期发现潜在的健康问题，并采取及时的干预措施。保护环境，呼吸新鲜空气，减少暴露于污染物和毒素之下。</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8" :offset="2">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="image1">
          <img src="../../assets/tips_images/image2.jpg" class="image">
          <div style="padding: 14px;">
            <span>睡眠是身体修复和恢复的时间。确保每晚获得足够的睡眠，以保持身体和心理的健康。学会管理压力，采用冥想、深呼吸和瑜伽等放松技巧，以维护心理健康。</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-divider />
    <el-row>
      <el-col :span="8" :offset="2">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="image1">
          <img src="../../assets/tips_images/image3.jpg" class="image">
          <div style="padding: 14px;">
            <span>积极情感有助于提高生活满意度和免疫系统功能。定期放松和休息对身体和心理健康至关重要。了解健康饮食的基本原则，如少油少盐，可以改善食物选择。减少红肉和加工肉的摄入，有助于减小患癌症的风险。</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  float: right;
  padding: 0;
}

.image {
  display: block;
  width: 100%;
}

.clearfix::before,
.clearfix::after {
  display: table;
  content: "";
}

.clearfix::after {
  clear: both;
}
</style>
