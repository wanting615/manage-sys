<template>
  <div class="home">
    <el-form :model="form" ref="ruleFormRef" label-width="75px" label-position="left" :rules="rules" status-icon>
      <el-form-item label="用户名" class="item" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" class="item" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item label class="item">
        <el-button type="primary" @click="submitForm()">登陆</el-button>
        <el-button type="primary" @click="register()">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, unref} from "vue";
import { ElMessage } from "element-plus";
import type {FormInstance, FormRules} from 'element-plus'
import { login } from "@/api/login";
import { useRouter } from "vue-router";
import { useStore } from "@/store";


const router = useRouter();

const form = reactive({
  username: '',
  password: ''
})

const formEl = ref()
const submitForm = () => {
  loginFn()
}
document.onkeydown = e => {
  if (e.keyCode === 13) { loginFn() }
}

const store = useStore();

// 登录
const ruleFormRef = ref<FormInstance>()
const loginFn =  () => {
  unref(ruleFormRef)?.validate((valid) => {
    if (!valid) return;
    login(form.username, form.password).then(res => {
      if (res.status) {
        ElMessage(res.message)
        store.commit('setIslogin',true);
        store.commit('setToken', res.data.token);
        store.commit('setUserInfo',res.data.userInfo)
        localStorage.setItem('token', res.data.token);
        router.push("/doc")
      } else {
        ElMessage.error( res.message)
      }
      
    })
  })
 
}

const register = () => {
  router.push('/register')
}

const rules = reactive<FormRules<{ username: string; password: string }>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' },],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' },]
})

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