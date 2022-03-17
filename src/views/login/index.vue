<template>
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="100px"
    class="login-container"
  >
    <h3 class="login-title">系统登录入口</h3>
    <el-form-item
      label="用户名"
      label-width="80px"
      prop="username"
      class="username"
    >
      <el-input
        type="input"
        v-model="form.username"
        autocomplete="off"
        placeholder="请输入账号"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" label-width="80px" prop="password">
      <el-input
        type="password"
        v-model="form.password"
        autocomplete="off"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item class="login-submin">
      <el-button type="primary" @click="login" class="login-submin"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { getMenu } from "@/api/data";

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, message: "用户名长度不能小于3位", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      getMenu(this.form).then(({ data: res }) => {
        console.log(res);
        if (res.code === 20000) {
          this.$store.commit("clearMenu");
          this.$store.commit("setMenu", res.data.menu);
          this.$store.commit("setToken", res.data.token);
          this.$store.commit("addMenu", this.$router);
          this.$router.push({ name: "home" });
        } else {
          this.$message({
            type: "warning",
            message: res.data.message,
          });
        }
      });
    },
    register() {
      this.$message({
        type: "success",
        message: "注册成功",
      });
    },
  },
};
</script>

<style lang='less' scoped>
.login-container {
  width: 350px;
  margin: 180px auto 0;
  padding: 0px 35px 20px 35px;
  border-radius: 15%;
  border: 1px solid #eaeaea;
  background-clip: padding-box;
  background-color: #fff;
  box-shadow: 0 0 25px #cac6c6;
  .login-title {
    text-align: center;
    color: #505458;
  }
  /deep/ .el-button {
    margin-left: 40px;
  }
}
</style>