<template>
  <div class="col p-0 bck">
    <!-- 상단바 -->
    <manageBar/>

    <div class="mx-auto row h-100">
      <unProcess/>
      <div class="col mt-3 px-0 mh-100 h5 fw-bold boxCs d-flex justify-content-center align-items-center" style="height: 90%; background: #a19e9e; max-width:2%;">
            <span>&gt;&gt;</span>
      </div>
      <selectData/>
      <div class="col mt-3 px-0 mh-100 h5 fw-bold boxCs d-flex justify-content-center align-items-center" style="height: 90%; background: #a19e9e; max-width:2%;">
            <span>&gt;&gt;</span>
      </div>
      <checkedData/>
    </div>
  </div>

</template>

<style scoped>
  .bck {
    background-color: #d9d9d9;
  }
</style>

<script>
import manageBar from "@/components/managepage/manageBar.vue";
import unProcess from "@/components/managepage/unProcess.vue";
import selectData from "@/components/managepage/selectData.vue";
import checkedData from "@/components/managepage/checkedData.vue";
import { mapState,mapMutations } from "vuex";

export default {
  name: "ManagePage",
  components: { manageBar, unProcess, selectData, checkedData },
  data() {
    return {};
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  computed: {
  ...mapState(["manageBarStatus"]),
  },
  methods: {
    ...mapMutations(['setManageBarStatus']),
  },
};
</script>