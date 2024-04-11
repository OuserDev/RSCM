<template>
    <div class="scrollable-container col-4 border border-secondary ms-4 mt-3 px-0 boxCs" style="width:30vw;">
        <div class="row m-3">
          <p class="my-0 px-0 text-start tight-spacing h3 fw-bold textCs">현재 처리되지 않은 데이터</p>
        </div>

        <div class="text-start row mx-2 my-0 tight-spacing2 ">
          <div @click="showNothingToast()" class="col-4 border border-secondary ms-2 me-1 d-flex align-items-center justify-content-center h-100">
            <img class="me-2" src="@/assets/svg/eye.svg" style="max-width:13%;">
            <span class="textCs ">최근 14일 이내</span>
            <img class="ms-1" src="@/assets/svg/select.svg" style="max-width:9%;">
          </div>
          <div @click="showNothingToast()" class="text-start col border border-secondary mx-1 d-flex align-items-center justify-content-center h-100">
            <img class="me-2" src="@/assets/svg/eye.svg" style="max-width:15%;">
            <span class="textCs">내림차순</span>
            <img class="ms-2" src="@/assets/svg/select.svg" style="max-width:10%;">
          </div>
          <div @click="showNothingToast()" class="text-start col border border-secondary ms-1 me-2 d-flex align-items-center justify-content-center h-100">
            <img class="me-2" src="@/assets/svg/twitter.svg" style="max-width:16%;">
            <span class="textCs">Twitter</span>
            <img class="ms-2" src="@/assets/svg/select.svg" style="max-width:10%;">
          </div>
        </div>

        <div class="text-start row mx-2 mt-2 mb-0 tight-spacing2 ">
          <!-- 검색 대상 지정 바-->
          <div @click="showNothingToast()" class="col-4 border border-secondary bg-white ms-2 py-2 d-flex align-items-center justify-content-center h-100 my-auto">
            <img class="me-2" src="@/assets/svg/search.svg" style="max-width:13%;">
            <span class="small">검색 - 범죄 유형</span>
            <img class="ms-2" src="@/assets/svg/select.svg" style="max-width:9%;">
          </div>
          <!-- 검색어 창-->
          <div @click="showNothingToast()" class="col-6 border border-secondary text-start h-auto mx-2 bg-white py-2 d-flex align-items-center h-100 ">
              <span class="ml-3 h6 d-flex align-items-center my-auto h-100">검색어</span>
          </div>
          <!-- 검색버튼-->
          <div @click="showNothingToast()" class="col btn btn-primary border-0 ms-1 me-2 px-0 d-flex align-items-center justify-content-center h-100 my-auto" style="background-color: #003478;" >
              <span class="h6 d-flex align-items-center my-auto h-100">검색</span>
          </div>
        </div>

        <div class="row border-bottom m-4 mt-2 border-secondary"></div>

        <div class="row tight-spacing3 mx-4 my-1"
          :class="{ 'selectCs d-flex align-items-center': 선택한데이터인덱스 === item.id && 일괄모드상태 == false,
                    'selectCs2 d-flex align-items-center': 일괄모드상태 == true && 일괄모드인덱스.includes(item.id),
                    'black-box': 등록전데이터목록인덱스.includes(item.id)
           }"
        @click="데이터선택(item)"
        v-for="item in 수집데이터목록"
        :key="item.id">
          <span class="fw-light text-start h6 textCs"
          :class="{'text-white fw-bold': (선택한데이터인덱스 === item.id && 일괄모드상태 == false) || 등록전데이터목록인덱스.includes(item.id) || (일괄모드상태 == true && 일괄모드인덱스.includes(item.id))}" >
            [{{ item.id }}] {{ item['keyword'] }}</span>
        </div>

        <div class="row tight-spacing2 mx-4 mt-2">
          <div @click="일괄모드()" class="col p-0 btn boxCs2 py-3 mb-3"
          :class="{ 'boxCs3': 일괄모드상태 == true }">
            <span class="fw-bold white-text h5 " v-if="일괄모드상태 == false">일괄 선택</span>
            <span class="fw-bold white-text h5" v-if="일괄모드상태 == true">등록 단계로 한번에 전송</span>
          </div>
          <!--<div class="col p-0 btn bg-danger py-3 ms-2">
            <span class="fw-bold white-text h5">일괄 삭제</span>
          </div>-->
        </div>
    </div>
