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
    ...mapState(["leftToggleStatus"]),
    },
    methods: {
      ...mapMutations(['setLeftToggleStatus']),
    },
  };
  </script>
