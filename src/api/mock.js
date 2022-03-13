import Mock from 'mockjs'
import homrApi from './mockServeData/home'

Mock.mock('/home/getData', homrApi.getStatisticalData)