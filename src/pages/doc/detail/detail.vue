<template>

  <AppHeader :header-title="detailData.id === 'new' ? '新建文档' : detailData.isEdit ? '编辑文档' : '文档详情' ">
    <template v-if="!detailData.isEdit">
      <el-button round @click="onBack">返回</el-button>
      <el-button type="primary" round @click="onEdit">编辑</el-button>
    </template>
    <template v-if="detailData.isEdit">
      <el-button round @click="onCancel">取消</el-button>
      <el-button type="primary" round @click="onSubmitForm">提交</el-button>
    </template>
  </AppHeader>
  
  <el-main style="padding: 0; margin-top: 10px;">
    <div class="warp-block">
      <div class="warp-block-title">文档基本信息</div>
      <el-form :model="dataForm" label-width="80px" ref="dataFormEl" :inline="true">
        <el-form-item label="文档名称" prop="title"  placeholder="请输入" :rules="[{ required: true, message: '文档名称不能为空' }]">
          <el-input v-model="dataForm.title" v-if="detailData.isEdit"></el-input>
          <span  v-if="!detailData.isEdit">{{ dataForm.title }}</span>
        </el-form-item>

        <el-form-item label="文档类型" prop="type" :rules="[{ required: true, message: '请选择文档类型' }]">
          <el-select v-model="dataForm.type" placeholder="请选择文档类型" v-if="detailData.isEdit">
            <el-option v-for="item in docTypeList" :label="item.name" :value="item.type"></el-option>
          </el-select>
          <span  v-if="!detailData.isEdit">{{ dataForm.title }}</span>
        </el-form-item>

        <el-form-item
          label="内容类型"
          prop="contentType"
          :rules="[{ required: true, message: '请选择文档内容类型' }]"
        >
          <el-select v-model="dataForm.contentType" placeholder="请选择文档内容类型" v-if="detailData.isEdit">
            <el-option label="知识点" value="知识点"></el-option>
            <el-option label="问答题" value="问答题"></el-option>
          </el-select>
          <span  v-if="!detailData.isEdit">{{ dataForm.title }}</span>
        </el-form-item>

        <el-form-item label="文档作者" >
          <el-input v-model="dataForm.autor" placeholder="请输入" v-if="detailData.isEdit"></el-input>
          <span  v-if="!detailData.isEdit">{{ dataForm.title }}</span>
        </el-form-item>
      </el-form>
    </div>

    <div class="warp-block">
      <div class="warp-block-title">文档内容</div>
      <v-md-editor v-model="dataForm.content" :height="detailData.editorHeight" :mode="detailData.isEdit ? 'edit' : 'preview'"></v-md-editor>
    </div>
  </el-main>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import AppHeader from "@/components/app-header/app-header.vue";
import { Doc, DocForm, DocType } from '@/types/doc';
import { addDoc, getDocById, getDocTypeList, updateDoc } from '@/api/doc';

const route = useRoute();
const router = useRouter();

//文档表单
const dataForm = reactive<DocForm>({
  title: '',//标题
  type: undefined,//文档类型
  contentType: '',//文档内容类型
  content: '',//内容
  autor: ''//作者
})

const detailData = reactive({
  id: route.params.id,
  isEdit: false,
  editorHeight: "auto"
})

const docTypeList = ref<DocType[]>([]);
//获取文档类型列表
getDocTypeList().then((res) => {
  docTypeList.value = res.data;
});

onMounted(() => {
  // 获取详情
  if (detailData.id !== 'new') {
    getDocDetail();
  } else {
    onEdit();
  }
})

// 请求详情
const getDocDetail = () => {
  getDocById(Number(route.params.id)).then(res => {
    if (res.status) { setFormData(res.data) };
  })
}

// 编辑
const onEdit = () => {
  detailData.editorHeight = window.innerHeight - 345 + "px";
  detailData.isEdit = true;
}

// 取消
const onCancel = () => {
  if (detailData.id === 'new') return onBack();
  detailData.editorHeight = "auto";
  getDocDetail();
  detailData.isEdit = false;
}

const onBack = () => {
  router.back();
}

//提交表单
const dataFormEl = ref();
const onSubmitForm = () => {
  dataFormEl.value.validate((valid: any) => {
    if (!valid) return;
    if (detailData.id !== 'new') {//编辑更新
      updateDoc(Object.assign(dataForm, { id: detailData.id })).then((res) => {
        if (res.status) {
          detailData.isEdit = false;
          ElMessage({ message: res.message, type: 'success' })
        } else {
          ElMessage({ message: res.message, type: 'warning' })
        }
      })
    } else {//添加
      addDoc(dataForm).then((res) => {
        if (res.status) {
          detailData.id = String(res.data.id);
          detailData.isEdit = false;
          ElMessage({ message: res.message, type: 'success' })
        } else {
          ElMessage({ message: res.message, type: 'warning' })
        }
      })
    }
  })
}

// 表单赋值
const setFormData = (data: Doc) => {
  dataForm.title = data.title;
  dataForm.type = data.type;
  dataForm.contentType = data.contentType;
  dataForm.content = data.content;
  dataForm.autor = data.autor;
}

</script>
<style lang="scss" scoped>
@import "./detail.scss";
</style>
