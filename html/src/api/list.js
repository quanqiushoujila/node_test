import request from '@/util/request'

export const getList = function (params) {
  return request({
    method: 'get',
    url: '/blog/list',
    params
  })
}

export const getDetail = function (params) {
  return request({
    method: 'get',
    url: '/blog/detail',
    params
  })
}

export const createPage = function (data) {
  return request({
    method: 'post',
    url: '/blog/create',
    data
  })
}

export const updatePage = function (data) {
  return request({
    method: 'post',
    url: '/blog/update',
    data
  })
}