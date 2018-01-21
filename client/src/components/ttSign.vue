<template>
    <div class="sign">
        <div v-if="this.show == 'login'">
            <p><input type="text" name="username" placeholder="Email:" v-model="logIn.email"></p>
            <p><input type="password" name="password" placeholder="Password:" v-model="logIn.passwd"></p>
            <p>
                <button @click="postLogIn">登录</button>
            </p>
            <p class="tip">
                <!-- <span>忘记密码？</span> -->
                <span @click="jumpToSignUp">←去注册</span>
            </p>
        </div>
        <div v-else>
            <p><input type="text" placeholder="Username:" v-model="signUp.username"></p>
            <p><input type="text" placeholder="Email:" v-model="signUp.email"></p>
            <p><input type="text" placeholder="Password:" v-model="signUp.passwd"></p>
            <p>
                <button @click="postSignUp">注册</button>
            </p>
            <p class="tip">
                <!-- <span>忘记密码？</span> -->
                <span @click="jumpToLogIn">←去登录</span>
            </p>
        </div>
    </div>
</template>
<script>
import ArticleEditor from './editors/ArticleEditor'
export default {
    data() {
        return {
            show: 'login',
            signUp: {
                username: null,
                email: null,
                passwd: null
            },
            logIn: {
                email: null,
                passwd: null
            }
        }
    },
    components: {
        ArticleEditor
    },
    created() {

    },
    methods: {
        jumpToSignUp: function () {
            this.show = 'signup'
        },
        jumpToLogIn: function () {
            this.show = 'login'
        },
        postSignUp: function (item) {
            if (!this.signUp.username || !this.signUp.email || !this.signUp.passwd) {
                return
            }
            this.dataService.postSignUp({
                params: {
                    username: this.signUp.username,
                    email: this.signUp.email,
                    passwd: this.signUp.passwd
                },
                callback0: () => {
                    this.$store.state.editor.show = ''
                    this.$store.state.editor.data = {}
                    this.show = 'login'
                }
            })
        },
        postLogIn: function () {
            if (!this.logIn.email || !this.logIn.passwd) {
                return
            }
            this.dataService.postLogIn({
                params: {
                    email: this.logIn.email,
                    passwd: this.logIn.passwd
                },
                callback0: (data) => {
                    this.$store.state.editor.show = ''
                    this.$store.state.editor.data = {}
                    if (data.code === 0) {
                        this.$router.push('/')
                        this.$store.state.data.isOwner = true
                        localStorage.setItem('isOwner', true)
                    }
                }
            })
        }
    }
}
</script>
<style lang="less">
.sign {
  position: absolute;
  width: 200px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 10px #bbb;
  border-radius: 10px;
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
  button {
    width: 100%;
  }
  .tip {
    cursor: pointer;
    font-size: 12px;
    color: #999;
    // span:last-child {
    //   float: right;
    // }
  }
}
</style>


