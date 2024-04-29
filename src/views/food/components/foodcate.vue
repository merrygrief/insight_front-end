<script setup lang="ts">
import { icons } from '@/iconify'
</script>

<template>
  <div>
    <div class="demo">
      <SvgIcon name="i-ep:edit" />
      <SvgIcon name="i-ep:share" />
      <SvgIcon name="i-ep:delete" />
      <ElButton type="primary">
        <template #icon>
          <SvgIcon name="i-ep:search" />
        </template>
        搜索
      </ElButton>
    </div>
    <ElDivider content-position="left">
      图标集合
    </ElDivider>
  </div>
</template>
