<template>
  <div class="login">
    <div class="login-bg" ref="loginBg">
      <div class="btn-control" @click="min">-</div>
      <div class="btn-control" @click="min">X</div>
      <div class="loading-text">{{loadingText}}</div>
    </div>
    <div class="login-box">
      <div class="item">
        <span class="label">用户名：</span>
        <input type="text" v-model="username">
      </div>
      <div class="item">
        <span class="label">密码：</span>
        <input type="password" v-model="password">
      </div>
      <div class="item">
        <button @click="login">登录</button>
      </div>
      <div class="item">
        <label><input type="checkbox" v-model="autoLogin">自动登录</label>
        <label><input type="checkbox" v-model="rememberPassword">记住密码</label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        loadingText: '',
        username: '',
        password: '',
        autoLogin: false,
        rememberPassword: false
      }
    },
    created () {
      this.$electron.remote.getCurrentWindow().setSize(400, 300)
      this.$electron.remote.getCurrentWindow().center()
      this.$electron.remote.getCurrentWindow().setResizable(false)
      this.$electron.remote.getCurrentWindow().setMaximizable(false)
      let loginSetting = JSON.parse(localStorage.getItem('login-setting')) || {
        username: '',
        password: '',
        autoLogin: false,
        rememberPassword: false
      }
      this.autoLogin = loginSetting.autoLogin
      this.rememberPassword = loginSetting.rememberPassword
      this.username = loginSetting.username
      this.password = loginSetting.password
    },
    watch: {
      autoLogin (autoLogin) {
        if (autoLogin) this.rememberPassword = true
      },
      rememberPassword (rememberPassword) {
        if (!rememberPassword) this.autoLogin = false
      }
    },
    mounted () {
      if (this.logout || !this.password) {
        this.password = ''
        this.rememberPassword = false
        this.autoLogin = false
        this.saveSetting()
      }
      if (this.autoLogin) this.login()
    },
    props: {
      logout: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      saveSetting () {
        localStorage.setItem('login-setting', JSON.stringify({
          username: this.username,
          password: this.rememberPassword ? this.password : '',
          autoLogin: this.autoLogin,
          rememberPassword: this.rememberPassword
        }))
      },
      async login () {
        let loginBg = this.$refs.loginBg
        try {
          loginBg.style.height = '100%'
          this.loadingText = '登录。。。'
          await this.$api.login({username: this.username, password: this.password})
          this.saveSetting()
          console.log('登录成功')
          this.$router.replace('/home')
        } catch (e) {
          console.error(e)
        } finally {
          this.loadingText = ''
          loginBg.style.height = '50%'
        }
      },
      min () {
        this.$electron.remote.getCurrentWindow().minimize()
      }
    }
  }
</script>

<style scoped lang="scss">
  .login {

    .login-bg {
      height: 50%;
      width: 100%;
      background-color: #9bb7d6;
      position: absolute;
      -webkit-app-region: drag;
      top: 0;
      left: 0;
      transition-duration: 500ms;
      z-index: 2;

      .btn-control {
        position: absolute;
        right: 0;
        height: 30px;
        width: 30px;
        text-align: center;
        line-height: 30px;
        -webkit-app-region: no-drag;
        cursor: default;

        &:nth-child(1) {
          right: 30px;
        }

        &:hover {
          background-color: grey;
          color: #fff;
        }
      }

      .loading-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 25px;
      }
    }

    .login-box {
      position: absolute;
      z-index: 1;
      top: 50%;
      height: 50%;
      width: 100%;
      background-color: #e6edf5;

      .item {
        $label_width: 60px;
        font-size: 0;
        padding: 0 70px;
        margin-top: 10px;
        text-align: center;

        user-select: none;
        cursor: default;

        .label {
          display: inline-block;
          width: $label_width;
          font-size: 14px;
          text-align: left;
        }

        & > input {
          width: calc(100% - #{$label_width});
          font-size: 14px;
          box-sizing: border-box;
          text-align: left;
          height: 25px;
          padding: 0 10px;
        }

        button {
          width: 60%;
          height: 30px;
          border-radius: 5px;
          border: none;
          outline: none;
          background-color: #acd9f8;

          &:hover {
            opacity: .5;
            color: white;
          }
        }

        label {
          text-align: left;
          font-size: 14px;

          &:nth-child(2) {
            margin-left: 80px;
          }
        }
      }
    }
  }
</style>
