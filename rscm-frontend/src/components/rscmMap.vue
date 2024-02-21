<template>
  <div class="col px-0">
    <div id="map"></div>
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
import { mapState,mapMutations } from "vuex";
import sidoJson from "@/assets/json/TL_SCCO_CTPRVN.json";
import sidoJsonUp from "@/assets/json/TL_SCCO_SIG.json";

export default {
    name: "rscmMap",
    components: {},
    data() {
        return {
            map: null,
            customOverlay: null,
            previousZoomLevel: 12, 
        };
    },
    setup() { },
    created() { },
    mounted() {
        if (window.kakao && window.kakao.maps) {
            this.loadMap({ mapId: "map" });
        }
        else {
            this.loadScript();
        }
    },
    unmounted() { },
    methods: {
        loadScript() { // 카카오맵 API 연동 함수
            // api 불러오기
            const script = document.createElement("script");
            script.src =
                "https://dapi.kakao.com/v2/maps/sdk.js?appkey=c1479b041c5feb85f1cc85dc2ed3cf39&autoload=false&libraries=services,clusterer";
            script.onload = () => window.kakao.maps.load(() => this.loadMap({ mapId: "map" }));
            document.head.appendChild(script);
        },
        loadMap(options) {
            this.customOverlay = new kakao.maps.CustomOverlay({});
            const container = document.getElementById(options.mapId || "map");
            const mapOptions = {
                center: new kakao.maps.LatLng(36.26682, 127.57865),
                level: 12,
            };
            this.map = new kakao.maps.Map(container, mapOptions);
            this.polygons = [];
            this.loadPolygonData(sidoJson);
            kakao.maps.event.addListener(this.map, "zoom_changed", () => {
                var level = this.map.getLevel();
                var levelChange = level <= 10 ? "up" : "down"; // 줌 레벨에 따른 방향 결정
                var previousLevelChange = this.previousZoomLevel <= 10 ? "up" : "down";

                if (levelChange !== previousLevelChange) {
                    this.clearPolygons();
                    if (level > 10) {
                        this.loadPolygonData(sidoJson);
                        console.log("기본단위 로드");
                    } else {
                        this.loadPolygonData(sidoJsonUp);
                        console.log("상세단위 로드");
                    }
                }
                this.previousZoomLevel = level; // 현재 줌 레벨을 이전 줌 레벨로 업데이트
            });
        },
        loadPolygonData(data) { // 폴리곤 데이터 호출 함수
            data.features.forEach((feature) => {
                this.getPolyCode(feature);
            });
        },
        clearPolygons() { // 폴리곤 지도 제거
            this.polygons.forEach((polygon) => {
                polygon.setMap(null); // 지도에서 폴리곤 제거
            });
            this.polygons = []; // 폴리곤 배열 초기화
        },
        getPolyCode(feature) {
            // coordinates 배열을 순회하여 모든 좌표를 처리
            const type = feature.geometry.type;
            let paths = []; // 여러 path를 저장할 배열
            if (type === "Polygon") {
                feature.geometry.coordinates.forEach((polygon) => {
                    let path = []; // 각 Polygon의 path
                    polygon.forEach((coord) => {
                        path.push(new kakao.maps.LatLng(coord[1], coord[0]));
                    });
                    paths.push(path); // paths 배열에 현재 polygon의 path를 추가
                });
            }
            // 모든 path에 대해 폴리곤 설정
            paths.forEach((path) => {
                this.setPolygon(path, feature.properties);
            });
        },
        setPolygon(path, properties) {
            const polygon = new kakao.maps.Polygon({
                path: path,
                strokeWeight: 2,
                strokeColor: "#003478",
                strokeOpacity: 1,
                fillColor: "#fff",
                fillOpacity: 0.3,
            });
            kakao.maps.event.addListener(polygon, "mouseover", () => {
                polygon.setOptions({ fillColor: "#09f" });
                // this.customOverlay.setContent(`<div class='overlaybox'>${properties.CTP_KOR_NM}</div>`);
                this.customOverlay.setMap(this.map);
            });
            kakao.maps.event.addListener(polygon, "mouseout", () => {
                polygon.setOptions({ fillColor: "#fff" });
                this.customOverlay.setMap(null);
            });
            polygon.setMap(this.map);
            this.polygons.push(polygon); // 생성된 폴리곤 저장
        },
    },
};
</script>
