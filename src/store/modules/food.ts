import { log } from '@antv/g2plot/lib/utils'
import useSettingsStore from './settings'
import useRouteStore from './route'
import useMenuStore from './menu'
import router from '@/router'
import apiFood from '@/api/modules/food'

const FailReasons = {
}

const foodStore = defineStore(
  'id',
  () => {
    const items = ref()
    // 食物类别
    async function getFoodCate() {
      await apiFood.foodcate()
    }

    return {
      // account,
      // token,
      // avatar,
      // permissions,
      // isLogin,
      // login,
      // register,
      // logout,
      // // getPermissions,
      // editPassword,
      getFoodCate,
    }
  },
)

export { FailReasons }
export default foodStore
