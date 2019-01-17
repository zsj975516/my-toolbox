const state = {
  type: ''
}

const mutations = {
  SET_MANAGER_TYPE (state, arg) {
    state.type = arg
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  }
}

const actions = {
  someAsyncTask ({commit}) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
}

export default {
  state,
  mutations,
  actions
}
