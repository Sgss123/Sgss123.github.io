<template>
    <h1 class="font-serif text-6xl text-center">首页</h1>
    <img src="https://v2.jinrishici.com/one.svg?font-size=50&spacing=2&color=DarkRed" alt="" class="m-auto">
    <el-button type="primary" @click="clickHandler" class="m-auto">Primary</el-button>
    <html>

    <body>
        <div class="logotit">
            <h1 data-only data-content="Sgss的博客">Sgss的博客</h1>
        </div>
    </body>

    </html>
</template>
<script setup>
import showMsg from '~/commons/showMsg.jsx';
const clickHandler = () => {
    showMsg('内存不能为“Read”', (close) => {
        close();
    });
};

</script>
<style scoped>
html {
    font-size: 15px;
}

body {
    background-color: #222;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 95vw;
    min-height: 70vh;
}

h1[data-only] {
    color: #333;
    font-family: Helvetica, sans-serif;
    margin: 0;
    padding: 0;
    font-size: 8rem;
    letter-spacing: -0.3rem;
    position: relative;
}

h1[data-only]::after {
    content: attr(data-content);
    color: transparent;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-clip-path: ellipse(100px 100px at 0% 50%);
    clip-path: ellipse(100px 100px at 0% 50%);
    animation: spotlight 5s infinite;
    background-image: url(https://gradienthunt.com/gradients-images/45404.jpg);
    background-size: 150%;
    background-position: center center;
    -webkit-background-clip: text; 
    background-clip: text;
}

@keyframes spotlight {
    0% {
        -webkit-clip-path: ellipse(100px 100px at 0% 50%);
        clip-path: ellipse(100px 100px at 0% 50%);
    }

    50% {
        -webkit-clip-path: ellipse(100px 100px at 100% 50%);
        clip-path: ellipse(100px 100px at 100% 50%);
    }

    100% {
        -webkit-clip-path: ellipse(100px 100px at 0% 50%);
        clip-path: ellipse(100px 100px at 0% 50%);
    }
}
</style>