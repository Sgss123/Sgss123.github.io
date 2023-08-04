<template>
    <div>
        <el-result icon="error" title="网页未找到" sub-title="错误代码：404 Not Found">
            <template #extra>
                <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
            </template>
        </el-result>
    </div>
</template>