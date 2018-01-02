<template>
    <div id="app">
        <router-view>
        </router-view>
        <canvas id="canvas"></canvas>
    </div>
</template>

<script>
import snow from './utils/snow'
export default {
    name: 'app',
    created() {
        console.log(document.cookie)
        if (/token/.test(document.cookie)) {
            this.$store.state.data.isOwner = true
        }
    },
    mounted() {
        snow()
    },
    components: {
    }
}
</script>

<style lang="less">
body {
  background: #111;
}
#app {
  font-family: "Lato", "Avenir", Helvetica, "Microsoft YaHei", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //   color: #2c3e50;
  color: #aaa;
  margin: 60px auto;
  width: 80%;
}

button {
  padding: 2px 5px;
  margin-right: 3px;
  background: #eee;
  border: none;
  outline: none;
  border-radius: 4px;
  min-height: 30px;
  min-width: 80px;
  cursor: pointer;
  &.small {
    min-height: 24px;
    min-width: 60px;
  }
}
canvas {
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
}
</style>
