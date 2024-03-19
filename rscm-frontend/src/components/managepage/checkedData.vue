<template>
    <div class="col border border-secondary border-start-0 me-4 mt-3 px-0 mh-100 boxCs" style="height: 90%;">
        <div class="row m-3">
          <p class="my-0 px-0 text-start h3 fw-bold textCs">Checked Data</p>
        </div>

        <div class="text-start row mx-4 my-0 tight-spacing2 textCs h5">
          수집된 데이터 01 / 24-01-28 / 12:34:56
          <img class="ms-3 mb-1" src="@/assets/svg/cancel-circle.svg" style="max-width:9%;">
          <img class="mb-1" src="@/assets/svg/download.svg" style="max-width:9%;">
          <img class="mb-1" src="@/assets/svg/copy.svg" style="max-width:9%;">
        </div>

        <div class="row border-bottom m-4 border-secondary"></div>

        <div class="row m-3">
          <p class="my-0 px-0 text-start tight-spacing h4 fw-bold textCs ">등록하기</p>
        </div>

        <div class="row tight-spacing2 mx-4 mt-4">
          <div class="col p-0 btn boxCs2 py-2">
            <span class="fw-bold white-text h4">Apply - 최종 등록</span>
            <img class="ms-3 mb-1" src="@/assets/svg/upload.svg" style="max-width:9%;">
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
  letter-spacing: -1px;
}
.tight-spacing3 {
  line-height: 1.5;
}
.textCs {
  color:#696969;
}
.boxCs {
  background-color: #E8E8E8;
}
.boxCs2 {
  background-color: #65CBA0;
}
.boxCs3 {
  background-color: rgb(91, 92, 105);
  border-radius: 1%;
}

</style>

<script>
import { mapState,mapMutations } from "vuex";

export default {
  name: "checkedData",
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