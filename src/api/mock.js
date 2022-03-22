import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import permissionApi from './mockServeData/permission'
import goodsApi from './mockServeData/goods'

Mock.mock('/home/getData', homeApi.getStatisticalData)
Mock.mock(/\/user\/add/, 'post', userApi.createUser)
Mock.mock(/\/user\/edit/, 'post', userApi.updateUser)
Mock.mock(/\/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/\/user\/del/, 'post', userApi.deleteUser)
Mock.mock(/\/permission\/getMenu/, 'post', permissionApi.getMenu)
Mock.mock(/\/goods\/add/, 'post', goodsApi.createGoods)
Mock.mock(/\/goods\/edit/, 'post', goodsApi.updateGoods)
Mock.mock(/\/goods\/getGoods/, 'get', goodsApi.getGoodsList)
Mock.mock(/\/goods\/del/, 'post', goodsApi.deleteGoods)