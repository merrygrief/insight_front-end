import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/food',
  component: Layout,
  name: 'food',
  meta: {
    title: '食物',
    icon: 'i-ri:remixicon-line',
  },
  children: [
    {
      path: 'foodlist',
      name: 'foodlist',
      component: () => import('@/views/food/components/foodcate.vue'),
      meta: {
        title: '食物列表',
      },
    },
    {
      path: 'foodSearch',
      name: 'foodSearch',
      component: () => import('@/views/food/components/search.vue'),
      meta: {
        title: '食物查询',
      },
    },
  ],
}

export default routes
