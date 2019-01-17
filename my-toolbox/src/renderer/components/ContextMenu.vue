<template>
  <div class="rootNode"
       :ref="ref"
       :class="{hide:!isShow}"
       @pointerdown.stop.prevent="{}">
    <div @click="itemClick(item,$event)" @pointerdown.stop.prevent="{}"
         v-show="item.show" v-for="(item,index) in contextmenu">
      <img :src='item.icon' :class="{box_show:item.icon}">
      <span>{{item.label}}</span>
    </div>
  </div>
</template>
<script>
  const {getRandomId} = require('../util/util')

  export default {
    name: 'ContextMenu',
    data () {
      return {
        ref: getRandomId(),
        contextmenu: [],
        isShow: false
      }
    },
    methods: {
      itemClick (item, ev) {
        item.click && item.click(ev, item)
        this.hide()
      },
      hide (ev) {
        this.isShow = false

        // 移除事件
        window.removeEventListener('wheel', this.disableWheel)
        window.removeEventListener('blur', this.hide)

        window.removeEventListener('pointerdown', this.hide)
      },
      disableWheel (ev) {
        ev.preventDefault()
      },
      show (contextmenu = [], ev = event) {
        // 验证参数
        let res = contextmenu.every((value, index) => {
          return ('label' in value)
        })
        if (!res) throw new Error('请检查参数是否正确')

        let x = ev.screenX - window.screenX
        let y = ev.screenY - window.screenY - (window.outerHeight - window.innerHeight)
        let el = this.$refs[this.ref]

        this.isShow = true
        this.contextmenu = contextmenu

        this.$nextTick(() => {
          // 下面超出了窗体
          if (y > window.outerHeight - el.offsetHeight - 15) y = y - el.offsetHeight
          if (x > window.outerWidth - el.offsetWidth - 15) x = window.outerWidth - el.offsetWidth - 15

          el.style.top = y + 'px'
          el.style.left = x + 'px'
        })

        // 绑定事件
        window.addEventListener('blur', this.hide)// 窗体失去焦点事件
        window.addEventListener('wheel', this.disableWheel)

        window.addEventListener('pointerdown', this.hide)
      }
    }
  }
</script>

<style scoped lang="scss">

  .rootNode * {
    user-select: none;
    cursor: default;
  }

  .rootNode {
    position: fixed;
    background: white;
    box-shadow: #8f8f8f 0 0 9px 1px;
    top: 74px;
    z-index: 9999;
    overflow-y: auto;
    overflow-x: hidden;
    user-select: none;
  }

  .rootNode div {
    font-size: 13px;
    height: 28px;
    line-height: 28px;
    min-width: 120px;
    border: 1px #ddd solid;
    padding-left: 12px;
    padding-right: 12px;
    position: relative;
    overflow: hidden;
  }

  .rootNode div img {
    vertical-align: text-bottom;
    height: 15px;
    width: 15px;
    margin-right: 5px;
    visibility: hidden;
  }

  .rootNode div:hover {
    background: #288ed3;
    color: white;
  }

  .rootNode.hide *,
  .rootNode.hide {
    visibility: hidden !important;
  }
</style>
