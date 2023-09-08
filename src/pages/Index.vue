<template>
    <h1 class="font-serif text-6xl text-center">首页</h1>
    <img src="https://v2.jinrishici.com/one.svg?font-size=50&spacing=2&color=DarkRed" alt="">
    <el-button type="primary" @click="clickHandler">Primary</el-button>
</template>
<script setup>
import showMsg from '~/commons/showMsg.jsx';
const clickHandler = () => {
    showMsg('内存不能为“Read”', (close) => {
        close();
    });
};

</script>