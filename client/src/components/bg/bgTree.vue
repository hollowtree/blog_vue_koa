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
.bg-tree {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: red;
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
.wl {
  background: #dbeef7;
  overflow: hidden;
}
.wn {
  background: url(//ssl.gstatic.com/ui/v1/icons/mail/images/2/5/tree/sunny/footer_bg.jpg)
    no-repeat 76px bottom;
}
.wo {
  background: url(//ssl.gstatic.com/ui/v1/icons/mail/images/2/5/tree/sunny/footer_tile.jpg)
    repeat-x bottom left;
}
.wq {
  background: url(//ssl.gstatic.com/ui/v1/icons/mail/images/2/5/tree/sunny/header_tile.gif)
    repeat-x;
}
.wp {
  background: url(//ssl.gstatic.com/ui/v1/icons/mail/images/2/5/tree/sunny/header_bg.jpg)
    no-repeat;
}
</style>

