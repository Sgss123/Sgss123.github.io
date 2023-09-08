<script setup>
</script>
<template>
    <ul class="flex bg-slate-200 rounded px-8 py-4 text-lg w-full justify-center gap-x-8 max-w-5xl sticky">
        <li><router-link to="/" class="text-blue-500 hover:(text-blue-700)">主页</router-link>
        </li>
        <li><router-link to="/about" class="text-blue-500 hover:(text-blue-700)">关于</router-link>
        </li>
        <li><router-link to="/blog" class="text-blue-500 hover:(text-blue-700)">Blog</router-link>
        </li>
    </ul>
</template>
<style>
.router-link-active {
    --tw-text-opacity: 1;
    color: rgba(109, 40, 217, var(--tw-text-opacity));
}
</style>