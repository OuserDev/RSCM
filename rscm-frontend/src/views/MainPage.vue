<template>
    <div class="container-fluid">
        <headerVue/>
    </div>
    <div class="container-fluid">
      <div class="row">
        <sideBar/>
        <leftDashboard/>
        <rscmMap/>
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
import leftDashboard from "@/components/leftDashboard.vue";
import rscmMap from "@/components/rscmMap.vue";
import sideBar from "@/components/sideBar.vue";
import headerVue from "@/components/headerVue.vue";

export default {
    name: "MainPage",
    components: { sideBar, leftDashboard, rscmMap, headerVue },
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
