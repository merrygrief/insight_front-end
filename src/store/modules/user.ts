import { log } from '@antv/g2plot/lib/utils'
import useSettingsStore from './settings'
import useRouteStore from './route'
import useMenuStore from './menu'
import router from '@/router'
import apiUser from '@/api/modules/user'

const FailReasons = {
  USER_ACCOUNT_PASSWORD_IS_EMPTY: { msg: 'USER_ACCOUNT_PASSWORD_IS_EMPTY', desc: '账号密码为空' },
  USER_ACCOUNT_PASSWORD_ERROR: { msg: 'USER_ACCOUNT_PASSWORD_ERROR', desc: '账号密码错误' },
  USER_ACCOUNT_EXIST: { msg: 'USER_ACCOUNT_EXIST', desc: '账号已存在' },
  USER_NOT_EXIST: { msg: 'USER_NOT_EXIST', desc: '用户不存在' },
  PASSWORD_IS_EMPTY: { msg: 'PASSWORD_IS_EMPTY', desc: '密码为空' },
  PASSWORD_IS_ERROR: { msg: 'PASSWORD_IS_ERROR', desc: '密码错误' },
}

const useUserStore = defineStore(
  // 唯一ID
  'user',
  () => {
    const settingsStore = useSettingsStore()
    const routeStore = useRouteStore()
    const menuStore = useMenuStore()

    const account = ref(localStorage.account ?? '')
    const token = ref(localStorage.token ?? '')
    const avatar = ref(localStorage.avatar ?? '')
    const permissions = ref<string[]>([])
    const isLogin = computed(() => {
      if (token.value) {
        return true
      }
      return false
    })

    // 登录
    async function login(data: {
      account: string
      password: string
    }) {
      const res = await apiUser.login(data)
      localStorage.setItem('account', res.data.account)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('avatar', res.data.avatar)
      account.value = res.data.account
      token.value = res.data.token
      avatar.value = res.data.avatar
    }
    // 注册
    async function register(data: {
      account: string
      password: string
      mailbox: string
    }) {
      await apiUser.register(data)
    }
    // 登出
    async function logout(redirect = router.currentRoute.value.fullPath) {
      localStorage.removeItem('account')
      localStorage.removeItem('token')
      localStorage.removeItem('avatar')
      account.value = ''
      token.value = ''
      avatar.value = ''
      permissions.value = []
      routeStore.removeRoutes()
      menuStore.setActived(0)
      router.push({
        name: 'login',
        query: {
          ...(router.currentRoute.value.path !== settingsStore.settings.home.fullPath && router.currentRoute.value.name !== 'login' && { redirect }),
        },
      })
    }
    // // 获取权限
    // async function getPermissions() {
    //   const res = await apiUser.permission()
    //   permissions.value = res.data.permissions
    // }

    // 修改密码
    async function editPassword(data: {
      password: string
      newpassword: string
    }) {
      await apiUser.passwordEdit(data)
    }

    return {
      account,
      token,
      avatar,
      permissions,
      isLogin,
      login,
      register,
      logout,
      // getPermissions,
      editPassword,
    }
  },
)

export { FailReasons }
export default useUserStore
