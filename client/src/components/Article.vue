<template>
    <div>
        <article-editor></article-editor>
        <navigation-bar></navigation-bar>
        <section>
            <article v-highlight v-for="(item,index) in articles" :key="index" class="article">
                <h2 v-if="item.title">{{item.title}}</h2>
                <p class="date" v-html="formatDate(item.createdAt)"></p>
                <div v-html="converter.makeHtml(item.content)">
                </div>
                <p v-if="item.id && $store.state.data.isOwner">
                    <button class="small" @click="editArticle(item)">编辑</button>
                    <button class="small" @click="deleteArticle(item.id)">删除</button>
                </p>
            </article>
        </section>
    </div>
</template>
<script>
import ArticleEditor from './editors/ArticleEditor'
import NavigationBar from '@/components/NavigationBar'

export default {
    data() {
        return {
            editorData: {},
            articles: []
        }
    },
    components: {
        ArticleEditor,
        NavigationBar

    },
    created() {
        this.dataService.getArticle({
            callback0: (data) => {
                // console.log(data)
                this.articles = data
            }
        })
    },
    methods: {
        editArticle: function (item) {
            this.$store.state.editor = {
                show: 'article',
                data: item
            }

        },
        deleteArticle: function (id) {
            if (!id) {
                return
            }
            this.dataService.deleteArticle({
                params: {
                    id: id
                },
                callback0: () => {
                    this.$store.state.editor.show = ''
                    this.$store.state.editor.data = {}
                }
            })
        },
        formatDate(date) {
            return new Date(date).toLocaleTimeString('chinese', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour12: false,
                formatMatcher: 'basic'
            })
        }
    }
}
</script>
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

.article {
  margin: 30px 0;
  border-bottom: 2px dashed #333;
  .date {
    color: #ccc;
    font-size: 14px;
    font-weight: 300;
    font-style: italic;
  }
}
pre {
  padding: 16px;
  font-size: 85%;
  line-height: 1.45;
  //   background-color: #f6f8fa;
  //   background-color: rgba(246, 248, 250, 0.4);
  background-color: #222;
  border-radius: 3px;
}
</style>


