<template>
    <div class="hello">
        <textarea v-model="article"></textarea>
        <button @click="postArticle">提交</button>
        <template v-for="(item,index) in articles">
            <div :key="index" v-html="converter.makeHtml(item.content)"></div>
        </template>
    </div>
</template>

<script>
export default {
    name: 'hello',
    data() {
        return {
            article: '6789',
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
        postArticle: function() {
            this.dataService.postArticle({
                page: 1,
                params: {
                    content: this.article,
                    page: 1
                }
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
