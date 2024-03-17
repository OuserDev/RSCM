<template>
    <div class="col container-fluid border border-secondary mx-0 px-0" style="max-width:25%; background: #ffffff;" v-if="rightToggleStatus == 1">

      <div class="container-fluid p-3" style="min-height: 50%;">  <!-- 특정지역 현황 박스 -->
        <div class="m-3">
          <div class="row my-0 px-0 tight-spacing">
            <div class="col-7 ps-1 pe-0">
              <img class="pb-4 img-fluid" src="@/assets/svg/siren.svg">
              <span class="h2 ps-3 fw-bold text-dark">경기도 성건시</span>
            </div>
            <div class="text-end col-4 px-0 me-1">
              <p class="pe-3 m-0 h5 fw-bold text-dark">범죄 발생 현황</p>
              <p class="pe-3 m-0 h6 fw-bold" style="color: #b1afaf;">(날짜 기준 정렬)</p>
            </div>
          </div>
        </div>
        <div class="row border-bottom border-secondary"></div>
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
  name: "rightDashboard",
  components: {},
  data() {
    return {};
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  computed: {
    ...mapState(["rightToggleStatus"]),
    },
  methods: {
    ...mapMutations(['setRightToggleStatus']),
  },
};
</script>