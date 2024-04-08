import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state() {
    return {
      leftToggleStatus: 0,
      rightToggleStatus: 0,
      sideBarStatus: 1,
      manageBarStatus: 1,
      수집데이터목록: [],
      선택한데이터: null,
      선택한데이터인덱스: null,
      등록전데이터목록: [],
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
    set수집데이터목록(state, data) {
      state.수집데이터목록 = data;
      console.log(state.수집데이터목록)
    },
    set선택한데이터(state, { item, index }) {
      state.선택한데이터 = item;
      state.선택한데이터인덱스 = index;
      console.log(state.선택한데이터, state.선택한데이터인덱스)
    },
  },
  actions: {
    get수집데이터목록(context) {
      // actions에서 commit을 사용할거면, context를 parameter로 받아야함
        axios
        .get('범죄.json')
        //.get(`${process.env.VUE_APP_BACKEND_URL}/board`)
        .then(response => {
          // console.log(response.data);
          console.log("데이터 목록 불러오기 성공");
          context.commit('set수집데이터목록', response.data);
        })
        .catch(error => {
          console.log("데이터 목록 불러오기 실패");
        });
      },
  },
  modules: {},
});