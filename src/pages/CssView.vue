<template>
    <p class="bg-blue-400 text-red-600 font-bold text-4xl"></p>
    <h1 class="bg-light-900 font-bold px-4 py-2 m-2 text-center justify-center text-4xl">文章列表</h1>
    <ul>
        <li v-for="item in list" :key="item.id" class="m-4 px-2 py-1 justify-center text-center hover:(text-blue-700)">
            <!-- <router-link :to="{ name: 'blog', params: { id: `${item.id}` } }" @click="post(`${item.id}`)">{{ item.postName }}</router-link> -->
            <p class="text-2xl"><a :href="`/post/${item.id}`">{{ item.postName }}</a></p>
        </li>
    </ul>
</template>
<script setup>
import { ref, onMounted } from 'vue';

const list = ref([]);

onMounted(async () => {
    try {
        const res = await fetch("/cssList.json");
        const finalRes = await res.json();
        list.value = finalRes;
    } catch (error) {
        console.error(error);
    }
});
</script>


<style scoped></style>