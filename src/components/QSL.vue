<template>
  <!-- 主容器：充满高度，使用背景色，flex垂直布局，居中对齐 -->
  <v-container class="fill-height bg-surface-variant flex-column d-flex justify-center align-center" fluid>
    <!-- 卡片组件：内边距，圆角，阴影效果，最大宽度限制 -->
    <v-card class="pa-6 rounded-xl elevation-10 mx-auto" max-width="600">
      <!-- 卡片标题：居中，大字号，加粗，底部外边距 -->
      <v-card-title class="text-center text-h3 font-weight-bold mb-6">QSL签收系统</v-card-title>
      
      <!-- 卡片内容区域 -->
      <v-card-text>
        <!-- 表单：引用form，双向绑定验证状态，提交事件处理，flex垂直布局，子元素间距 -->
        <v-form ref="form" v-model="isFormValid" @submit.prevent="eQSLSubmit" class="d-flex flex-column gap-4">
          <!-- 文本输入框：双向绑定qslId，验证规则，可清除，标签，变体样式，图标，占位符，提示 -->
          <v-text-field
            v-model="qslId"
            :rules="[rules.required]"
            clearable
            label="请输入卡片上的ID"
            variant="outlined"
            prepend-inner-icon="mdi-card-account-details"
            placeholder="例如: QSL-12345"
            hint="输入您收到的QSL卡片上的唯一标识符"
            persistent-hint
          />
          
          <!-- 展开过渡效果 -->
          <v-expand-transition>
            <!-- 当有qslId时显示Turnstile验证 -->
            <div v-if="qslId" class="mt-4">
              <!-- Cloudflare Turnstile验证组件 -->
              <vue-turnstile 
                class="d-flex justify-center align-center" 
                ref="reCaptchaTurnstile" 
                v-model="token"
                site-key="0x4AAAAAABkS4AjGy6vPeTBH" 
              />
            </div>
          </v-expand-transition>

          <!-- 提交按钮：禁用状态取决于表单验证和token，样式，加载状态 -->
          <v-btn 
            :disabled="!isFormValid || !token" 
            class="mt-4 text-white" 
            color="light-blue-darken-2" 
            size="large"
            block
            type="submit"
            :loading="isSubmitting"
          >
            <v-icon start>mdi-check-circle</v-icon>
            确认签收
          </v-btn>
        </v-form>
      </v-card-text>

      <!-- 消息提示条：控制显示，颜色，超时时间 -->
      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        :timeout="3000"
      >
        {{ snackbar.text }}
        <template v-slot:actions>
          <v-btn variant="text" @click="snackbar.show = false">关闭</v-btn>
        </template>
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script setup>
// 导入Vue相关功能
import { ref, reactive } from 'vue'
// 导入Cloudflare Turnstile组件
import VueTurnstile from 'vue-turnstile'

// 表单相关引用和状态
const form = ref(null) // 表单引用
const isFormValid = ref(false) // 表单验证状态
const qslId = ref('') // QSL ID输入值
const token = ref(null) // Turnstile验证token
const reCaptchaTurnstile = ref(null) // Turnstile组件引用
const isSubmitting = ref(false) // 提交加载状态

// 消息提示状态
const snackbar = reactive({
  show: false, // 是否显示
  text: '', // 显示文本
  color: 'success', // 颜色主题
})

// 表单验证规则
const rules = {
  // 必填规则
  required: value => !!value || '此字段为必填项',
  // 邮箱格式规则(虽然当前未使用)
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || '请输入有效的电子邮箱地址'
  },
}

// 提交表单处理函数
const eQSLSubmit = async () => {
  // 验证表单和token
  if (!isFormValid.value || !token.value) {
    showMessage('请完成所有必填项和人机验证', 'error')
    return
  }
  
  try {
    isSubmitting.value = true // 开始提交，显示加载状态
    
    // 模拟API请求 - 实际应用中替换为真实API调用
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 这里应该是实际的API调用
    console.log('QSL签收提交成功:', {
      qslId: qslId.value,
      token: token.value
    })
    
    // 成功处理
    showMessage('QSL卡片签收成功！', 'success')
    resetForm() // 重置表单
  } catch (error) {
    console.error('签收失败:', error)
    showMessage('签收失败，请稍后重试', 'error')
  } finally {
    isSubmitting.value = false // 结束提交，隐藏加载状态
  }
}

// 显示消息提示
const showMessage = (text, color = 'success') => {
  snackbar.text = text
  snackbar.color = color
  snackbar.show = true
}

// 重置表单状态
const resetForm = () => {
  qslId.value = '' // 清空QSL ID
  token.value = null // 清空验证token
  // 重置Turnstile验证
  if (reCaptchaTurnstile.value) {
    reCaptchaTurnstile.value.reset()
  }
  // 重置表单验证状态
  form.value?.reset()
}
</script>

<style scoped lang="scss">
/* 卡片样式 */
.v-card {
  // 背景模糊效果(注释掉但保留备用)
  // background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  // 悬停动画效果
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px); // 悬停上移
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15); // 悬停阴影增强
  }
}

/* 卡片标题样式 */
.v-card-title {
  // 渐变文字效果
  background: linear-gradient(45deg, #1976d2, #42a5f5);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  letter-spacing: 1px; // 字母间距
}

/* 按钮样式 */
.v-btn {
  transition: all 0.3s ease; // 过渡效果
  
  &:hover:not(:disabled) {
    transform: scale(1.03); // 悬停放大
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // 悬停阴影
  }
}

/* 输入框样式 */
.v-text-field {
  transition: all 0.3s ease; // 过渡效果
  
  &:focus-within {
    transform: scale(1.02); // 获取焦点时轻微放大
  }
}
</style>