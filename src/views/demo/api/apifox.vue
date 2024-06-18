<!-- 接口文档 -->
<template>
  <div class="app-container">
    <iframe src="https://apifox.com/apidoc/shared-aeac2eb5-398b-4bca-8ff7-3e7bfce5be79" width="100%" height="100%"
      frameborder="0"></iframe>
  </div>
</template>

<style lang="scss" scoped>
/** 关闭tag标签  */
.app-container {
  /* 50px = navbar = 50px */
  height: calc(100vh - 50px);
}

/** 开启tag标签  */
.hasTagsView {
  .app-container {
    /* 84px = navbar + tags-view = 50px + 34px */
    height: calc(100vh - 84px);
  }
}
</style>
