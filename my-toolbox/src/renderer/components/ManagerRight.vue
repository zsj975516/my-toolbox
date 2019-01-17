<template>
  <div class="manager-right">
    <div class="new-user" v-if="managerType==='new-user'">
      <div class="item">
        <span class="label">头像</span>
        <el-upload
          class="avatar-uploader"
          :action="`http://${$api.config.serverIp}:${$api.config.serverPort}/api/updateFile`"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="avatar" :src="prefix_avatar+avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <div class="item">
        <span class="label">用户名</span>
        <input v-model="username">
      </div>
      <div class="item">
        <span class="label">密码</span>
        <input v-model="password">
      </div>
      <div class="item">
        <span class="label">性别</span><label>
        <input v-model="sex" value="1" type="radio">男</label>
        <label><input v-model="sex" value="0" type="radio">女</label>
      </div>
      <div class="item">
        <button @click="addUser">确定</button>
      </div>
    </div>
    <div class="all-user" v-if="managerType==='all-user'">
      <div class="user-list-header">
        <div class="user-id">ID</div>
        <div class="user-avatar">头像</div>
        <div class="user-name">用户名</div>
        <div class="user-sex">性别</div>
      </div>
      <div class="user-list">
        <div class="user-item" @contextmenu="handleContextMenu(user)" :key="user.id" v-for="user in userList">
          <div class="user-id">{{user.id}}</div>
          <div class="user-avatar">
            <img v-if="user.avatar" :src="prefix_avatar+user.avatar" class="avatar">
          </div>
          <div class="user-name">{{user.username}}</div>
          <div class="user-sex">{{user.sex}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import mixins from '../mixins/contextmenu'

  export default {
    name: 'ManagerRight',
    data () {
      return {
        avatar: '',
        prefix_avatar: `http://${this.$api.config.serverIp}:${this.$api.config.serverPort}/api/downloadFile?filePath=`,
        username: '',
        password: '',
        sex: '1', // 0女，1男
        userList: []
      }
    },
    mixins: [mixins],
    computed: {
      ...mapState({
        managerType: state => state.Manager.type
      })
    },
    watch: {
      managerType (val) {
        if (val === 'all-user') this.loadAllUser()
      }
    },
    mounted () {
      if (this.managerType === 'all-user') this.loadAllUser()
    },
    methods: {
      handleContextMenu (item) {
        let contextmenu = [
          {
            label: '删除',
            icon: '',
            show: true,
            click: ev => {
              console.log('点击了', item)
              this.deleteUser(item)
            }
          }
        ]
        this.showContextMenu(contextmenu)
      },
      async deleteUser (item) {
        try {
          await this.$api.deleteUser(item)
          let index = this.userList.findIndex(_item => _item === item)
          if (index > -1) this.userList.splice(index, 1)
        } catch (e) {
          console.error(e)
        }
      },
      async loadAllUser () {
        this.userList = await this.$api.getUser()
      },
      handleAvatarSuccess (res, file) {
        this.avatar = res.data[0].path
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      async addUser () {
        try {
          if (!this.username) throw new Error('用户名为空！')
          if (!this.password) throw new Error('密码为空！')
          await this.$api.addUser({
            username: this.username,
            password: this.password,
            sex: this.sex,
            avatar: this.avatar
          })
          this.username = ''
          this.password = ''
          this.sex = '1'
          this.avatar = ''
        } catch (e) {
          console.error(e)
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .manager-right {
    padding-top: 20px;

    .new-user {
      $label-width: 60px;

      .item {
        padding-left: 20px;
        margin-top: 10px;

        .label {
          display: inline-block;
          width: $label-width;
          vertical-align: top;
        }

        .avatar-uploader {
          display: inline-block;
          height: 100px;
          width: 100px;
          overflow: hidden;
          box-sizing: border-box;

          .avatar {
            width: 100px;
            height: 100px;
          }

          .avatar-uploader-icon {
            font-size: 40px;
            display: inline-block;
            border: 1px solid #ccc;
            box-sizing: border-box;
            width: 100px;
            height: 100px;
            line-height: 100px;
          }
        }
      }
    }

    .all-user {
      height: 100%;

      .user-list {
        height: calc(100% - 30px);
        overflow-y: auto;

        .user-item {
          height: 40px;
          font-size: 0;
          border-bottom: 1px solid #ccc;

          &:nth-child(1) {
            border-top: 1px solid #ccc;
          }

          .user-avatar {
            display: inline-block;
            height: 100%;
            width: 40px;
            vertical-align: top;

            .avatar {
              height: 100%;
              width: 100%;
            }
          }

          .user-name {
            display: inline-block;
            line-height: 40px;
            vertical-align: top;
            width: calc(100% - 120px);
            font-size: 14px;
          }

          .user-id {
            display: inline-block;
            line-height: 40px;
            vertical-align: top;
            width: 40px;
            font-size: 14px;
            text-align: center;
          }

          .user-sex {
            display: inline-block;
            line-height: 40px;
            vertical-align: top;
            width: 40px;
            font-size: 14px;
            text-align: center;
          }
        }
      }

      .user-list-header {
        font-size: 0;
        height: 30px;
        line-height: 30px;

        .user-avatar {
          display: inline-block;
          width: 40px;
        }

        .user-sex {
          display: inline-block;
          width: 40px;
          /*text-align: center;*/
          font-size: 14px;

        }

        .user-id {
          display: inline-block;
          width: 40px;
          text-align: center;
          font-size: 14px;

        }

        .user-name {
          display: inline-block;
          width: calc(100% - 120px);
          font-size: 14px;

        }
      }
    }

  }
</style>
