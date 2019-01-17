<template>
  <div class="chat-interface">
    <div class="top">
      <div class="name">群聊(3)</div>
      <div class="btn">···</div>
    </div>
    <div class="middle">
      <div class="msg-item">
        <div class="time">
          <div class="time-text">16:09</div>
        </div>
        <div class="msg-info">
          <div class="avatar"></div>
          <div class="content">
            <div class="username">用户</div>
            <div class="msg">上的噶似的噶似的噶似的嘎撒大噶上的噶山豆根是的光和热特瑞特也让掐头去尾特瑞特问题</div>
          </div>
          <div class="avatar right"></div>
        </div>
      </div>
      <div class="msg-item">
        <div class="time">
          <div class="time-text">16:09</div>
        </div>
        <div class="msg-info send">
          <div class="avatar"></div>
          <div class="content">
            <div class="username">用户</div>
            <div class="msg">上的噶似的噶似的噶似的嘎撒大噶上的噶山豆根是的光和热特瑞特也让掐头去尾特瑞特问题</div>
          </div>
          <div class="avatar right"></div>
        </div>
      </div>
      <div class="msg-item">
        <div class="time" v-if="false">
          <div class="time-text">16:09</div>
        </div>
        <div class="msg-info">
          <div class="avatar"></div>
          <div class="content">
            <div class="username">用户</div>
            <div class="msg">上的噶似的噶似的噶似的嘎撒大噶上的噶山豆根是的光和热特瑞特也让掐头去尾特瑞特问题</div>
          </div>
          <div class="avatar right"></div>
        </div>
      </div>
      <div class="msg-item">
        <div class="time" v-if="false">
          <div class="time-text">16:09</div>
        </div>
        <div class="msg-info send">
          <div class="avatar"></div>
          <div class="content">
            <div class="username">用户</div>
            <div class="msg">上的噶似的噶似的噶似的嘎撒大噶上的噶山豆根是的光和热特瑞特也让掐头去尾特瑞特问题</div>
          </div>
          <div class="avatar right"></div>
        </div>
      </div>
      <div class="msg-item">
        <div class="time" v-if="false">
          <div class="time-text">16:09</div>
        </div>
        <div class="msg-info">
          <div class="avatar"></div>
          <div class="content">
            <div class="username">用户</div>
            <div class="msg">上的噶似的噶似的噶似的嘎撒大噶上的噶山豆根是的光和热特瑞特也让掐头去尾特瑞特问题</div>
          </div>
          <div class="avatar right"></div>
        </div>
      </div>
      <div class="msg-item">
        <div class="time" v-if="false">
          <div class="time-text">16:09</div>
        </div>
        <div class="msg-info send">
          <div class="avatar"></div>
          <div class="content">
            <div class="username">用户</div>
            <div class="msg">上的噶似的噶似的噶似的嘎撒大噶上的噶山豆根是的光和热特瑞特也让掐头去尾特瑞特问题</div>
          </div>
          <div class="avatar right"></div>
        </div>
      </div>
      <div class="msg-item">
        <div class="time">
          <div class="time-text">16:09</div>
        </div>
        <div class="msg-info">
          <div class="avatar"></div>
          <div class="content">
            <div class="username">用户</div>
            <div class="msg">上的噶似的噶似的噶似的嘎撒大噶上的噶山豆根是的光和热特瑞特也让掐头去尾特瑞特问题</div>
          </div>
          <div class="avatar right"></div>
        </div>
      </div>
      <div class="msg-item">
        <div class="time">
          <div class="time-text">16:09</div>
        </div>
        <div class="msg-info send">
          <div class="avatar"></div>
          <div class="content">
            <div class="username">用户</div>
            <div class="msg">上的噶似的噶似的噶似的嘎撒大噶上的噶山豆根是的光和热特瑞特也让掐头去尾特瑞特问题</div>
          </div>
          <div class="avatar right"></div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="toolbox">
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <span class="item right"></span>
        <span class="item right"></span>
      </div>
      <div class="editor" contenteditable="true"></div>
      <div class="btnbox">
        <button>发送</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ChatInterface'
  }
</script>

<style scoped lang="scss">
  .chat-interface {

    .top {
      height: 55px;
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      position: relative;
      padding: 0 25px;

      .name {
        line-height: 55px;
        font-size: 20px;
        user-select: none;
        cursor: pointer;
        display: inline-block;
      }

      .btn {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 20px;
        font-weight: bolder;
        line-height: 55px;
        user-select: none;
        cursor: pointer;
        padding: 0 20px;
      }
    }

    .middle {
      height: calc(100% - 185px);
      border-bottom: 1px solid #ccc;
      box-sizing: border-box;
      position: relative;
      padding: 0 25px;
      overflow-y: auto;

      .msg-item {
        margin-top: 10px;
        margin-bottom: 10px;

        .time {
          text-align: center;
          margin: 5px 0;

          .time-text {
            display: inline-block;
            background-color: #dadada;
            color: white;
            padding: 5px;
            border-radius: 3px;
            box-sizing: border-box;
          }
        }

        .msg-info {
          font-size: 0;
          position: relative;

          .avatar {
            display: inline-block;
            height: 30px;
            width: 30px;
            background-color: #ad8541;

            &.right {
              display: none;
            }
          }

          .content {
            display: inline-block;
            max-width: calc(100% - 70px);
            vertical-align: top;

            .username {
              font-size: 14px;
              margin-left: 10px;
              margin-right: 10px;
            }

            .msg {
              font-size: 14px;
              background-color: white;
              padding: 5px 10px;
              width: calc(100% - 20px);
              margin: 5px 10px 0;
              line-height: 25px;
              box-sizing: border-box;
              position: relative;

              &::before {
                content: ' ';
                height: 0;
                width: 0;
                border: 5px solid white;
                border-color: transparent white transparent transparent;
                position: absolute;
                top: 5px;
                left: -10px;
              }
            }
          }

          &.send {
            text-align: right;

            .avatar {
              display: none;

              &.right {
                display: inline-block;
              }
            }

            .content {
              text-align: right;

              .msg {
                text-align: left;

                &::before {
                  border-color: transparent transparent transparent white;
                  left: auto;
                  right: -10px;
                }
              }
            }
          }

        }
      }
    }

    .bottom {
      height: 130px;
      box-sizing: border-box;
      position: relative;
      padding: 0 25px;

      .toolbox {
        height: 40px;
        position: relative;
        font-size: 0;

        .item {
          margin-top: 10px;
          margin-right: 10px;
          background-color: #636363;
          height: 20px;
          width: 20px;
          display: inline-block;
          cursor: pointer;

          &.right {
            position: absolute;
            right: 0;
            top: 0;
          }

          &.right:nth-of-type(1) {
            right: 25px;
          }
        }
      }

      .editor {
        height: calc(100% - 75px);
        outline: none;
        overflow-y: auto;
      }

      .btnbox {
        height: 35px;
        text-align: right;

        button {
          margin-right: 8px;
          width: 70px;
          height: 25px;
          margin-top: 3px;
          background-color: #f5f5f5;
          border: 1px solid #ccc;
          box-sizing: border-box;

          &:hover {
            background-color: #09bb07;
            border-color: #09bb07;
            color: white;
          }
        }
      }
    }
  }

</style>
