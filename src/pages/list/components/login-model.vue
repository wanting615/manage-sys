<template>
  <el-dialog v-model="props.isShow" title="登录" width="30%" :before-close="close"  center>
    <div class="home">
    <el-form :model="form" label-width="75px" label-position="left">
      <el-form-item label="用户名" class="item">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" class="item">
        <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
    <template #footer>
        <el-button type="primary" @click="loginBtn()">登录</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { login } from '@/api/login';
import { ElDialog, ElButton, ElMessage } from 'element-plus'; 
import { reactive } from 'vue';

const emit = defineEmits(['loginCallBack'])
const props = withDefaults(defineProps<{isShow: boolean}>(),{
  isShow: false
})

const form  = reactive({
  username: '',
  password: ''
})

// 登录
const loginBtn = () => {
  if(form.password  === '' || form.username === ''){
    ElMessage({type: 'error',message: '请输入用户名和密码'});
    return;
  }
  login(form.username, form.password).then(res => {
    if (res.status) {
      ElMessage({
        type: 'success',
        message: res.message
      })
        emit('loginCallBack',true, res.data)
    } else {
      emit('loginCallBack',false)
      ElMessage({ type: "warning", message: res.message })
    }
    
  })
}

// 关闭弹窗
const close = () => {
  emit('loginCallBack', false)
}
</script>
<style lang="scss" scoped>
  .el-button{
    width: 70%;
  }
</style>