<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card>
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <hr />
        <div class="login-info">
          <p>上次登录时间：<span>2022-3-13</span></p>
          <p>上次登录地点：<span>湛江</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 400px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card v-for="item in countData" :key="item.key">
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="money">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 250px">
        <!-- <div style="height: 250px" ref="echarts"></div> -->
        <Echart
          :chartData="echartData.order"
          style="height: 250px; margin-top: 20px"
        />
      </el-card>
      <div class="graph">
        <el-card style="width: 48%; height: 200px">
          <!-- <div style="height: 200px" ref="userEcharts"></div> -->
          <Echart :chartData="echartData.user" style="height: 200px" />
        </el-card>
        <el-card style="width: 48%; height: 200px">
          <!-- <div style="height: 180px" ref="videoEcharts"></div> -->
          <Echart
            :chartData="echartData.video"
            :isAxisChart="false"
            style="height: 180px"
          />
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "@/api/data";
import Echart from "@/components/Echarts";

export default {
  name: "Home",
  components: {
    Echart,
  },
  data() {
    return {
      userImg: require("@/assets/images/user.png"),
      tableData: [],
      tableLabel: {},
      countData: [],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  created() {
    getData().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        this.tableData = data.tableData;
        this.tableLabel = data.tableLabel;
        this.countData = data.countData;

        const order = data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });

        // 折线图
        /* const option = {
          xAxis: {
            data: xData,
          },
          yAxis: {},
          legend: {
            data: keyArray,
          },
          series,
        };
        const E = echarts.init(this.$refs.echarts);
        E.setOption(option); */

        this.echartData.order.xData = xData;
        this.echartData.order.series = series;

        // 用户图
        /* const userOption = {
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: data.userData.map((item) => item.data),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name: "新增用户",
              data: data.userData.map((item) => item.new),
              type: "bar",
            },
            {
              name: "活跃人数",
              data: data.userData.map((item) => item.active),
              type: "bar",
            },
          ],
        };
        const U = echarts.init(this.$refs.userEcharts);
        U.setOption(userOption); */

        this.echartData.user.xData = data.userData.map((item) => item.data);
        this.echartData.user.series = [
          {
            name: "新增用户",
            data: data.userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃人数",
            data: data.userData.map((item) => item.active),
            type: "bar",
          },
        ];

        // 饼图
        /* const videoOption = {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
          ],
          series: [
            {
              data: data.videoData,
              type: "pie",
            },
          ],
        };
        const V = echarts.init(this.$refs.videoEcharts);
        V.setOption(videoOption); */

        this.echartData.video.series = [
          {
            data: data.videoData,
            type: "pie",
          },
        ];
      }
    });
  },
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  .userinfo {
    margin-left: 40px;
    .name {
      font-size: 30px;
    }
    .access {
      color: #949798;
      font-size: 12px;
    }
  }
}
.login-info {
  margin-top: 15px;
  p {
    color: #949798;
    font-size: 14px;
    span {
      margin-left: 40px;
    }
  }
}
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 170px;
  /deep/.el-card__body {
    padding: 0;
  }
  .el-card {
    width: 31%;
    height: 40%;
    .icon {
      float: left;
      margin-right: 20px;
      width: 68px;
      height: 68px;
      line-height: 68px;
      text-align: center;
      color: #fff;
      font-size: 30px;
    }
    .detail {
      padding: 7px 0;
    }
    .money {
      font-size: 26px;
    }
    .txt {
      font-size: 14px;
      color: #949798;
    }
  }
}
.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>