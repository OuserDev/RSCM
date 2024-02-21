<template>
    <div class="row">
        <div class="col" style="max-width:13%">
            <div class="row align-items-center justify-content-center h-100">
                <img src="@/assets/svg/logo.svg" class="mb-2 img-fluid" style="max-width:80%">
            </div>
        </div>

        <div class="col-2">
            <div class="row align-items-center h-100">
                <div class="col border text-start py-2 fw-light" style="max-width:80%;">
                    <span><img class="me-3" src="@/assets/svg/search.svg" style="max-width:10%;"></span>
                    <span class="ml-3 h6" style="color: #AEA7A7;">검색어 (ex. 대전, 종로구...)</span>
                </div>
                <div class="col btn btn-primary border-0 mx-2 py-2" style="max-width:20%; background-color: #003478;" >
                    <span class="h6">검색</span>
                </div>
            </div>
        </div>
    </div>
</template>
  
<style scope></style>
  
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
    methods: {},
    };
</script>