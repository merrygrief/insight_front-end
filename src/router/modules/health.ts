import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/health',
  component: Layout,
  name: 'health',
  meta: {
    title: '健康管理',
    icon: 'i-ri:remixicon-line',
  },
  children: [
    // {
    //   path: 'record',
    //   name: 'record',
    //   component: () => import('@/views/health/components/record.vue'),
    //   meta: {
    //     title: '健康记录',
    //   },
    // },
    {
      path: 'recordfix',
      name: 'recordfix',
      component: () => import('@/views/health/recordfix.vue'),
      meta: {
        title: '健康记录',
      },
    },
    {
      path: 'data',
      name: 'data',
      component: () => import('@/views/data_history/index.vue'),
      meta: {
        title: '数据历史',
      },
    },
  ],
}

export default routes
