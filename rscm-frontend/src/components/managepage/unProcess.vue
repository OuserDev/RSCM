<template>
    <div class="col-4 border border-secondary ms-4 mt-3 px-0 mh-100 boxCs" style="height: 90%;">
        <div class="row m-3">
          <p class="my-0 px-0 text-start tight-spacing h3 fw-bold textCs">현재 처리되지 않은 데이터</p>
        </div>

        <div class="text-start row mx-2 my-0 tight-spacing2 ">
          <div class="col-4 border border-secondary ms-2 me-1">
            <img class="me-2" src="@/assets/svg/eye.svg" style="max-width:13%;">
            <span class="textCs ">최근 14일 이내</span>
            <img class="ms-1" src="@/assets/svg/select.svg" style="max-width:9%;">
          </div>
          <div class="text-start col border border-secondary mx-1">
            <img class="me-2" src="@/assets/svg/eye.svg" style="max-width:15%;">
            <span class="textCs">내림차순</span>
            <img class="ms-2" src="@/assets/svg/select.svg" style="max-width:10%;">
          </div>
          <div class="text-start col border border-secondary ms-1 me-2">
            <img class="me-2" src="@/assets/svg/twitter.svg" style="max-width:16%;">
            <span class="textCs">Twitter</span>
            <img class="ms-2" src="@/assets/svg/select.svg" style="max-width:10%;">
          </div>
        </div>

        <div class="text-start row mx-2 mt-2 mb-0 tight-spacing2">
          <!-- 검색 대상 지정 바-->
          <div class="col-4 border border-secondary bg-white ms-2 py-2">
            <img class="me-2" src="@/assets/svg/search.svg" style="max-width:13%;">
            <span class="textCs small">검색 - 범죄 유형</span>
            <img class="ms-2" src="@/assets/svg/select.svg" style="max-width:9%;">
          </div>
          <!-- 검색어 창-->
          <div class="col-6 border border-secondary text-start h-auto mx-2 py-2 bg-white">
              <span class="ml-3 h6 textCs">검색어</span>
          </div>
          <!-- 검색버튼-->
          <div class="col btn btn-primary border-0 ms-1 me-2 px-0 py-2" style="background-color: #003478;" >
              <span class="h6">검색</span>
          </div>
        </div>

        <div class="row border-bottom m-4 border-secondary"></div>

        <div class="row tight-spacing3 mx-4 my-1" v-for="index in 6" :key="index">
          <span class="fw-light text-start h6 textCs">수집된 데이터 01 / 24-01-28 / 12:34:56</span>
        </div>
        <div class="row tight-spacing3 mx-4 selectCs d-flex align-items-center py-1">
          <span class="text-white fw-bold text-start h6 textCs d-flex align-items-center m-0">수집된 데이터 02 / 24-01-28 / 12:34:56</span>
        </div>
        <div class="row tight-spacing3 mx-4 my-1" v-for="index in 6" :key="index">
          <span class="fw-light text-start h6 textCs">수집된 데이터 01 / 24-01-28 / 12:34:56</span>
        </div>

        <div class="row tight-spacing2 mx-4 mt-2">
          <div class="col-7 p-0 btn boxCs2 py-3">
            <span class="fw-bold white-text h5">일괄 선택</span>
            <img class="ms-3 mb-1" src="@/assets/svg/check.svg" style="max-width:5%;">
          </div>
          <div class="col p-0 btn bg-danger py-3 ms-2">
            <span class="fw-bold white-text h5">일괄 삭제</span>
          </div>
        </div>
    </div>
</template>

<style scoped>
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
  color:#696969;
}
.boxCs {
  background-color: #E8E8E8;
}
.boxCs2 {
  background-color: #BAC1BE;
}
.selectCs {
  background-color: #93b5a7;
}

</style>

<script>
import { mapState,mapMutations } from "vuex";

export default {
  name: "unProcess",
  components: {},
  data() {
    return {};
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  computed: {
    ...mapState(["leftToggleStatus"]),
    },
  methods: {
    ...mapMutations(['setLeftToggleStatus']),
  },
};
</script>