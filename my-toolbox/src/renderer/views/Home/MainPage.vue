<template>
  <div class="mainpage">
    <button @click="logout">注销</button>
    <button>新增用户</button>
  </div>
</template>

<script>
  export default {
    name: 'MainPage',
    methods: {
      logout () {
        this.$router.replace({name: 'login-page', params: {logout: true}})
      }
    }
  }
</script>

<style scoped lang="scss">
  .mainpage {
    background-color: #f3f3f3;
  }
</style>
