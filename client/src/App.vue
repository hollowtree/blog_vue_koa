<template>
    <div id="app">

        <navigation-bar></navigation-bar>
        <Editor v-if="$store.state.showEditor"></Editor>
        <router-view>
        </router-view>
    </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar'
import Editor from '@/components/Editor'

export default {
    name: 'app',
    created() {
    },
    components: {
        NavigationBar,
        Editor
    }
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 60px auto;
    width: 80%
}

button {
    padding: 2px 5px;
    background: #eee;
    border: none;
    outline: none;
    border-radius: 4px;
    min-height: 30px;
    min-width: 80px;
}
</style>
