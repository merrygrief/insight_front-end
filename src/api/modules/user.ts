import api from '../index'

export default {
  // 登录
  login: (data: {
    account: string
    password: string
  }) => api.post('user/login', data, {
    baseURL: '/proxy/api/',
  }),

  // // 获取权限
  // permission: () => api.get('user/permission', {
  //   baseURL: '/api/',
  // }),

  // 修改密码
  passwordEdit: (data: {
    password: string
    newpassword: string
  }) => api.post('user/password_edit', data, {
    baseURL: '/proxy/api/',
  }),

  // 注册
  register: (data: {
    account: string
    password: string
    mailbox: string
  }) => api.post('user/register', data, {
    baseURL: '/proxy/api/',
  }),
}
