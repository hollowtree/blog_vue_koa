<template>
    <div class="navigation">
        <ul class="clearfix">
            <li>
                <router-link to="/">Article</router-link>
            </li>
            <!-- <li @click="showSnippet">Snippet</li>
            <li @click="showMood">Mood</li>
            <li @click="showAll">All</li> -->
            <li>
                <router-link to="/music">Music</router-link>
            </li>

            <li @click="showEditor" v-if="$store.state.data.isOwner">新建</li>
        </ul>
    </div>
</template>
<script>
export default {
    methods: {
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
    width: 100%;
    margin: 0 auto;
  }
  @media (min-width: 576px) {
    ul {
      max-width: 540px;
    }
  }

  @media (min-width: 768px) {
    ul {
      max-width: 720px;
    }
  }

  @media (min-width: 992px) {
    ul {
      max-width: 960px;
    }
  }

  @media (min-width: 1200px) {
    ul {
      max-width: 1140px;
    }
  }
  li {
    float: left;
    list-style: none;
    line-height: 50px;
    margin: 0 5px;
    padding: 0 10px;
    cursor: pointer;
    a {
      text-decoration: none;
    }
    &:hover {
      background: #fff;
    }
  }
}
</style>


