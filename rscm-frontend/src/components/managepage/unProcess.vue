<template>
    <div class="col container-fluid border border-secondary mx-0 px-0" style="max-width:30%; background: #ffffff;" v-if="leftToggleStatus == 1">

      <div class="container-fluid p-3 border-bottom border-secondary" style="min-height:50%;">
        <div class="row m-4"> <!-- 현황 박스 -->
          <p class="my-0 px-0 text-start tight-spacing">
            <img class="mb-3" src="@/assets/svg/warning.svg">
            <span class="h2 px-3 fw-bold text-dark">실시간 범죄 발생 현황</span>
            <span class="h6 fw-bold" style="color: #b1afaf;">(최근 7일 이내 기준)</span>
          </p>
        </div>
        <div class="row border-bottom m-4 border-secondary"></div>
      </div>

      <div class="container-fluid p-3 bg-light" style="min-height: 50%;">
        <div class="row m-4"> <!-- 통계 박스 -->
          <p class="my-0 px-0 text-start tight-spacing">
            <img class="mb-3" src="@/assets/svg/pie-chart.svg">
            <span class="h2 px-3 fw-bold text-dark">최근 범죄 동향 통계</span>
            <span class="h6 fw-bold" style="color: #b1afaf;">(최근 7일 이내 기준)</span>
          </p>
        </div>
        <div class="row border-bottom m-4 border-secondary"></div>
      </div>

    </div>
</template>

<style scoped>
.tight-spacing {
  letter-spacing: -1px;
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