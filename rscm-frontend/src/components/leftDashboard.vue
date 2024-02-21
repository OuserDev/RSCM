<template>
    <div class="col-4 container-fluid border border-secondary mx-0" style="background: #ffffff;">
        <div class="row m-4">
          <img class="col-1 p-1 img-fluid" src="@/assets/svg/warning.svg" />
          <span class="col display-6 text-start px-3 fw-bolder"
            >실시간 범죄 발생 현황</span
          >
        </div>
        <div class="row border-bottom border-secondary m-4"></div>
        <div class="row m-4">
          <img class="col-1 p-1 img-fluid" src="@/assets/svg/pie-chart.svg" />
          <span class="col display-6 text-start px-3 fw-bolder"
            >최근 범죄 동향 통계</span
          >
        </div>
        <div class="row border-bottom border-secondary m-4"></div>
    </div>
</template>

<style scope></style>

<script>
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
  methods: {},
};
</script>