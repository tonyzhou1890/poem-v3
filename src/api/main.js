import request from '@/utils/request'

// 获取信息
export function getInfo(params) {
  return request({
    url: '/',
    method: 'get',
    withCredentials: false,
    params
  })
}
