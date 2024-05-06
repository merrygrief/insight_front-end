<route lang="yaml">
  meta:
    enabled: false
  </route>

<script setup lang="ts">
import BMI from './components/bmi.vue'
import BP from './components/bp.vue'
import GSBR from './components/gsbr.vue'
import HR from './components/hr.vue'
import Ht from './components/ht.vue'
import STEP from './components/step.vue'
import W from './components/w.vue'
import Wt from './components/wt.vue'
import eventBus from '@/utils/eventBus'

const components = {
  BMI,
  血压: BP,
  握力值: GSBR,
  心率: HR,
  身高: Ht,
  步速: STEP,
  腰围: W,
  体重: Wt,
}
</script>

<template>
  <div>
    <PageHeader title="数据历史">
      <template #content>
        <p>记录每一次的健康数据</p>
      </template>
    </PageHeader>
    <PageMain>
      <ElTabs type="border-card">
        <ElTabPane v-for="(item, key) in components" :key="key" :label="key">
          <component :is="item" />
        </ElTabPane>
      </ElTabs>
    </PageMain>
  </div>
</template>
