<style lang="less">
.editor {
  position: fixed;
  z-index: 10;
  top: 60px;
  right: 10%;
  bottom: 60px;
  left: 10%;
  background: rgba(255, 255, 255, 0.95); // border: 1px dotted #666;
  box-shadow: 0 0 100px #bbb;
  padding: 20px 50px;
  input,
  textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 3px 10px;
    border: none;
    outline: none;
  }
  .title {
    height: 50px;
    border-bottom: 1px dotted #999;
  }
  textarea {
    height: 80%;
    margin: 20px 0;
    resize: none;
    border-bottom: 1px dotted #999;
  }
}
</style>

<template>
    <div class="editor" v-if="$store.state.editor.show == 'article'">
        <p><input type="text" placeholder="Title:" class="title" v-model="$store.state.editor.data.title"></p>
        <textarea placeholder="Content:" v-model="$store.state.editor.data.content"></textarea>
        <p>
            <button @click="cancelArticle">取消</button>
            <button @click="postArticle">提交</button>
        </p>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    created() {
    },
    methods: {
        cancelArticle: function () {
            this.$store.state.editor.show = ''
            this.$store.state.editor.item = {}
        },
        postArticle: function () {
            if (!/\S/.test(this.$store.state.editor.data.title) || !/\S/.test(this.$store.state.editor.data.content)) {
                return
            }
            this.dataService.postArticle({
                page: 1,
                params: {
                    id: this.$store.state.editor.data.id || null,
                    title: this.$store.state.editor.data.title,
                    content: this.$store.state.editor.data.content
                },
                callback0: () => {
                    this.$store.state.editor.show = ''
                    this.$store.state.editor.data = {}
                }
            })
        }
    }
}
</script>

