import request from '@/utils/request'
const poemPrefix = '/poem'

// 首页
export function home(params) {
  return request({
    url: `${poemPrefix}/home`,
    params
  })
}

// 获取诗词详情
export function getById(params) {
  return request({
    url: `${poemPrefix}/getById`,
    params
  })
}

// 作者列表
export function authorList(params) {
  return request({
    url: `${poemPrefix}/authorList`,
    params
  })
}

// 诗词列表
export function poemList(params) {
  return request({
    url: `${poemPrefix}/poemList`,
    params
  })
}

// 获取某位作者的诗词
export function getPoemsByAuthor(params) {
  return request({
    url: `${poemPrefix}/getPoemsByAuthor`,
    params
  })
}

// 搜索
export function search(params) {
  return request({
    url: `${poemPrefix}/search`,
    params
  })
}
