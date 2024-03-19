<template>
        <!-- 왼쪽 대시보드 -->
        <XyzTransition appear mode="out-in">
            <leftDashboard xyz="fade left-100%"/>
        </XyzTransition>

        <!-- 왼쪽 대시보드 토글바 -->
        <button class="col p-0 mb-0 border-0 fw-bold h5" @click="setLeftToggleStatus" style="background: #a19e9e; max-width:2%;">
            <span v-if="leftToggleStatus == 0">&gt;&gt;</span>
            <span v-if="leftToggleStatus == 1">&lt;&lt;</span>
        </button>

        <!-- 중앙 지도 -->
        <rscmMap/>

        <!-- 오른쪽 대시보드 토글바 -->
        <button class="col p-0 mb-0 border-0 fw-bold h5" @click="setRightToggleStatus" style="background: #b7b4b4; max-width:2%;">
            <span v-if="rightToggleStatus == 0">&lt;&lt;</span>
            <span v-if="rightToggleStatus == 1">&gt;&gt;</span>
        </button>

        <!-- 오른쪽 대시보드 -->
        <XyzTransition appear mode="out-in">
            <rightDashboard xyz="fade right-100%"/>
        </XyzTransition>
</template>

<style>
    #map {
        height: 100vh;
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
</style>

<script>
import leftDashboard from "@/components/mainpage/leftDashboard.vue";
import rightDashboard from "@/components/mainpage/rightDashboard.vue";
import rscmMap from "@/components/mainpage/rscmMap.vue";
import { mapState,mapMutations,mapActions } from "vuex";

export default {
    name: "MainPage",
    components: { rscmMap, leftDashboard, rightDashboard },
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
        ...mapMutations(['setLeftToggleStatus', 'setRightToggleStatus']),
    },
};
</script>