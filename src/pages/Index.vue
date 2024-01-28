<template>
  <h1 class="font-serif text-6xl text-center">首页</h1>
  <img alt="" class="m-auto" src="https://v2.jinrishici.com/one.svg?font-size=50&spacing=2&color=DarkRed">
  <el-button class="m-auto" type="primary" @click="clickHandler">Primary</el-button>
  <html>

  <body>
  <div class="logotit">
    <h1 data-content="Sgss的博客" data-only>Sgss的博客</h1>
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
  font-weight: bold;
  color: #333;
  font-family: Helvetica, sans-serif;
  margin: 0;
  padding: 0;
  font-size: 8rem;
  /* letter-spacing: -0.3rem; */
  position: relative;
}

h1[data-only]::after {
  font-weight: bold;
  content: attr(data-content);
  color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-clip-path: ellipse(100px 100px at 0% 50%);
  clip-path: ellipse(100px 100px at 0% 50%);
  animation: spotlight 5s infinite;
  background-image: linear-gradient(69.7deg, rgba(244, 37, 243, 1) 1.4%, rgba(244, 87, 1, 1) 36.2%, rgba(255, 204, 37, 1) 72.2%, rgba(20, 196, 6, 1) 113%);
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
}</style>