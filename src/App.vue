<script setup>
import Header from "~/pages/Header.vue"
import Footer from "~/pages/Footer.vue"
</script>

<template>
  <div class="min-h-screen items-center flex flex-col mx-auto">
    <Header></Header>
    <main role="main">
      <router-view></router-view>
    </main>
    <Footer></Footer>
  </div>
</template>

<style></style>
