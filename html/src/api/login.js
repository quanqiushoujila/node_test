import request from '@/util/request'

export const login = (data) => {
  request({
    url: '/login',
    method: 'post',
    data: data,
  })
}

export const logout = (data) => {
  request({
    url: '/login',
    method: 'post',
    data: data,
  })
}

export const register = (data) => {
  request({
    url: '/register',
    method: 'post',
    data: data,
  })
}