</template>

<style scoped>
.black-box {
  background-color: #727577; /* 검정색 배경 */
}
.scrollable-container {
  max-height: 79vh; /* 이 값은 부모 컴포넌트의 높이나 원하는 최대 높이에 따라 조정하세요. */
  overflow-y: auto; /* 세로 방향으로 내용이 초과할 경우 스크롤을 활성화합니다. */
}
.white-text {
  color: #FFFFFF; /* 글자색 하얀색 */
}
.tight-spacing {
  letter-spacing: -2px;
}
.tight-spacing2 {
  letter-spacing: -1.3px;
}
.tight-spacing3 {
  letter-spacing: -1px;
}
.textCs {
  display: inline-block;
  max-width: 100%; /* 최대 너비 설정 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* 넘치는 텍스트를 ...으로 표시 */
}
.boxCs {
  background-color: #E8E8E8;
}
.boxCs2 {
  background-color: #BAC1BE;
}
.boxCs3 {
  background-color: #3cc6d9;
}
.selectCs {
  background-color: #70b799;
}
.selectCs2 {
  background-color: #4ed7ea;
}

</style>

<script>
import { mapState,mapMutations,mapActions } from "vuex";

export default {
  name: "unProcess",
  components: {},
  data() {
    return {
      일괄모드상태: false,
    };
  },
  setup() {},
  mounted() {},
  unmounted() {},
  computed: {
    ...mapState(["leftToggleStatus", "수집데이터목록", "선택한데이터인덱스", "등록전데이터목록인덱스", "일괄모드인덱스"]),
    },
  methods: {
    ...mapMutations(['setLeftToggleStatus', "set선택한데이터", "선택한데이터취소", "일괄모드인덱스추가", "일괄모드인덱스제거", "일괄모드에서데이터등록"]),
    ...mapActions(["get수집데이터목록",]),

    데이터선택(item) {
      if (this.일괄모드상태) { // 일괄모드 상태에서 선택했고,
        if (!this.등록전데이터목록인덱스.includes(item.id)) { // 선택한 데이터가 '등록전데이터목록인덱스'에 포함되어 있지 않은 경우중,
          if (this.일괄모드인덱스.includes(item.id)) { // 선택한 데이터가 '일괄모드인덱스'에 포함되어 있는 상태면,
            this.일괄모드인덱스제거(item.id); // 제거
          } else { // 선택한 데이터가 '일괄모드인덱스'에 포함되어 있지 않은 경우면,
            this.일괄모드인덱스추가(item.id); // 추가
            //console.log("일괄모드인덱스", this.일괄모드인덱스)
          }
        }
      } else if (!this.일괄모드상태) { // 일괄모드 상태가 아닌 경우
        if (!this.등록전데이터목록인덱스.includes(item.id)) { // 선택한 데이터가 '등록전데이터목록인덱스'에 포함되어 있지 않은 경우중,
          if (this.선택한데이터인덱스 === item.id) { // 선택한 데이터가 '선택한데이터인덱스'에 지정되어 있는 상태면,
            this.선택한데이터취소(); // 취소
          } else {
            this.set선택한데이터({ item, id:item.id });
          }
        }
        //console.log("선택한 데이터: ", item, item.id);
      }
    },

    일괄모드(){
      if (this.일괄모드상태 == false) {
        this.선택한데이터취소();
        this.일괄모드상태 = !(this.일괄모드상태);
      } else { 
        this.일괄모드에서데이터등록();
        this.일괄모드상태 = !(this.일괄모드상태);
      }
    },

    showNothingToast() {
      this.$nothingToast(); // 메서드 이름이 일치해야 함
    }
  },
  created() {
    this.get수집데이터목록();
  },
};
</script>