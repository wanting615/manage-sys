<template>
  <el-drawer
    v-model="visible"
    title="添加文档"
    destroy-on-close
    :size="'50%'"
    :before-close="cancleModal"
  >
    <el-form :model="dataForm" label-width="120px" ref="dataFormEl">
      <el-form-item label="文档名称" prop="title" :rules="[{ required: true, message: '文档名称不能为空' }]">
        <el-input v-model="dataForm.title"></el-input>
      </el-form-item>

      <el-form-item label="文档类型" prop="type" :rules="[{ required: true, message: '请选择文档类型' }]">
        <el-select v-model="dataForm.type" placeholder="请选择文档类型">
          <el-option v-for="item in docTypeList" :label="item.name" :value="item.type"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="内容类型"
        prop="contentType"
        :rules="[{ required: true, message: '请选择文档内容类型' }]"
      >
        <el-select v-model="dataForm.contentType" placeholder="请选择文档内容类型">
          <el-option label="知识点" value="知识点"></el-option>
          <el-option label="问答题" value="问答题"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="文档内容" prop="content" :rules="[{ required: true, message: '文档内容不能为空' }]">
        <el-input v-model="dataForm.content" type="textarea" show-word-limit :maxlength="50000" :rows="12"></el-input>
      </el-form-item>

      <el-form-item label="文档作者" label-width="120px">
        <el-input v-model="dataForm.autor"></el-input>
      </el-form-item>
    </el-form>
    <div class="dialog-footer">
      <el-button @click="cancleModal">取消</el-button>
      <el-button type="primary" @click="submitForm">确认</el-button>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { addDoc, getDocTypeList, updateDoc } from '@/api/doc';
import { Doc, DocForm, DocType } from '@/types/doc';
import { ElMessage } from 'element-plus';


const props = defineProps<{
  docDrawerVisible: boolean,
  editData: Doc | null
}>();

const docTypeList = ref<DocType[]>([]);
//获取文档类型列表
getDocTypeList().then((res) => {
  docTypeList.value = res.data;
});


const visible = ref(false);

watch(() => props.docDrawerVisible, (val) => {
  visible.value = val;
})

const emit = defineEmits(['closeDrawer']);

//文档表单
const dataForm = reactive<DocForm>({
  // form: {
  title: '',//标题
  type: undefined,//文档类型
  contentType: '',//文档内容类型
  content: '',//内容
  autor: ''//作者
  // }
})

//监听编辑数据
watch(() => props.editData, (val: Doc | null) => {
  if (!val) { resetForm(); return; };
  dataForm.title = val.title;
  dataForm.type = val.type;
  dataForm.contentType = val.contentType;
  dataForm.content = val.content;
  dataForm.autor = val.autor;
})

//提交表单
const dataFormEl = ref();
const submitForm = () => {
  dataFormEl.value.validate((valid: any) => {
    if (!valid) return;
    if (props.editData) {//编辑更新
      updateDoc(Object.assign(dataForm, { id: props.editData.id })).then((res) => {
        if (res.status) {
          emit('closeDrawer', 'edit', res.data);
          ElMessage({ message: res.message, type: 'success' })
        } else {
          ElMessage({ message: res.message, type: 'warning' })
        }
      })
    } else {//添加
      addDoc(dataForm).then((res) => {
        if (res.status) {
          emit('closeDrawer', 'add', res.data);
          ElMessage({ message: res.message, type: 'success' })
        } else {
          ElMessage({ message: res.message, type: 'warning' })
        }
      })
    }
  })
}

const resetForm = () => {
  dataForm.title = "";
  dataForm.type = undefined;
  dataForm.contentType = '';
  dataForm.content = '';
  dataForm.autor = '';
}

//取消关闭
const cancleModal = () => {
  emit('closeDrawer', false);
}
</script>
<style lang="scss" scoped>
  .dialog-footer {
    margin-top: 40px;
    text-align: center;
  }

  .el-select {
    width: 100%;
  }
</style>