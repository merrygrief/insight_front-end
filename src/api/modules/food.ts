import api from '../index'

export default {
  // 登录
  food: () => api.get('food/foodcate', {
    baseURL: '/api/',
  }),

  // 食物列表，通过cateId查询
  catefoodlist: (data: {
    cateId: string
  }) => api.post('food/catefoodlist', data, {
    baseURL: '/api/',
  }),

  // 所有食物，用于搜索
  passwordEdit: () => api.get('food/foodlist', {
    baseURL: '/api/',
  }),
}
