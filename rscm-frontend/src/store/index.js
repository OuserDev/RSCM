import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state() {
    return {
      leftToggleStatus: 0,
      rightToggleStatus: 0,
      sideBarStatus: 1,
      manageBarStatus: 1,
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
    setSideBarStatus(state, status) {
      state.sideBarStatus = status;
    },
    setManageBarStatus(state, status) {
      state.manageBarStatus = status;
    },
  },
  actions: {},
  modules: {},
});