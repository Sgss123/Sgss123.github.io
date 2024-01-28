<template>
  <!-- <el-button type="primary" @click="emit('click')">确定</el-button> -->
  <button class="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:(text-white bg-purple-600 border-transparent) focus:(outline-none ring-2 ring-purple-600 ring-offset-2)"
          @click="emit('click')">
    确定
  </button>
</template>
<script setup>
const emit = defineEmits(['click']);
</script>
<style></style>