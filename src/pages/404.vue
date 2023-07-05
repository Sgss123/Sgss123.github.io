<template>
    <div>
        <el-result icon="error" title="遇到错误" sub-title="错误代码：404 Not Found">
            <template #extra>
                <el-button type="primary" @click="$router.push('/')">Back</el-button>
            </template>
        </el-result>
    </div>
</template>