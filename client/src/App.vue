<template>
    <div id="app">
        <router-view>
        </router-view>
        <bg-tree></bg-tree>
    </div>
</template>

<script>
import bgTree from './components/bg/bgTree'
export default {
    name: 'app',
    created() {
        console.log(document.cookie)
        if (localStorage.getItem('isOwner')) {
            this.$store.state.data.isOwner = true
        }
    },
    components: {
        bgTree
    }
}
</script>

<style lang="less">
#app {
  font-family: "Lato", "Avenir", Helvetica, "Microsoft YaHei", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //   color: #2c3e50;
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

.clearfix {
  &:before,
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}
</style>
