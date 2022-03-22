<template>
  <div class="goods">
    <el-dialog
      :title="operateType === 'add' ? '新增商品' : '更新商品'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
      ></common-form>
      <div class="dialog-footer" slot="footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="goods-header">
      <el-button type="primary" @click="addUser">+ 新增</el-button>
      <common-form :formLabel="formLabel" :form="searchForm" :inline="true">
        <el-button type="primary" @click="getList(searchForm.keyword)"
          >搜索</el-button
        >
      </common-form>
    </div>
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @edit="editGoods"
      @del="delGoods"
      @changePage="getList()"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from "@/components/CommonForm";
import CommonTable from "@/components/CommonTable";

import { getGoods } from "@/api/data";

export default {
  name: "Goods",
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      operateType: "",
      isShow: false,
      operateFormLabel: [
        {
          model: "id",
          label: "商品序号",
          type: "input",
        },
        {
          model: "name",
          label: "商品名称",
          type: "input",
        },
        {
          model: "price",
          label: "商品价格",
          type: "input",
        },
        {
          model: "time",
          label: "发布时间",
          type: "date",
        },
        {
          model: "state",
          label: "状态",
          type: "input",
        },
      ],
      operateForm: {
        id: "",
        name: "",
        price: "",
        time: "",
        state: "",
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keyword: "",
      },
      tableData: [],
      tableLabel: [
        {
          prop: "id",
          label: "商品序号",
        },
        {
          prop: "name",
          label: "商品名称",
          width: 370,
        },
        {
          prop: "price",
          label: "商品价格",
        },
        {
          prop: "time",
          label: "发布时间",
        },
        {
          prop: "state",
          label: "状态",
        },
      ],
      config: {
        page: 1,
        total: 20,
      },
    };
  },
  methods: {
    confirm() {
      if (this.operateType === "edit") {
        this.$http.post("/goods/edit", this.operateForm).then(() => {
          this.$message({
            type: "success",
            message: "修改成功",
          });
          this.isShow = false;
          this.getList();
        });
      } else {
        if (
          this.operateForm.name.trim() === "" ||
          this.operateForm.time.trim() === ""
        ) {
          this.$message({
            type: "warning",
            message: "请输入完整信息",
          });
        } else {
          this.$http.post("/goods/add", this.operateForm).then(() => {
            this.$message({
              type: "success",
              message: "添加成功",
            });
            this.isShow = false;
            this.getList();
          });
        }
      }
    },
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      getGoods().then(({ data: res }) => {
        this.operateForm = {
          id: res.count + 1,
          name: "",
          price: "￥",
          time: "",
          state: "已上架",
        };
      });
    },
    editGoods(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = JSON.parse(JSON.stringify(row));
    },
    delGoods(row) {
      const state = row.state;
      if (state === "已下架") {
        this.$message({
          type: "warning",
          message: "商品已删除",
        });
      } else {
        this.$confirm("此操作将永久删除，是否继续？", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          const id = row.id;
          this.$http
            .post("/goods/del", {
              id,
            })
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功",
              });
              this.getList();
            });
        });
      }
    },
    getList(name = "") {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      getGoods({
        page: this.config.page,
        name,
      }).then(({ data: res }) => {
        this.tableData = res.List;
        this.config.total = res.count;
        this.config.loading = false;
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang='less' scoped>
.goods-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>