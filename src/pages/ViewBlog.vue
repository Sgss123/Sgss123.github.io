<template>
  <p class="text-8xl font-extrabold py-4">{{ $route.params.id }} - {{ title }}</p>
  <div v-if="pdfLocation">
    <p>查看PDF版本：<a :download="title" :href="`/blogs/pdf/${pdfLocation}`" target="_blank">点击下载</a> | <a
        :href="`/blogs/pdf/${pdfLocation}`" target="_blank">在线查看</a></p>
  </div>
  <hr>
  <div id="post" class="min-w-full markdown-body mb-2" v-html="markdownContent"></div>
</template>
<script setup>
import 'github-markdown-css/github-markdown.css';
import {useRoute} from 'vue-router';
import {ref, watch} from 'vue';
import axios from 'axios';
import * as marked from 'marked';

const route = useRoute();
const list = ref([]);
const fileName = ref("");
const pdfLocation = ref("");
const title = ref("");
(async function () {
  const res = await fetch("/postList.json");
  const finalRes = await res.json();
  list.value = finalRes;
  const post = queryDataId(route.params.id, list.value);
  if (post) {
    fileName.value = post.location;
    pdfLocation.value = post.pdfLocation;
    title.value = post.postName;
  }
  fileName.value = post.location;
  pdfLocation.value = post.pdfLocation;
  title.value = post.postName;
})();
const queryDataId = (id, data) => {
  for (var i = 0; i < data.length; i++) {
    if (id == data[i].id)
      return data[i];
  }
}
const markdownContent = ref('');
watch(fileName, async (newFileName) => {
  // 确保newFileName有值，避免在fileName还未赋值时请求数据
  if (newFileName) {
    const response = await axios.get(`/blogs/${newFileName}`);
    const markdown = response.data;
    markdownContent.value = marked.marked(markdown);
  }
});
</script>
<style>
hr {
  margin: 2em auto;
}

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: #121212;
    color: #e3e3e3;
  }

  div {
    border-color: #353535;
  }
}

@media (prefers-color-scheme: light) {
  body {
    background-color: #F1F1F1;
    color: #333333;
  }

  div {
    border-color: #a1a1a1;
  }
}
</style>