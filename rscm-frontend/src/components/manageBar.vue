<template>
      <!-- 상단바 -->
      <div class="mx-auto mh-auto row text-tight mw-100" style="background-color:#696969;">
        
        <div class="col-2 pe-1 ps-0">
          <div :class="['mt-3 pt-2 pb-1 px-3 text-start custom-border menu-item', menuItemClass(1)]" @click="setManageBarStatus(1)">
            <span class="h5">실시간 수집 데이터 관리</span>
          </div>
        </div>
  
        <div class="col-2 pe-1 ps-2">
          <div :class="['mt-3 pt-2 pb-1 px-3 text-start custom-border menu-item', menuItemClass(2)]" @click="setManageBarStatus(2)">
            <span class="h5">과거 데이터 관리</span>
          </div>
        </div>
  
        <div class="col-2 pe-1 ps-2">
          <div :class="['mt-3 pt-2 pb-1 px-3 text-start custom-border menu-item', menuItemClass(3)]" @click="setManageBarStatus(3)">
            <span class="h5 p-0">회원 정보 관리</span>
          </div>
        </div>

        <div class="col-2 pe-1 ps-2">
          <div :class="['mt-3 pt-2 pb-1 px-3 text-start custom-border menu-item', menuItemClass(4)]" @click="setManageBarStatus(4)">
            <span class="h5">트래픽 관리</span>
          </div>
        </div>

        <div class="col-2 pe-1 ps-2">
          <div :class="['mt-3 pt-2 pb-1 px-3 text-start custom-border menu-item', menuItemClass(5)]" @click="setManageBarStatus(5)">
            <span class="h5">기타 제어 사항</span>
          </div>
        </div>
      </div>
  </template>
  
  <style scoped>
    .about {
      background-color: #d9d9d9;
    }
    .custom-border {
      border: 1px solid #d9d9d9;
      border-top-left-radius: 10px; /* 좌상단 둥글게 */
      border-top-right-radius: 10px; /* 우상단 둥글게 */
      border-bottom: none; /* 하단 선 제거 */
    }
    /* 기존 스타일 */
    .menu-item.active, .menu-item:hover {
      background-color: #d9d9d9;
    }
    .bg-white-black-text {
      background-color: #d9d9d9; /* 배경색 하양 */
    }
    .bg-white-black-text span {
      font-weight: bolder;
      color: #555454; /* 글자색 검정 */
    }
    .white-text {
      color: #FFFFFF; /* 글자색 하얀색 */
    }
    .text-tight {
        line-height: 1; /* 라인 높이 조정 */
        letter-spacing: -0.1em; /* 글자 간격 조정 */
    }
  </style>
  
  <script>
  import { mapState,mapMutations } from "vuex";
  
  export default {
    name: "manageBar",
    components: {},
    data() {
      return {};
    },
    setup() {},
    created() {},
    mounted() {},
    unmounted() {},
    computed: {
    ...mapState(["manageBarStatus"]),
  
    menuItemClass() {
        return (menuItemNumber) => {
          if (this.manageBarStatus === menuItemNumber) {
            return ['bg-white-black-text'];
          } else {
            return ['white-text'];
          }
        }
      }
    },
    methods: {
      ...mapMutations(['setManageBarStatus']),
    },
  };
  </script>