<template>
    <div class="col-4 container-fluid border border-secondary mx-0" style="background: #ffffff;">

        <div class="row m-4"> <!-- 현황 박스 -->
          <p class="my-0 px-0 text-start">
            <img class="mb-3" src="@/assets/svg/warning.svg">
            <span class="display-6 px-3 fw-bolder">실시간 범죄 발생 현황</span>
          </p>
        </div>

        <div class="row border-bottom border-secondary m-4"></div>

        <div class="row m-4"> <!-- 통계 박스 -->
          <p class="my-0 px-0 text-start">
            <img class="mb-3" src="@/assets/svg/pie-chart.svg">
            <span class="display-6 px-3 fw-bolder">최근 범죄 동향 통계</span>
          </p>
        </div>

        <div class="row border-bottom border-secondary m-4"></div>

        <button @click="changeToggle" class="btn btn-dark">&lt;&lt;</button>
    </div>
</template>

<style scope></style>

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
  methods: {
    ...mapMutations(['changeToggle']),
  },
};
</script>