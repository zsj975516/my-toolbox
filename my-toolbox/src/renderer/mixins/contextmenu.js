export default {
  methods: {
    showContextMenu (contextmenu) {
      this.$root.$refs.root.$refs.contextMenu.show(contextmenu)
    }
  }
}
