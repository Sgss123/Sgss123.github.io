<script setup>
</script>

<template>
  <div class="min-h-screen items-center flex flex-col mx-auto">
    <ul class="flex bg-slate-200 rounded px-8 py-4 text-lg w-full justify-center gap-x-8 max-w-5xl">
      <li><router-link to="/" class="text-blue-500 hover:(text-blue-700)">主页</router-link>
      </li>
      <li><router-link to="/about" class="text-blue-500 hover:(text-blue-700)">关于</router-link>
      </li>
      <li><router-link to="https://blog.waterspo.top" class="text-blue-500 hover:(text-blue-700)">Blog</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<style>
.router-link-active {
  --tw-text-opacity: 1;
  color: rgba(109, 40, 217, var(--tw-text-opacity));

}
</style>
