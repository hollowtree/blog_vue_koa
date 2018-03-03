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
        // console.log(document.cookie)
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
body {
  -webkit-overflow-scrolling: touch;
}
#app {
  font-family: "Lato", "Avenir", Helvetica, "Microsoft YaHei", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #555;
  //   color: #2c3e50;
  margin: 60px auto;
  width: e("calc(100% - 10px)");
}
@media (min-width: 576px) {
  #app {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  #app {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  #app {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  #app {
    max-width: 1140px;
  }
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
a {
  color: inherit;
}
p {
  margin: 0;
}
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
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
