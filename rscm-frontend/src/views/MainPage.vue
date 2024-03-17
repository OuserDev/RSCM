<template>
    <div class="container-fluid px-0">
        <headerVue/>
    </div>
    <div class="container-fluid">
      <div class="row">
        <sideBar/>
        <leftDashboard/>
        <button class="col p-0 mb-0 border-0 fw-bold h5" @click="setLeftToggleStatus" style="background: #a19e9e; max-width:2%;">
            <span v-if="leftToggleStatus == 0">&gt;&gt;</span>
            <span v-if="leftToggleStatus == 1">&lt;&lt;</span>
        </button>
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
    components: { sideBar, rscmMap, headerVue, leftDashboard, rightDashboard },
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
        ...mapMutations(['setLeftToggleStatus']),
    },
};
</script>