import request from '@/utils/request'

// 获取首页信息
export function getHome(params) {
  return request({
    url: '/',
    method: 'get',
    withCredentials: false,
    params
  })
}

// 获取文章详情
export function getArticleInfo(params) {
  return request({
    url: '/',
    method: 'get',
    withCredentials: false,
    params
  })
}

// 获取作者列表
export function getAuthorList(params) {
  return request({
    url: '/',
    method: 'get',
    withCredentials: false,
    params
  })
}

// 获取诗词列表
export function getPoemList(params) {
  return request({
    url: '/',
    method: 'get',
    withCredentials: false,
    params
  })
}
