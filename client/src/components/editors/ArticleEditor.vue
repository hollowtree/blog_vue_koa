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
        cancelArticle: function() {
            this.$store.state.editor.show = ''
            this.$store.state.editor.item = {}
        },
        postArticle: function() {
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

