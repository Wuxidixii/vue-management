// mock数据模拟
import Mock from "mockjs"

// 图表数据
let List = []
export default {
  getStatisticalData: () => {
    // Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          苹果: Mock.Random.float(100, 8000, 0, 0),
          vivo: Mock.Random.float(100, 8000, 0, 0),
          oppo: Mock.Random.float(100, 8000, 0, 0),
          魅族: Mock.Random.float(100, 8000, 0, 0),
          小米: Mock.Random.float(100, 8000, 0, 0),
          三星: Mock.Random.float(100, 8000, 0, 0),
        })
      )
    }
    return {
      code: 20000,
      data: {
        // 饼图
        videoData: [
          {
            name: '小米',
            value: 2999
          },
          {
            name: '苹果',
            value: 5999
          }, {
            name: 'vivo',
            value: 1500
          }, {
            name: 'oppo',
            value: 1999
          }, {
            name: '魅族',
            value: 2200
          }, {
            name: '三星',
            value: 4500
          },
        ],
        // 柱状图
        userData: [
          {
            data: '周一',
            new: 5,
            active: 200
          },
          {
            data: '周二',
            new: 10,
            active: 500
          },
          {
            data: '周三',
            new: 12,
            active: 550
          },
          {
            data: '周四',
            new: 60,
            active: 800
          },
          {
            data: '周五',
            new: 65,
            active: 550
          },
          {
            data: '周六',
            new: 53,
            active: 770
          },
          {
            data: '周日',
            new: 33,
            active: 170
          },
        ],
        // 折线图
        orderData: {
          date: ['20220313', '20220314', '20220315', '20220316', '20220317', '20220318', '20220319'],
          data: List
        },
        // 表单数据
        tableData: [
          {
            name: "小米",
            todayBuy: 1200,
            monthBuy: 6500,
            totalBuy: 45000,
          },
          {
            name: "oppo",
            todayBuy: 500,
            monthBuy: 3500,
            totalBuy: 22000,
          },
          {
            name: "vivo",
            todayBuy: 300,
            monthBuy: 2200,
            totalBuy: 24000,
          },
          {
            name: "苹果",
            todayBuy: 800,
            monthBuy: 4500,
            totalBuy: 65000,
          },
          {
            name: "三星",
            todayBuy: 300,
            monthBuy: 2000,
            totalBuy: 34000,
          },
          {
            name: "魅族",
            todayBuy: 350,
            monthBuy: 3000,
            totalBuy: 22000,
          },
        ],
        // 表格标签
        tableLabel: {
          name: "课程",
          todayBuy: "今日购买",
          monthBuy: "本月购买",
          totalBuy: "总购买",
        },
        // 订单数据
        countData: [
          {
            key: 1,
            name: "今日支付订单",
            value: 1231,
            icon: "success",
            color: "#2ec7c9",
          },
          {
            key: 2,
            name: "今日收藏订单",
            value: 3234,
            icon: "star-on",
            color: "#ffb980",
          },
          {
            key: 3,
            name: "今日未支付订单",
            value: 234,
            icon: "s-goods",
            color: "#5ab1ef",
          },
          {
            key: 4,
            name: "本月支付订单",
            value: 12345,
            icon: "success",
            color: "#2ec7c9",
          },
          {
            key: 5,
            name: "本月收藏订单",
            value: 12374,
            icon: "star-on",
            color: "#ffb980",
          },
          {
            key: 6,
            name: "本月未支付订单",
            value: 1234,
            icon: "s-goods",
            color: "#5ab1ef",
          },
        ],
      },
    }
  }
}
