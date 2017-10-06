<template>
    <div>
        <article v-for="(item,index) in articles" :key="index" v-html="generateArticle(item)" class="article">
        </article>
    </div>
</template>
<script>
export default {
    data() {
        return {
            articles: []
        }
    },
    created() {
        this.dataService.getArticle({
            callback0: (data) => {
                console.log(data)
                this.articles = data
            }
        })
    },
    methods: {
        generateArticle: function(item) {
            let title = item.title ? '<h2>' + item.title + '</h2>' : ''
            let content = this.converter.makeHtml(item.content)
            return title + content
        }
    }
}
</script>
<style lang="less">
.article {
    margin: 30px 0;
    border-bottom: 2px dashed #eee;
}
</style>


