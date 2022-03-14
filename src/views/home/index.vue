<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
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
    <el-col :span="16">
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
        <Echart
          :chartData="echartData.order"
          style="height: 250px; margin-top: 20px"
        />
      </el-card>
      <div class="graph">
        <el-card style="width: 48%; height: 200px">
          <Echart :chartData="echartData.user" style="height: 200px" />
        </el-card>
        <el-card style="width: 48%; height: 200px">
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
        this.echartData.order.xData = xData;
        this.echartData.order.series = series;

        // 用户柱状图
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