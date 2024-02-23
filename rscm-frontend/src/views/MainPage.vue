<template>
    <div class="container-fluid px-0">
        <headerVue/>
    </div>
    <div class="container-fluid">
      <div class="row">
        <sideBar/>
        <leftDashboard/>
        <rscmMap/>
        <rightDashboard/>
      </div>
    </div>
</template>

<style scope>
    #map {
        height: 100vh;
    }
</style>

<script>
import leftDashboard from "@/components/leftDashboard.vue";
import rightDashboard from "@/components/rightDashboard.vue";
import rscmMap from "@/components/rscmMap.vue";
import sideBar from "@/components/sideBar.vue";
import headerVue from "@/components/headerVue.vue";
import { mapState,mapMutations,mapActions } from "vuex";

export default {
    name: "MainPage",
    components: { sideBar, leftDashboard, rscmMap, headerVue, rightDashboard },
    data() {
        return {
        };
    },
    setup() { },
    created() { },
    mounted() {
    },
    unmounted() { },
    computed: {
        ...mapState(["leftToggleStatus", "rightToggleStatus"]),
    },
    methods: {
    },
};
</script>