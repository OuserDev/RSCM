import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state() {
    return {
      leftToggleStatus: 0,
      rightToggleStatus: 0,
      sideBarStatus: 2,
      manageBarStatus: 1,
      수집데이터목록: [],
      선택한데이터: null,
      선택한데이터인덱스: null,
      등록전데이터목록: [],
      등록전데이터목록인덱스: [],
      일괄모드인덱스: [],
      지역명데이터: [],
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
      state.수집데이터목록 = [...data].sort((a, b) => b.id - a.id);
      //console.log(state.수집데이터목록)
    },
    set선택한데이터(state, { item, id }) {
      state.선택한데이터 = item;
      state.선택한데이터인덱스 = id;
      //console.log(state.선택한데이터, state.선택한데이터인덱스)
    },
    선택한데이터취소(state) {
      state.선택한데이터 = null;
      state.선택한데이터인덱스 = null;
    },
    등록전데이터목록에추가(state) {
      state.등록전데이터목록.push(state.선택한데이터);
      state.등록전데이터목록인덱스.push(state.선택한데이터인덱스);
      state.선택한데이터 = null;
      state.선택한데이터인덱스 = null;
      //console.log("등록전데이터목록: ", state.등록전데이터목록);
    },
    데이터등록취소(state, id) {
      state.등록전데이터목록 = state.등록전데이터목록.filter(function(item) {
        return item.id !== id;
      });
      //console.log("등록전데이터목록: ", state.등록전데이터목록);
      state.등록전데이터목록인덱스 = state.등록전데이터목록인덱스.filter(function(item) {
        return item !== id;
      });
    },
    등록완료된데이터삭제(state) {
      // '등록전데이터목록인덱스'에 포함된 id를 가진 항목들을 '수집데이터목록'에서 제거
      state.수집데이터목록 = state.수집데이터목록.filter(function(item) {
        // '등록전데이터목록인덱스' 배열에 item.id가 포함되지 않은 경우만 남김
        return !state.등록전데이터목록인덱스.includes(item.id);
      });
      state.등록전데이터목록 = [];
      state.등록전데이터목록인덱스 = [];
    },
    선택한데이터삭제(state) {
      state.수집데이터목록 = state.수집데이터목록.filter(function(item) {
        return item.id !== state.선택한데이터인덱스;
      });
      state.선택한데이터 = null;
      state.선택한데이터인덱스 = null;
    },
    일괄모드인덱스추가(state, id) {
      state.일괄모드인덱스.push(id);
    },
    일괄모드인덱스제거(state, id) {
      state.일괄모드인덱스 = state.일괄모드인덱스.filter(function(existingId) {
        return existingId !== id;
      });
    },
    일괄모드에서데이터등록(state) {
      state.일괄모드인덱스.forEach(id => {
        state.등록전데이터목록.push(state.수집데이터목록.find(item => item.id === id));
        state.등록전데이터목록인덱스.push(id);
      });
      state.일괄모드인덱스 = [];
    },
    UPDATE_REGION_DATA(state, payload) {
      state.지역명데이터 = payload;
      console.log(state.지역명데이터);
    },
  },
  actions: {
    updateRegionData({ commit }, payload) {
      commit('UPDATE_REGION_DATA', payload);
    },
    최종등록(context, viewData) {
      const requestData = {
        ...viewData,
        collectedDataIndex: context.state.등록전데이터목록인덱스
      };

      return axios
      //.post(`${process.env.VUE_APP_BACKEND_URL}/board/write`, viewData)
      .post(`https://19b4a6d6-f894-4563-a86c-2d6760ce7a2d.mock.pstmn.io/manage/apply`, requestData)
      .then(response => {
        context.commit('등록완료된데이터삭제');
      })
      .catch(error => {
        console.error('등록 오류',error);
        throw error;
      });
    },
    get수집데이터목록(context) {
      // actions에서 commit을 사용할거면, context를 parameter로 받아야함
        axios
        .get('범죄.json')
        //.get(`${process.env.VUE_APP_BACKEND_URL}/board`)
        .then(response => {
          // console.log(response.data);
          //console.log("데이터 목록 불러오기 성공");
          context.commit('set수집데이터목록', response.data);
        })
        .catch(error => {
          console.error("데이터 목록 불러오기 실패");
          throw error;
        });
      },
  },
  modules: {},
});