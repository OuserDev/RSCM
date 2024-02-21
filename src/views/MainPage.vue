<template>
    <img src="@/assets/logo-blue.png" class="my-3 img-fluid">
    <div class="container-fluid">
      <div class="row">
        <div class="col p-0" style="background: #696969; max-width:70px;">
          <div class="m-3 mt-4 "><img src="@/assets/svg/home3.svg"></div>
        </div>
        <div class="col-4 container-fluid border border-secondary mx-0" style="background: #ffffff;">
          <LeftDashboard/>
        </div>
        <div class="col px-0"><rscmMap/></div>
      </div>
    </div>
  </template>
  
  <style scope>
  #map {
    height: 800px;
  }
  body {
    margin: 0px;
  }
  </style>
  
  <script>
  import LeftDashboard from "@/components/leftDashboard.vue";
  import rscmMap from "@/components/rscmMap.vue";

  export default {
      name: "MainPage",
      components: { LeftDashboard, rscmMap },
      data() {
          return {
          };
      },
      setup() { },
      created() { },
      mounted() {
      },
      unmounted() { },
      methods: {
      },
  };
  </script>
  