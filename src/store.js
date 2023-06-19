import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state () {
    return {
      user: null
    }
  },
  getters: {
    isAuth (state) {
      return !!state.user;
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
  },
})

export default store