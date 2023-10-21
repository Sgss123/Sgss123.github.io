<template>
    <p class="text-8xl font-extrabold py-4">{{ $route.params.id }} - {{ title }}</p>
    <p>查看PDF版本：<a :href="`/blogs/pdf/${fileName}.pdf`" :download="title" target="_blank">点击下载</a> | <a
            :href="`/blogs/pdf/${fileName}.pdf`" target="_blank">在线查看</a></p>
    <hr>
    <div id="post" class="min-w-full markdown-body mb-2" v-html="markdownContent"></div>
</template>
<script setup>
import 'github-markdown-css/github-markdown.css';
import { useRouter, useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import axios from 'axios';
import * as marked from 'marked';
const router = useRouter();
const route = useRoute();
const list = ref([]);
let fileName = ref("");
let title = ref("");
async function getData() {
    const res = await fetch("/postList.json");
    const finalRes = await res.json();
    list.value = finalRes;
    console.log(list);
    const post = queryDataId(route.params.id, list.value);
    console.log(post.id);
    fileName.value = post.location;
    title.value = post.postName;
    // console.log(fileName);

}
getData();
const queryDataId = (id, data) => {
    for (var i = 0; i < data.length; i++) {
        if (id == data[i].id)
            return data[i];
    }
}
const markdownContent = ref('');
watch(fileName, async (newFileName) => { // 当fileName变化时，执行下面的代码  
    console.log(newFileName);
    // console.log(`/blogs/${newFileName}.md`);
    if (newFileName) { // 确保newFileName有值，避免在fileName还未赋值时请求数据  
        // const response = await axios.get(`/blogs/${newFileName}.md`);
        const response = await axios.get(`/blogs/${newFileName}.html`);
        const markdown = response.data;
        // markdownContent.value = marked.marked(markdown);
        markdownContent.value = markdown;
        // console.log(markdownContent);
    }
});
</script>
<style >
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