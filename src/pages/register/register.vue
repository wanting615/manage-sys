<template>
  <div class="register-card">
    <h3>欢迎使用</h3>
    <div class="register-tip">小程序前端之路后台管理平台</div>
    <el-form :model="form" ref="ruleFormRef" :rules="rules" status-icon>
      <el-form-item class="item" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" size="large" />
      </el-form-item>
      <el-form-item class="item" prop="name">
        <el-input v-model="form.name" placeholder="请输入昵称" size="large" />
      </el-form-item>
      <el-form-item class="item" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" size="large" show-password />
      </el-form-item>
      <el-form-item class="item">
        <el-button type="primary" size="large" @click="register(ruleFormRef)">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { FormInstance, FormRules } from 'element-plus';
import { registerUser } from '../../api/login';
import { ElMessage } from 'element-plus';

const router = useRouter();

const ruleFormRef = ref<FormInstance>();
const form = reactive({
  name: '',
  username: '',
  password: ''
});

const register = (formEl?: FormInstance) => {
  formEl!.validate((valid) => {
    if (valid) {
      registerUser(form.username, form.password, form.name).then((res) => {
        if (res.status) {
          ElMessage.success(res.message);
          router.push('/home');
        } else {
          ElMessage.error(res.message);
        }
      });
    }
  });
};

const validatorUsername = (rule: any, value: string, callback: any) => {
  if (value.length && /[a-z]|[A-Z]|[0-9]/.test(value)) {
    callback();
  } else {
    callback(new Error(`${rule.field === 'username' ? '账号' : '密码'}只能是英文和数字!`));
  }
};

const rules = reactive<FormRules<{ username: string; password: string }>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'change' },
    { validator: validatorUsername, trigger: 'change' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'change' },
    { validator: validatorUsername, trigger: 'change' }
  ]
});
</script>

<style lang="scss">
@import './register.scss';
</style>
