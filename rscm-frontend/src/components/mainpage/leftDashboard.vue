<template>
    <div class="position-relative z-2 container-fluid border border-secondary mx-0 px-0" style="max-width:30%; background: #ffffff;" v-if="leftToggleStatus == 1">

      <div class="container-fluid p-3 border-bottom border-secondary" style="min-height:70%;">
        <div class="row m-4"> <!-- 현황 박스 -->
          <p class="my-0 px-0 text-start tight-spacing">
            <img class="mb-3" src="@/assets/svg/warning.svg">
            <span class="h2 px-3 fw-bold text-dark">실시간 범죄 발생 현황</span>
            <span class="h6 fw-bold" style="color: #b1afaf;">(최근 7일 이내 기준)</span>
          </p>
        </div>
        <div class="row border-bottom my-4 border-secondary"></div>
        <div class="row text-start px-4">
            <p @click="뷰데이터선택(item)" v-for="item in 뷰데이터목록" :key="item.id" class="row hoverz h6 px-3 fw-bold">
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
            <span class="h3 px-3 fw-bold text-dark">최근 범죄 동향 통계</span>
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
    }
  },
};
</script>