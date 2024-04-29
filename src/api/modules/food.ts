import api from '../index'

export default {
  // 食物列表
  foodcate: () => api.get('food/foodcate', {
    baseURL: '/proxy/api/',
  }),

  // 食物列表，通过cateId查询
  catefoodlist: (data: {
    cateId: string
  }) => api.post('food/catefoodlist', data, {
    baseURL: '/proxy/api/',
  }),

  // 所有食物，用于搜索
  allfoodlist: () => api.get('food/foodlist', {
    baseURL: '/proxy/api/',
  }),
}
