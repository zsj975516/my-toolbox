<template>
  <div class="home">
    <div class="win-title">
      <span class="btn">
        <div class="btn-control" @click="min">-</div>
        <div class="btn-control" @click="max">🧡</div>
        <div class="btn-control" @click="close">X</div>
      </span>
    </div>
    <div class="left">
      <div class="item"></div>
      <div class="item" :class="{'select':$route.name==='home-page-sessionlist'}"
           @click="handleRouter('sessionlist')"></div>
      <div class="item" :class="{'select':$route.name==='home-page-contactlist'}"
           @click="handleRouter('contactlist')"></div>
      <div class="item" :class="{'select':$route.name==='home-page-toolbox'}"
           @click="handleRouter('toolbox')"></div>
      <div class="item" :class="{'select':$route.name==='home-page-manager'}"
           @click="handleRouter('manager')"></div>
      <div class="item bottom" @click="showMenu"></div>
    </div>
    <div class="center">
      <router-view class="router-view" name="center"></router-view>
    </div>
    <div class="right">
      <router-view class="router-view" name="right"></router-view>
    </div>
    <div class="menu-list" v-show="isShowMenu">
      <div class="menu-item">意见反馈</div>
      <div class="menu-item">备份与恢复</div>
      <div class="menu-item">设置</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        isShowMenu: false,
        isMax: false
      }
    },
    created () {
      this.$electron.remote.getCurrentWindow().setSize(800, 600)
      this.$electron.remote.getCurrentWindow().center()
      this.$electron.remote.getCurrentWindow().setResizable(true)
      this.$electron.remote.getCurrentWindow().setMaximizable(true)

      this.$electron.remote.getCurrentWindow().on('maximize', evt => {
        this.isMax = true
      })
      this.$electron.remote.getCurrentWindow().on('unmaximize', evt => {
        this.isMax = false
      })
    },
    methods: {
      showMenu () {
        this.isShowMenu = !this.isShowMenu
      },
      handleRouter (route) {
        let paths = this.$route.path.split('/')
        paths[2] = route
        this.$router.replace(paths.join('/'))
      },
      min () {
        this.$electron.remote.getCurrentWindow().minimize()
      },
      max () {
        if (this.isMax) {
          this.$electron.remote.getCurrentWindow().unmaximize()
        } else {
          this.$electron.remote.getCurrentWindow().maximize()
        }
      },
      close () {
        this.$electron.remote.getCurrentWindow().close()
      }
    }
  }
</script>

<style scoped lang="scss">
  .home {
    font-size: 0;
    min-width: 710px;
    overflow-x: hidden;

    $left_width: 60px;
    $center_width: 250px;

    $win-title-height: 25px;

    $padding-top: calc(#{$win-title-height} - 15px);

    .left {
      position: relative;
      box-sizing: border-box;
      padding-top: $padding-top;
      vertical-align: top;
      display: inline-block;
      background-color: black;
      width: $left_width;
      height: 100%;
      -webkit-app-region: drag;

      .item {
        -webkit-app-region: no-drag;
        height: 30px;
        width: 30px;
        background-color: #8b8b8b;
        margin: 15px auto 0;
        cursor: pointer;

        /*&:nth-child(1) {*/
        /*margin-top: 0;*/
        /*}*/

        &.bottom {
          position: absolute;
          bottom: 15px;
          left: 0;
          right: 0;
          margin: 0 auto;
        }

        &.select {
          background-color: #09bb07;
        }
      }
    }

    .center {
      font-size: 14px;
      box-sizing: border-box;
      padding-top: $padding-top;
      vertical-align: top;
      display: inline-block;
      background-color: #e6e6e6;
      width: $center_width;
      height: 100%;

      & > .router-view {
        height: 100%;
        box-sizing: border-box;
      }
    }

    .right {
      font-size: 14px;
      box-sizing: border-box;
      padding-top: $padding-top;
      vertical-align: top;
      display: inline-block;
      background-color: #f5f5f5;
      width: calc(100% - #{$left_width} - #{$center_width});
      height: 100%;

      & > .router-view {
        height: 100%;
        box-sizing: border-box;
      }
    }

    .win-title {
      font-size: 14px;
      height: $win-title-height;
      overflow: hidden;
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      z-index: 1;
      -webkit-app-region: drag;
      /*background-color: rgba(0, 0, 0, 0.1);*/

      .btn {
        position: absolute;
        right: 0;
        top: 0;

        .btn-control {
          display: inline-block;
          width: $win-title-height;
          text-align: center;
          height: $win-title-height;
          line-height: $win-title-height;
          cursor: default;
          -webkit-app-region: no-drag;

          &:hover {
            background-color: grey;
          }
        }
      }
    }

    .menu-list {
      background-color: #27292c;
      position: fixed;
      left: $left_width;
      bottom: 30px;

      .menu-item {
        font-size: 14px;
        color: #8c8c8c;
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        width: 130px;
        cursor: default;

        &:hover {
          background-color: #303032;
        }
      }

    }
  }
</style>
