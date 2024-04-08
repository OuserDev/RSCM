<template>
    <div class="row h-auto">
        <div class="col p-0 ">
            <router-link to="/" @click="sideBarStatus(1)"><img src="@/assets/svg/logo.svg" class="mt-2 mx-auto w-100" style="height:70%;"></router-link>
        </div>

        <div class="col-3">
            <div @click="showNothingToast()" class="row align-items-center h-100">
                <div class="col border text-start py-3 fw-light h-auto my-3" style="max-width:100%;">
                    <span><img class="me-3" src="@/assets/svg/search.svg" style="max-width:10%;"></span>
                    <span class="ml-3 h6" style="color: #AEA7A7;">검색어 (ex. 대전, 종로구...)</span>
                </div>
                <div class="col btn btn-primary border-0 ms-2 py-3" style="max-width:20%; background-color: #003478;" >
                    <span class="h5">검색</span>
                </div>
            </div>
        </div>

        <div class="col-6 p-0"></div>

        <div class="col p-0 me-5">
            <div class="row align-items-center justify-content-center h-100">
                <div @click="showNothingToast()" class="col px-2">
                    <span class="h5 fw-bold text-secondary tight-spacing">도움말</span>
                    <span><img class="ms-1 pb-2" src="@/assets/svg/triangle.svg" style="max-width:16%;"></span>
                </div>
                <div @click="showNothingToast()" class="col px-0">
                    <span class="h5 fw-bold text-secondary tight-spacing">내 정보</span>
                    <span><img class="ms-2 pb-2" src="@/assets/svg/profile-default.svg" style="max-width:30%;"></span>
                </div>
            </div>
        </div>

    </div>
</template>
  
<style scoped>
.tight-spacing {
  letter-spacing: -1px;
}
</style>
  
<script>
import { mapState,mapMutations } from "vuex";

    export default {
    name: "headerVue",
    components: {},
    data() {
        return {};
    },
    setup() {},
    created() {},
    mounted() {},
    unmounted() {},
    computed: {
    },
    methods: {
        ...mapMutations(["setSideBarStatus"]),

        showNothingToast() {
            this.$nothingToast(); // 메서드 이름이 일치해야 함
        },
        sideBarStatus(id) {
            this.setSideBarStatus(id);
        },
    },
    };
</script>