<template>
  <div class="manager">
    <div class="list-box">
      <div class="item" :class="{'select':managerType==='new-user'}" @click="handleClick('new-user')">新增用户</div>
      <div class="item" :class="{'select':managerType==='all-user'}" @click="handleClick('all-user')">所有用户</div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'Manager',
    computed: {
      ...mapState({
        managerType: state => state.Manager.type
      })
    },
    methods: {
      handleClick (type) {
        this.$store.commit('SET_MANAGER_TYPE', type)
      }
    }
  }
</script>

<style scoped lang="scss">
  .manager {
    .list-box {
      padding-top: 20px;

      .item {
        height: 40px;
        line-height: 40px;
        padding: 10px;
        cursor: default;
        user-select: none;

        &:hover {
          background-color: #dad9d9;
        }

        &.select {
          background-color: #cbcaca;
        }
      }
    }
  }

</style>
