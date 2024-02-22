<template>
    <div class="col p-0" style="background: #696969; max-width:3%;">
      <div style="background-color: #003478;">
        <div class="p-3">
          <img class="img-fluid" src="@/assets/svg/home3.svg">
        </div>
      </div>

      <div>
        <div class="p-3 mt-1">
          <img class="img-fluid" src="@/assets/svg/bar.svg">
        </div>
      </div>

      <div>
        <div class="p-3 mt-1">
          <img class="img-fluid" src="@/assets/svg/user.svg">
        </div>
      </div>

      <div>
        <div class="p-3 mt-1">
          <img class="img-fluid" src="@/assets/svg/admin.svg">
        </div>
      </div>
    </div>

    <button class="col p-0 mb-0 border-0 fw-bold h5" @click="setToggleStatus" style="background: #a19e9e; max-width:2%;">
      <span v-if="toggleStatus == 0">&gt;&gt;</span>
      <span v-if="toggleStatus == 1">&lt;&lt;</span>
    </button>
</template>
  
  <style scope></style>
  
  <script>
  import { mapState,mapMutations } from "vuex";

  export default {
    name: "sideBar",
    components: {},
    data() {
      return {};
    },
    setup() {},
    created() {},
    mounted() {},
    unmounted() {},
    computed: {
    ...mapState(["toggleStatus"]),
    },
    methods: {
      ...mapMutations(['setToggleStatus']),
    },
  };
  </script>
