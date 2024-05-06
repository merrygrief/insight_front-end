import api from '../index'

export default {
  // 获取健康数据
  healthRecord: () => api.get('health/health_data_get', {
    baseURL: '/proxy/api/',
  }),

  // 添加健康数据
  insertHealthData: (data: {
    value: string
    healthDataType: string
  }) => api.post('/health/health_data_insert', data, {
    baseURL: '/proxy/api/',
  }),

  // 获取健康数据历史
  getHealthDataHistory: (data: {
    healthDataType: string
  }) => api.post('/health/health_data_history_get', data, {
    baseURL: '/proxy/api/',
  }),

  // 修改健康数据历史
  updateHealthDataHistory: (data: {
    id: string
    value: string
    healthDataType: string
  }) => api.post('/health/health_data_history_update', data, {
    baseURL: '/proxy/api/',
  }),

}
