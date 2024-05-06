import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/tips',
  component: Layout,
  redirect: '/tips/index',
  name: 'tips',
  meta: {
    title: '健康贴士',
    icon: 'i-file-icons:jsx',
  },
  children: [
    {
      path: 'index',
      name: 'TipsIndex',
      component: () => import('@/views/tips/tips.vue'),
      meta: {
        title: 'Tips',
        menu: false,
        breadcrumb: false,
      },
    },
    // {
    //   path: 'data',
    //   name: 'data',
    //   component: () => import('@/views/tips/index.vue'),
    //   meta: {
    //     title: '数据历史',
    //   },
    // },
  ],
}

export default routes
