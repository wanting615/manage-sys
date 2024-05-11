<template>
  <el-drawer
    title="添加文档类型"
    class="doc-drawer"
    :size="'450px'"
    v-model="drawerVisible"
    :before-close="cancelForm"
    destroy-on-close
  >
    <el-form :model="data.form">
      <el-form-item label="文档类型" label-width="80px">
        <el-input v-model="data.form.name" autocomplete="off" placeholder="请输入文档类型"></el-input>
      </el-form-item>
      <el-form-item label="内容类型" label-width="80px">
        <el-checkbox-group v-model="data.form.contents">
          <el-checkbox v-for="item in contents" :label="item.name" :border="true" :value="item.name"></el-checkbox>
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
    <div class="dialog-footer">
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
import { reactive, ref, watch, } from "vue";
import { Plus } from '@element-plus/icons'
import { ElMessage } from "element-plus";
import { addDocType, getContentList, updateDocType } from "@/api/doc";
import { UrlService } from "@/api/ur.base" 
import { useStore } from "@/store";
import { Content, DocType, DocTypeForm } from "@/types/doc";

type Props = {
  docType?: DocType | null;
  modelValue: boolean
}
const props = withDefaults(defineProps<Props>(), {
  docType: null,
  modelValue: false
})

const drawerVisible = ref(false);
const baseUrl = import.meta.env.VITE_BASE_URL;
const store = useStore();
const uploadData = reactive({
  ACCESS_TOKEN: store.state.user?.token
})

watch(() => props.modelValue, (newVal) => {
  if (newVal) {
    drawerVisible.value = newVal
    initData();
  };
}, {
  immediate: true
})

const emit = defineEmits(['closeDarwer',"update:modelValue"])
const data = reactive<{
  form: {
    name: string,
    contents: string[],
  },
  loading: boolean,
  imageUrl: string,
  unploadUrl: string
}>({
  form: {
    name: '',
    contents: [],
  },
  loading: false,
  imageUrl: '',
  unploadUrl: UrlService.baseUrl + "/upload/img"
})

const initData = () => {
  data.form.name = props.docType?.name ?? '';
  data.form.contents = props.docType?.contents.map(item => item.name) ?? [];
  data.imageUrl = props.docType?.iconUrl ?? '';
}

const contents = reactive<Content[]>([]);
getContentList().then(res => {
  if(res.data?.length) {
    contents.push(...res.data)
  }else {
    contents.push(...[
      { name: '知识点'},
      { name: '问答题'},
    ])
  }
});



//上传成功
const handleAvatarSuccess = (res: { status: boolean; message: string; data: string }, file: File) => {
  if (res.status) {
    data.imageUrl = res.data
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
  data.loading = true
  const _paylod: any = {
    id: props.docType?.id,
    name: data.form.name,
    contents: data.form.contents.map(item => ({ name: item })),
    iconUrl: data.imageUrl
  }
  const _request = props.docType?.id ? updateDocType(_paylod) : addDocType(_paylod)
 
  _request.then(res => {
    setTimeout(() => {
      if (res.status) {
        emit("update:modelValue", !!props.docType?.id);
        emit('closeDarwer', res.data);
        drawerVisible.value = false;
        ElMessage({ message: res.message, type: 'success' })
        resetData();
      } else {
        ElMessage({ message: res.message, type: 'warning' })
      }
      data.loading = false;
    }, 400)
  })
}
//取消
const cancelForm = () => {
  data.loading = false;
  emit("update:modelValue", false);
  emit('closeDarwer', false);
  drawerVisible.value = false;
}

const resetData = () => {
  data.form.name = '';
  data.form.contents = [];
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
.dialog-footer {
    margin-top: 40px;
    text-align: center;
  }
</style>