<template>
  <v-container class="fill-height bg-surface-variant flex-column d-flex justify-center align-center" fluid>
    <v-card class="pa-6 rounded-xl elevation-10 mx-auto" max-width="600">
      <v-card-title class="text-center text-h3 font-weight-bold mb-6">QSL签收系统</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="isFormValid" @submit.prevent="eQSLSubmit" class="d-flex flex-column gap-4">
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
          
          <v-expand-transition>
            <div v-if="qslId" class="mt-4">
              <vue-turnstile 
                class="d-flex justify-center align-center" 
                ref="reCaptchaTurnstile" 
                v-model="token"
                site-key="0x4AAAAAABkS4AjGy6vPeTBH" 
              />
            </div>
          </v-expand-transition>

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
import { ref, reactive } from 'vue'
import VueTurnstile from 'vue-turnstile'

// 表单相关
const form = ref(null)
const isFormValid = ref(false)
const qslId = ref('')
const token = ref(null)
const reCaptchaTurnstile = ref(null)
const isSubmitting = ref(false)

// 消息提示
const snackbar = reactive({
  show: false,
  text: '',
  color: 'success',
})

// 表单验证规则
const rules = {
  required: value => !!value || '此字段为必填项',
  email: value => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || '请输入有效的电子邮箱地址'
  },
}

// 提交表单
const eQSLSubmit = async () => {
  if (!isFormValid.value || !token.value) {
    showMessage('请完成所有必填项和人机验证', 'error')
    return
  }
  
  try {
    isSubmitting.value = true
    
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 这里应该是实际的API调用
    console.log('QSL签收提交成功:', {
      qslId: qslId.value,
      token: token.value
    })
    
    // 成功处理
    showMessage('QSL卡片签收成功！', 'success')
    resetForm()
  } catch (error) {
    console.error('签收失败:', error)
    showMessage('签收失败，请稍后重试', 'error')
  } finally {
    isSubmitting.value = false
  }
}

// 显示消息
const showMessage = (text, color = 'success') => {
  snackbar.text = text
  snackbar.color = color
  snackbar.show = true
}

// 重置表单
const resetForm = () => {
  qslId.value = ''
  token.value = null
  if (reCaptchaTurnstile.value) {
    reCaptchaTurnstile.value.reset()
  }
  form.value?.reset()
}
</script>

<style scoped lang="scss">
.v-card {
  // background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
}

.v-card-title {
  background: linear-gradient(45deg, #1976d2, #42a5f5);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  letter-spacing: 1px;
}

.v-btn {
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: scale(1.03);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
}

.v-text-field {
  transition: all 0.3s ease;
  
  &:focus-within {
    transform: scale(1.02);
  }
}
</style>
