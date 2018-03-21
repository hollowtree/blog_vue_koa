<template>
    <div class="bg-tree">
        <div class="wl"></div>
        <div class="wq"></div>
        <div class="wp"></div>
        <div class="wo"></div>
        <div class="wn"></div>
    </div>
</template>
<style lang="less">
body {
  background: #dbeef7;
}
.bg-tree {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}
.wl,
.wn,
.wo,
.wp,
.wq {
  position: fixed;
  width: 100%;
  height: 100%;
}
// .wl {
//   background: #dbeef7;
//   overflow: hidden;
// }
.wn {
  background: url(//wx1.sinaimg.cn/large/006p0t5Agy1fplhjfddywj303l02ywed.jpg)
    no-repeat 76px bottom;
}
.wo {
  background: url(//wx3.sinaimg.cn/large/006p0t5Agy1fplhjlqw8mj309803mq2q.jpg)
    repeat-x bottom left;
}
.wq {
  background: url(//wx2.sinaimg.cn/large/006p0t5Agy1fplhjwrzqfg300a08b741.gif)
    repeat-x;
}
.wp {
  background: url(//wx3.sinaimg.cn/large/006p0t5Agy1fplhjr7jbvj30ap08b0sl.jpg)
    no-repeat;
}
</style>

