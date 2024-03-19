<template>
  <div class="col p-0 bck">
    <!-- 상단바 -->
    <manageBar/>

    <div class="mx-auto row">
      <div class="col">
        <unProcess/>
      </div>
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
import { mapState,mapMutations } from "vuex";

export default {
  name: "ManagePage",
  components: { manageBar, unProcess },
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