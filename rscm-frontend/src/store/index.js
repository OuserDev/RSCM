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
      뷰데이터목록: [],
      지역명데이터: [],
      선택한데이터: null,
      선택한데이터인덱스: null,
      등록전데이터목록: [],
      등록전데이터목록인덱스: [],
      일괄모드인덱스: [],
      선택한뷰데이터정보: null,
      뷰데이터목록중지역명해당: [],
    };
  },
  getters: {
    선택한지역뷰데이터목록: (state) => {
      if (!state.선택한뷰데이터정보) return [];
  
      // 선택한 지역의 region_name을 기준으로 필터링하고, order 속성에 따라 정렬
      return state.뷰데이터목록
        .filter(data => data.region_name === state.선택한뷰데이터정보.region_name)
        .sort((a, b) => a.order - b.order);
    },
  },
  mutations: {
    set뷰데이터선택(state, item) {
      state.선택한뷰데이터정보 = item;
      console.log("선택한뷰데이터정보", state.선택한뷰데이터정보);
    },
    setLeftToggleStatus(state) {
      state.leftToggleStatus ^= 1;
    },
    setRightToggleStatus(state) {
      state.rightToggleStatus ^= 1;
    },
    대시보드상태초기화(state) {
      state.leftToggleStatus = 0;
      state.rightToggleStatus = 0;
      state.선택한뷰데이터정보 = null;
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
    UPDATE_REGION_DATA(state, payload) {
      //console.log("지역명데이터", payload)      
      state.지역명데이터 = payload.map(item => {
        switch (item.name) {
          case '서울': item.name = '서울특별시'; break;
          case '부산': item.name = '부산광역시'; break;
          case '대구': item.name = '대구광역시'; break;
          case '인천': item.name = '인천광역시'; break;
          case '광주': item.name = '광주광역시'; break;
          case '대전': item.name = '대전광역시'; break;
          case '울산': item.name = '울산광역시'; break;
          case '세종': item.name = '세종시'; break;
          case '경기': item.name = '경기도'; break;
          case '강원': item.name = '강원도'; break;
          case '충북': item.name = '충청북도'; break;
          case '충남': item.name = '충청남도'; break;
          case '전북': item.name = '전라북도'; break;
          case '전남': item.name = '전라남도'; break;
          case '경북': item.name = '경상북도'; break;
          case '경남': item.name = '경상남도'; break;
          case '제주': item.name = '제주도'; break;
          default: break;
        }
        return item;
      });
    },

    set뷰데이터목록(state, 뷰데이터목록) {
      const 지역명데이터 = state.지역명데이터;
      // 뷰데이터목록에 지역명데이터의 내용을 추가하고 지역별로 그룹화한다
      const groupedByRegion = 뷰데이터목록.reduce((acc, item) => {
        // 뷰데이터의 region_code와 일치하는 지역명데이터 항목을 찾는다
        const regionItem = 지역명데이터[item.region_code];
        if (regionItem) {
          item.region_name = regionItem.name;  // 지역명 추가
          state.뷰데이터목록중지역명해당.push(item.region_name);
          console.log("뷰데이터목록중지역명해당", state.뷰데이터목록중지역명해당)

          item.latitude = regionItem.latitude; // 위도 추가
          item.longitude = regionItem.longitude; // 경도 추가

          state.뷰데이터목록중지역명해당 = state.뷰데이터목록중지역명해당.map(item => {
            switch(item) {
              case '경상북도': return '경북';
              case '전라남도': return '전남';
              case '대전광역시': return '대전';
              case '경상남도': return '경남';
              case '제주도': return '제주';
              case '서울특별시': return '서울';
              case '부산광역시': return '부산';
              case '대구광역시': return '대구';
              case '인천광역시': return '인천';
              case '광주광역시': return '광주';
              case '울산광역시': return '울산';
              case '세종시': return '세종';
              case '경기도': return '경기';
              case '강원도': return '강원';
              case '충청북도': return '충북';
              case '충청남도': return '충남';
              case '전라북도': return '전북';
              default: return item; // 매핑되지 않은 지역명은 그대로 반환
            }
          });
          //console.log("변환", state.뷰데이터목록중지역명해당);
        }

        // 지역별로 그룹화
        if (!acc[item.region_name]) {
          acc[item.region_name] = [];
        }
        acc[item.region_name].push(item);
        return acc;
      }, {});
    
      // 각 그룹별로 날짜 내림차순 정렬하고 순서 부여
      for (const region in groupedByRegion) {
        groupedByRegion[region].sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
                               .forEach((item, index) => {
                                 item.order = index + 1; // 순서 부여
                               });
      }
    
      // 모든 그룹을 하나의 배열로 병합
      state.뷰데이터목록 = Object.values(groupedByRegion).flat().sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
      console.log("뷰데이터목록", state.뷰데이터목록);
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
    등록전데이터목록초기화(state) {
      state.등록전데이터목록 = [],
      state.등록전데이터목록인덱스 = [],
      state.선택한데이터 = null,
      state.선택한데이터인덱스 = null;
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
  },
  actions: {
    updateRegionData({ commit }, payload) {
      commit('UPDATE_REGION_DATA', payload);
      //console.log("updateRegionData", payload)
    },

    최종등록(context, viewData) {
      const requestData = {
        ...viewData,
        //collectedDataIndex: context.state.등록전데이터목록인덱스
      };
      console.log("요청데이터", requestData)
      return axios
      //.post(`${process.env.VUE_APP_BACKEND_URL}/board/write`, viewData)
      .post(`http://220.69.241.124:10001/api/view-data`, requestData)
      .then(response => {
        context.commit('등록완료된데이터삭제');
        context.commit('뷰데이터추가');
      })
      .catch(error => {
        console.error('등록 오류',error);
        throw error;
      });
    },
    
    get수집데이터목록(context) {
      // actions에서 commit을 사용할거면, context를 parameter로 받아야함
        axios
        //.get('범죄.json')
        .get(`http://220.69.241.124:10001/api/collected-data`)
        .then(response => {
          console.log("수집데이터", response.data);
          //console.log("데이터 목록 불러오기 성공");
          context.commit('set수집데이터목록', response.data)
        })
        .catch(error => {
          console.error("데이터 목록 불러오기 실패");
          throw error;
        });
      },

      get뷰데이터목록(context) {
        // actions에서 commit을 사용할거면, context를 parameter로 받아야함
          return axios
          //.get('viewData.json')
          .get(`http://220.69.241.124:10001/api/view-data`)
          .then(response => {
            //console.log("데이터 목록 불러오기 성공");

                  // regionCode를 region 이름으로 변환하는 과정
          const transformedData = response.data.map(item => {
            return {
              ...item, // 기존의 데이터를 유지하면서
              region_code: item.regionCode || '알 수 없음' // region 이름을 추가
            };
          });

            console.log("변환된 뷰데이터목록", transformedData);
            context.commit('set뷰데이터목록', transformedData);
          })
          .catch(error => {
            console.error("데이터 목록 불러오기 실패");
            throw error;
          });
        },

        get선택한데이터삭제(context, id) {
          return new Promise((resolve, reject) => {
            axios
              .delete(`https://19b4a6d6-f894-4563-a86c-2d6760ce7a2d.mock.pstmn.io/list/${id}`)
              .then(response => {
                context.commit('선택한데이터삭제');
                resolve(response);
              })
              .catch(error => {
                console.log('못삭제했노');
                reject(error);
              });
          });
        },
  },
  modules: {},
});