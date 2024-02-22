import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state() {
    return {
			toggleStatus: 0,
		}
  },
  getters: {
  },
  mutations: {
    setToggleStatus(state) {
      if (state.toggleStatus === 1) {
        state.toggleStatus = 0
      } else if (state.toggleStatus === 0) {
        state.toggleStatus = 1
    }
  },
  },
  actions: {
  },
  modules: {
  }
})
