<template>
  <div class="container">
    <div ref="editorContainer" style="width: 80vw; height: 80vh;"></div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #000;
  border-radius: .5%;
}
</style>
<script setup>
import {onMounted, ref} from 'vue';
import * as monaco from 'monaco-editor';
// const monaco = require('monaco-editor/esm/vs/editor/editor.api')

const editorContainer = ref(null);

onMounted(() => {
  initEditor();
});

const initEditor = () => {
  const editor = monaco.editor.create(editorContainer.value, {
    value: '',
    language: 'javascript',
    theme: 'vs-dark',
    formatOnPaste: true,
    automaticLayout: true,
    fontSize: 16,
  });

  // 配置显示语言为中文
  monaco.editor.defineTheme('zh-cn', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.foreground': '#F8F8F8',
      'editor.background': '#1E1E1E',
      // 其他颜色配置...
    }
  });
  monaco.editor.setTheme('zh-cn');

  // 可以在这里对编辑器进行一些配置和监听事件的操作
};
</script>