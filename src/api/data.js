import axios from "./axios"

export const getData = () => {
  return axios.request({
    url: '/home/getData',
    method: 'get'
  })
}

export const getUser = (params) => {
  return axios.request({
    url: '/user/getUser',
    method: 'get',
    params
  })
}

export const delUser = (id) => {
  return axios.request({
    url: '/user/del',
    method: 'post',
    id
  })
}

export const getMenu = (params) => {
  return axios.request({
    url: '/permission/getMenu',
    method: 'post',
    data: params
  })
}

export const getGoods = (params) => {
  return axios.request({
    url: '/goods/getGoods',
    method: 'get',
    params
  })
}

export const delGoods = (id) => {
  return axios.request({
    url: '/goods/del',
    method: 'post',
    id
  })
}