<template>
    <div class="editor">
        <p><input type="text" placeholder="Title:" class="title" v-model="title"></p>
        <textarea placeholder="Content:" v-model="content"></textarea>
        <p>
            <button @click="cancelArticle">取消</button>
            <button @click="postArticle">提交</button>
        </p>
    </div>
</template>

<script>
export default {
    name: 'hello',
    data() {
        return {
            title: '',
            content: ''
        }
    },
    created() {
    },
    methods: {
        cancelArticle: function() {
            this.$store.state.showEditor = false
        },
        postArticle: function() {
            if (!this.title.trim() || !this.content.trim()) {
                return
            }
            this.dataService.postArticle({
                page: 1,
                params: {
                    title: this.title,
                    content: this.content
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.editor {
    position: fixed;
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
