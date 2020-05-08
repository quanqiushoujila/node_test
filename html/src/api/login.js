import request from '@/util/request'

export const login = (data) => {
  return request({
    url: '/user/login',
    method: 'post',
    data: data,
  })
}

export const logout = (data) => {
  return request({
    url: '/user/logout',
    method: 'post',
    data: data,
  })
}

export const register = (data) => {
  return request({
    url: '/user/register',
    method: 'post',
    data: data,
  })
}