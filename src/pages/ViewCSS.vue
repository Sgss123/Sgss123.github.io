<template>
    <div id="post" class="min-w-full" v-html="content"></div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import axios from 'axios';
const route = useRoute();
const list = ref([]);
const fileName = ref("");
const pdfLocation = ref("");
const title = ref("");
(async function () {
    const res = await fetch("/cssList.json");
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
const content = ref('');
watch(fileName, async (newFileName) => {
    // 确保newFileName有值，避免在fileName还未赋值时请求数据
    if (newFileName) {
        const response = await axios.get(`/blogs/${newFileName}`);
        const htm = response.data;
        content.value = htm;
    }
});
</script>