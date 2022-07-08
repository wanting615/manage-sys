<template>
  <el-drawer
    title="添加文档类型"
    direction="ttb"
    custom-class="doc-drawer"
    v-model="drawer"
    :before-close="cancelForm"
    destroy-on-close
  >
    <el-form :model="data.form">
      <el-form-item label="文档类型" label-width="80px">
        <el-input v-model="data.form.name" autocomplete="off" placeholder="请输入文档类型"></el-input>
      </el-form-item>
      <el-form-item label="内容类型" label-width="80px">
        <el-checkbox-group v-model="data.form.contentTypes">
          <el-checkbox label="知识点" border value="info"></el-checkbox>
          <el-checkbox label="问答题" border value="quetion"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="类型图标" label-width="80px">
        <el-upload
          class="avatar-uploader"
          :action="data.unploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :headers="uploadData"
        >
          <img v-if="data.imageUrl" :src="baseUrl + data.imageUrl" class="avatar" style="width: 100px;" />
          <el-icon v-else class="avatar-uploader-icon" :size="30" color="#ccc">
            <plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <div class="drawer__footer">
      <el-button @click="cancelForm">取消</el-button>
      <el-button
        type="primary"
        :loading="data.loading"
        @click="handleClose"
      >{{ data.loading ? '提交中 ...' : '确定' }}</el-button>
    </div>
  </el-drawer>
</template>
<script setup lang="ts">
import { addDocType } from "@/api/doc";
import { ElMessage, ElMessageBox } from "element-plus";
import { Plus } from '@element-plus/icons'
import { reactive, } from "vue";
import { UrlService } from "@/api/ur.base" 

defineProps({
  drawer: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['closeDarwer'])
const data = reactive<{
  form: {
    name: string,
    contentTypes: string[],
  },
  loading: boolean,
  imageUrl: string,
  unploadUrl: string
}>({
  form: {
    name: '',
    contentTypes: [],
  },
  loading: false,
  imageUrl: '',
  unploadUrl: UrlService.baseUrl + "uploadTypeImg"
})
const baseUrl = import.meta.env.VITE_BASE_URL;
const uploadData = reactive({
  ACCESS_TOKEN: localStorage.getItem('token')
})

//上传成功
const handleAvatarSuccess = (res: { status: boolean; message: string; url: string }, file: File) => {
  if (res.status) {
    data.imageUrl = res.url
  }
}

const beforeAvatarUpload = (file: File) => {
  if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png') {
    ElMessage({ message: '图片格式仅为jpg/jpeg/png', type: 'error' })
  }
}
//确定
const handleClose = () => {
  if (data.loading) {
    return
  }
  ElMessageBox.confirm('确定提交吗?')
    .then(() => {
      data.loading = true
      addDocType(data.form.name, data.form.contentTypes.join(","), data.imageUrl).then(res => {
        setTimeout(() => {
          if (res.status) {
            emit('closeDarwer', res.data);
            ElMessage({ message: res.message, type: 'success' })
            resetData();
          } else {
            ElMessage({ message: res.message, type: 'warning' })
          }
          data.loading = false;
        }, 400)
      })

    })
}
//取消
const cancelForm = () => {
  data.loading = false;
  emit('closeDarwer', false);
}

const resetData = () => {
  data.form.name = '';
  data.form.contentTypes = [];
  data.imageUrl = '';
}
</script>
<style>
.drawer__footer {
  position: absolute;
  right: 20px;
  bottom: 20px;
}
.el-upload {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #ccc;
}
</style>