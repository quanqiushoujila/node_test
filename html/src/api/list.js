import request from '@/util/request'

export const getList = function () {
  return request({
    method: 'get',
    url: '/blog/list'
  })
}