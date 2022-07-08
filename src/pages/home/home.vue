<template>
  <div class="home">
    <el-form :model="form" label-width="75px" label-position="left">
      <!-- <el-form-item label="用户名" class="item">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" class="item">
        <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item> -->
      <el-form-item label class="item">
        <!-- <el-button type="primary" @click="submitForm()">登陆</el-button> -->
        <el-button type="primary" @click="submitForm()">前往</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { ElMessage } from "element-plus";
import { login } from "@/api/login";
import { useRouter } from "vue-router";

const router = useRouter();

console.log(import.meta.env)

const form = reactive({
  username: '',
  password: ''
})
const submitForm = () => {
  loginFn()
}
document.onkeydown = e => {
  if (e.keyCode === 13) { loginFn() }
}

const loginFn = () => {
  // login(form.username, form.password).then(res => {
    // if (res.status) {
      // ElMessage({
      //   type: 'success',
      //   message: res.message
      // })
      router.push("/list/1")
    // } else {
    //   ElMessage({ type: "warning", message: res.message })
    // }
  // })
}
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
  background: url("../../assets/home-bg.jpeg") no-repeat center center;
  background-size: cover;
  .el-form {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 400px;
    padding: 80px 40px;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
  }
}
</style>