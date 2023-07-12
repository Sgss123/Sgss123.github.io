<script>
</script>

<template>
    <div class="min-h-screen items-center flex flex-col mx-auto">
        <ul class="flex bg-slate-200 rounded px-8 py-4 text-lg w-full justify-center gap-x-8 max-w-5xl">
            <li><a href="/#/" class="text-blue-500 hover:(text-blue-700)">主页</a></li>
            <li><a href="/#/about" class="text-blue-500 hover:(text-blue-700)">关于</a></li>
            <li><a href="https://blog.waterspo.top" class="text-blue-500 hover:(text-blue-700)">Blog</a></li>
        </ul>
        <router-view></router-view>
    </div>
</template>
