<template>
  <div>
    <el-result icon="error" sub-title="错误代码：404 Not Found" title="网页未找到">
      <template #extra>
        <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
      </template>
    </el-result>
  </div>
</template>