<template>
    <div class="navigation">
        <ul class="clearfix">
            <li @click="showArticle">Article</li>
            <!-- <li @click="showSnippet">Snippet</li>
            <li @click="showMood">Mood</li>
            <li @click="showAll">All</li> -->
            <li @click="showEditor" v-if="$store.state.data.isOwner">新建</li>
        </ul>
    </div>
</template>
<script>
export default {
    methods: {
        showArticle() {

        },
        showSnippet() {

        },
        showMood() {

        },
        showAll() {

        },
        showEditor() {
            this.$store.state.editor.show = 'article'
        }
    }
}
</script>
<style lang="less">
.navigation {
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    rgba(255, 255, 255, 0.9),
    rgba(255, 255, 255, 0.25)
  );
  ul {
    width: 80%;
    margin: 0 auto;
  }
  li {
    float: left;
    list-style: none;
    line-height: 50px;
    margin: 0 10px;
  }
}
</style>


