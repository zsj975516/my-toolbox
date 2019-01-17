<template>
  <div id="app">
    <router-view class="router-view"></router-view>
    <context-menu ref="contextMenu"></context-menu>
  </div>
</template>

<script>
  import ContextMenu from './components/ContextMenu.vue'

  export default {
    name: 'my-toolbox',
    components: {ContextMenu},
    async mounted () {
      // console.log(await this.$api.getUser({id: 2}))
      // console.log(await this.$api.updateUser({id: 3, password: '123456'}))

      // console.log(await this.$api.addUser({username: 'admin', password: '11111111'}))
    }
  }
</script>

<style lang="scss">
  html, body {
    margin: 0;
    padding: 0;
  }

  #app {
    & > .router-view {
      height: 100vh;
      width: 100vw;
      box-sizing: border-box;
    }
  }

  /* CSS */
</style>
