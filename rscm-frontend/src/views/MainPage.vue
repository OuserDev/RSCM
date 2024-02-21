<template>
    <div class="container-fluid mb-2 px-0">
        <headerVue/>
    </div>
    <div class="container-fluid">
      <div class="row">
        <sideBar/>
        <leftDashboard v-if="toggleStatus == 1"/>
        <rscmMap/>
      </div>
    </div>
</template>

<style scope>
    #map {
        height: 100vh;
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
import { mapState,mapMutations,mapActions } from "vuex";

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
    computed: {
        ...mapState(["toggleStatus"]),
    },
    methods: {
    },
};
</script>