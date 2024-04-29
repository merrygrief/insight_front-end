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
      path: 'a',
      name: 'a',
      component: () => import('@/views/food/components/foodcate.vue'),
      meta: {
        title: 'food',
      },
    },
    {
      path: 'iconify',
      name: 'iconExampleIconify',
      component: () => import('@/views/icon_example/iconify.vue'),
      meta: {
        title: 'Iconify',
      },
    },
  ],
}

export default routes
