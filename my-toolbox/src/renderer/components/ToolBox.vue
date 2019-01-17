<template>
  <div class="tool-box">
    <div class="search-box">
      <input type="text" placeholder="搜索收藏内容">
    </div>
    <div class="btn-box">
      <button>新建收藏</button>
    </div>
    <div class="category">
      <div class="item">全部收藏</div>
      <div class="item">链接</div>
      <div class="item">相册</div>
      <div class="item">笔记</div>
      <div class="item">文件</div>
      <div class="item">音乐</div>
    </div>
    <div class="tag">
      <div class="item">标签</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ToolBox'
  }
</script>

<style scoped lang="scss">
  .tool-box {
    .search-box {
      input {
        background-color: #dbd9d8;
        border: none;
        margin: 0 auto;
        display: block;
        height: 25px;
        padding: 0 10px;
        border-radius: 3px;
        box-sizing: border-box;
      }
    }

    .btn-box {
      margin: 20px 0;
      text-align: center;

      button {
        height: 30px;
        width: 150px;
        background-color: white;
        border: none;
        border-radius: 5px;
      }
    }

    .category {
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;

      .item {
        height: 40px;
        line-height: 40px;
        padding-left: 20px;

        &:hover {
          background-color: #dddbda;
        }

        &.select {
          background-color: #c6c5c5;
        }
      }
    }

    .tag {
      .item {
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
      }
    }
  }
</style>
