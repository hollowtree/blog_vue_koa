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
        editArticle(item) {
            this.$store.state.editor = {
                show: 'article',
                data: item
            }

        },
        deleteArticle(id) {
            if (!id) {
                return
            }
            this.dataService.deleteArticle({
                params: {
                    id
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
.article {
    padding: 15px 0;
    // border-bottom: 2px dashed #adb5ad;
    border-bottom: 1px solid rgba(63, 135, 166, .7);
  .date {
    color: #ccc;
    font-size: 14px;
    font-weight: 300;
    font-style: italic;
  }
  hr {
    border-width: 0;
    &:after {
      content: "^^^^^";
      display: table;
      width: 100%;
      letter-spacing: 30px;
      text-align: center;
      opacity: 0.5;
    }
  }
  blockquote {
    border-left: 5px solid #aed2e2;
    background: rgba(115, 154, 171, 0.1);
    margin: 0;
    padding: 8px 24px;
  }
}
</style>


