<template>
        <!-- 왼쪽 대시보드 -->
        <XyzTransition>
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
        <XyzTransition>
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
    created() {
    },
	watch: {
		지역명데이터(newVal, oldVal) {
			// 지역명데이터가 변경되었을 때만 뷰데이터 목록 업데이트
			if (newVal !== oldVal) {
				this.get뷰데이터목록();
			}
		}
	},
    mounted() {
    },
    unmounted() { },
    computed: {
        ...mapState(['leftToggleStatus', 'rightToggleStatus' ,'지역명데이터']),
    },
    methods: {
        ...mapMutations(['setLeftToggleStatus', 'setRightToggleStatus']),
		...mapActions(["get뷰데이터목록"]),
    },
};
</script>