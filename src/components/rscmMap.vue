<template>
    <div>
        <h1>카카오맵 보기</h1>
        <div id="map"></div>
    </div>
</template>

<style scope>
#map {
    width: 100%;
    height: 400px;
}
</style>

<script>
export default {
    name: "rscmMap",
    data() {
        return {
            map: null
        };
    },
    setup() {},
    created() {},
    mounted() {
        if (window.kakao && window.kakao.maps) {
            this.loadMap();
        } else {
            this.loadScript();
        }
    },
    unmounted() {},
    methods: {
        loadScript() { // api 불러오기
            const script = document.createElement("script");
            script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=c1479b041c5feb85f1cc85dc2ed3cf39&autoload=false";
            script.onload = () => 
                window.kakao.maps.load(this.loadMap);
                document.head.appendChild(script);
        },
        loadMap() { // 맵 출력하기
            const container = document.getElementById("map");
            const options = {
                center: new window.kakao.maps.LatLng(37.56682, 126.97865),
                level: 3
            };
            this.map = new window.kakao.maps.Map(container, options);
        }
    },
};
</script>