<template>
  <el-dialog
    v-model="dialogVisible"
    title="编辑文档"
    width="500px"
    :before-close="handleClose"
  >
    <div class="editDoc" v-if="formdata">
      <el-form :model="formdata">
      <el-form-item label="文档类型" label-width="80px">
        <el-input v-model="formdata.name" autocomplete="off" placeholder="请输入文档类型"></el-input>
      </el-form-item>
      <el-form-item label="内容类型" label-width="80px">
        <el-checkbox-group v-model="formdata.contentTypes">
          <el-checkbox label="知识点" border value="info"></el-checkbox>
          <el-checkbox label="问答题" border value="quetion"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="类型图标" label-width="80px">
        <el-upload
          class="avatar-uploader"
          :action="baseUrl + 'uploadTypeImg'"
          :headers="uploadData"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="formdata.iconUrl" :src="baseUrl + formdata.iconUrl" class="avatar" style="width: 100px;" />
          <el-icon v-else class="avatar-uploader-icon" :size="30" color="#ccc">
            <plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submit"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { DocType } from '@/types/doc';
import { Plus } from '@element-plus/icons'
const props = defineProps<{
  dialogVisible: boolean,
  rowData: DocType | null
}>()

const dialogVisible = ref(false);

const baseUrl = import.meta.env.VITE_BASE_URL;

const uploadData = reactive({
  ACCESS_TOKEN: localStorage.getItem('token')
})
const formdata  = reactive<DocType>({
  id: 0,
  type: 1,//文档类型
  name: '',//类型名称
  iconUrl: '',//文档类型icon
  contentTypes: [],//文档内容类型
});
const emit = defineEmits(['closeModal']);

const handleClose = (done: () => void) => {
  emit('closeModal', null);
}

const submit = (done: () => void) => {
  // 更新数据
  emit('closeModal', formdata);
}
//上传成功
const handleAvatarSuccess = (res: { status: boolean; message: string; url: string }) => {
  if (res.status) {
   formdata.iconUrl = res.url
  }
}

const beforeAvatarUpload = (file: File) => {
  if (file.type !== 'image/jpg' && file.type !== 'image/jpeg' && file.type !== 'image/png') {
    ElMessage({ message: '图片格式仅为jpg/jpeg/png', type: 'error' })
  }
}

watch(() => props.rowData, (val: DocType | null) => {
  if (!val) {  return; };
  formdata.id = val.id;
  formdata.type = val.type;
  formdata.contentTypes = JSON.parse(JSON.stringify(val.contentTypes));
  formdata.name = val.name;
  formdata.iconUrl = val.iconUrl;
})

</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>