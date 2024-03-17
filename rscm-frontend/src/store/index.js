import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state() {
    return {
      leftToggleStatus: 0,
      rightToggleStatus: 0,
      sideBarStatus: 1,
    };
  },
  getters: {},
  mutations: {
    setLeftToggleStatus(state) {
      state.leftToggleStatus ^= 1;
    },
    setRightToggleStatus(state) {
      state.rightToggleStatus ^= 1;
    },
  },
  actions: {},
  modules: {},
});
