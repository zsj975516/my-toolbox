<template>
  <div class="session-list">
    <div class="search-box">
      <input type="text" placeholder="搜索"><span>+</span>
    </div>
    <div class="list-box">

      <div class="group">
        <div class="title">新的朋友</div>
        <div class="list-item">
          <div class="avatar"></div>
          <div class="name">新的朋友</div>
        </div>
      </div>
      <div class="group">
        <div class="title">公众号</div>
        <div class="list-item">
          <div class="avatar"></div>
          <div class="name">公众号</div>
        </div>
      </div>
      <div class="group">
        <div class="title">群聊</div>
        <div class="list-item" v-for="i in 10">
          <div class="avatar"></div>
          <div class="name">用户名{{i}}</div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
  export default {
    name: 'ContactList'
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

      .group {
        border-bottom: 1px solid #ccc;

        .title {
          padding-left: 10px;
          color: #999;
          font-size: 12px;
          padding-top: 10px;
        }

        .list-item {
          height: $list-item-height;
          padding: 10px;
          cursor: default;

          .avatar {
            display: inline-block;
            height: $list-item-height;
            width: $list-item-height;
            background-color: #1677d2;
          }


          .name {
            display: inline-block;
            vertical-align: top;
            line-height: $list-item-height;
            color: #000;
            font-size: 14px;
          }

          &:hover {
            background-color: #bdbdbd;
          }

          &.select {
            background-color: #bdbdbd;
          }

        }
      }

    }
  }
</style>
