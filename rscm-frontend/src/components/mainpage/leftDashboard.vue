<template>
    <div class="position-relative z-2 container-fluid border border-secondary mx-0 px-0" style="max-width:30%; background: #ffffff;" v-if="leftToggleStatus == 1">

      <div class="container-fluid p-3 border-bottom border-secondary" style="min-height:70%;">
        <div class="row mx-4 mt-4 mb-1"> <!-- 현황 박스 -->
          <p class="my-0 px-0 text-start tight-spacing">
            <img class="mb-3" src="@/assets/svg/warning.svg">
            <span class="h2 px-3 fw-bold text-dark">실시간 범죄 발생 현황</span>
            <span class="h6 fw-bold" style="color: #b1afaf;">(최근 7일 이내 기준)</span>
          </p>
        </div>
          <div @click="showNothingToast()" class="text-start row mx-2 my-0 tight-spacing d-flex justify-content-center align-items-center h-100">
            <div class="col-2 pe-0 ps-2">
              <span class="textCs ">필터 기준</span>
            </div>
            <div class="col-4 border border-secondary ms-2 me-1 d-flex justify-content-center align-items-center h-100">
                <img class="me-2" src="@/assets/svg/eye.svg" style="max-width:13%;">
                <span class="textCs">최근 14일 이내</span>
                <img class="ms-1" src="@/assets/svg/select.svg" style="max-width:9%;">
            </div>
            <div class="text-start col-4 border border-secondary mx-1 d-flex justify-content-center align-items-center h-100">
              <img class="me-2" src="@/assets/png/filter.png" style="max-width:15%;">
              <span class="textCs">내림차순</span>
              <img class="ms-2" src="@/assets/svg/select.svg" style="max-width:10%;">
            </div>
            <div class="col-1 btn btn-primary border-0 ms-1 me-2 py-0 px-0 d-flex justify-content-center align-items-center h-100" style="background-color: #003478;" >
              <span class="h6 my-1">적용</span>
            </div>
          </div>
        <div class="row border-bottom my-4 border-secondary"></div>
        <div class="row text-start px-4">
            <p @click="뷰데이터선택(item)" v-for="item in 뷰데이터목록" :key="item.id" class="row hoverz h6 px-3 fw-bold my-2">
              <div class="col-1 px-0">▸</div>
              <div class="col" style="color: #003478;">[{{ item['region_name'] }}]</div>
              <div class="col px-0">{{ item['crime_type'] }}</div>
              <div class="col ps-3" style="color: #b1afaf; font-size:12px;">{{ item['datetime'] }}</div>
            </p>
        </div>
      </div>

      <div class="container-fluid p-3 bg-light" style="min-height: 30%;">
        <div class="row m-4"> <!-- 통계 박스 -->
          <p class="my-0 px-0 text-start tight-spacing">
            <img class="mb-3" src="@/assets/svg/pie-chart.svg">
            <span class="h2 px-3 fw-bold text-dark">최근 범죄 동향 통계</span>
            <span class="h6 fw-bold" style="color: #b1afaf;">(최근 7일 이내 기준)</span>
          </p>
        </div>
        <div class="row border-bottom my-4 border-secondary"></div>
      </div>

    </div>
</template>

<style scoped>

.tight-spacing {
  letter-spacing: -1px;
}

.hoverz:hover {
  color: #ffffff;
  background-color: #5175a3;
}

.textCs {
  color:#696969;
}

</style>

<script>
import { mapState,mapMutations } from "vuex";

export default {
  name: "leftDashboard",
  components: {},
  data() {
    return {};
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  computed: {
    ...mapState(["leftToggleStatus", "rightToggleStatus", "뷰데이터목록", "선택한뷰데이터정보"]),
    },
  methods: {
    ...mapMutations(['setLeftToggleStatus', "setRightToggleStatus", "set뷰데이터선택"]),

    뷰데이터선택(item) {
      this.set뷰데이터선택(item);
      if (this.rightToggleStatus == 0) {
        this.setRightToggleStatus(item);
      }
    },

    showNothingToast() {
      this.$nothingToast(); // 메서드 이름이 일치해야 함
    }
  },
};
</script>