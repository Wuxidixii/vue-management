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