import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state() {
    return {
      leftToggleStatus: 0,
      rightToggleStatus: 0,
    };
  },
  getters: {},
  mutations: {
    setLeftToggleStatus(state) {
      if (state.leftToggleStatus === 1) {
        state.leftToggleStatus = 0;
      } else if (state.leftToggleStatus === 0) {
        state.leftToggleStatus = 1;
      }
    },
    setRightToggleStatus(state) {
      if (state.rightToggleStatus === 1) {
        state.rightToggleStatus = 0;
      } else if (state.rightToggleStatus === 0) {
        state.rightToggleStatus = 1;
      }
    },
  },
  actions: {},
  modules: {},
});
