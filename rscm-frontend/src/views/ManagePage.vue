<template>
  <div class="col about">
    <!-- 상단바 -->
    <manageBar/>
  </div>
</template>

<style scoped>
  .about {
    background-color: #d9d9d9;
  }
</style>

<script>
import manageBar from "@/components/manageBar.vue";
import { mapState,mapMutations } from "vuex";

export default {
  name: "ManagePage",
  components: { manageBar },
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