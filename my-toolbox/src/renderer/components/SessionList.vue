<template>
  <div class="session-list">
    <div class="search-box">
      <input type="text" placeholder="搜索"><span>+</span>
    </div>
    <div class="list-box">
      <div class="list-item" v-for="i in 10">
        <div class="avatar"></div>
        <div class="info">
          <div class="name">阿斯顿噶啥的嘎</div>
          <div class="msg">阿斯顿噶大哥</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SessionList'
  }
</script>

<style scoped lang="scss">
  .session-list {

    user-select: none;
    $search-box-height: 25px;

    .search-box {
      height: $search-box-height;
      padding: 15px 0;

      input {
        height: $search-box-height;
        width: calc(100% - 30px - #{$search-box-height});
        box-sizing: border-box;
        margin-left: 10px;
        background-color: #dcd9d8;
        border: none;
        outline: none;
        padding: 0 10px;
      }

      span {
        margin-left: 10px;
        display: inline-block;
        width: $search-box-height;
        height: $search-box-height;
        background-color: #dcd9d8;
        text-align: center;
        line-height: $search-box-height;
      }
    }

    .list-box {
      height: calc(100% - #{$search-box-height} - 30px);
      overflow-y: auto;

      $list-item-height: 40px;

      .list-item {
        height: $list-item-height;
        padding: 10px;
        cursor: default;

        .avatar {
          display: inline-block;
          height: $list-item-height;
          width: $list-item-height;
          background-color: #ba8d76;
        }

        .info {
          display: inline-block;
          vertical-align: top;

          .name {
            color: #000;
            font-size: 14px;
          }

          .msg {
            color: #999;
            font-size: 14px;
            margin-top: 8px;
          }
        }

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
