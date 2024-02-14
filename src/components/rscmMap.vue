<template>
  <div>
    <h1>카카오맵 보기</h1>
    <div id="map"></div>
  </div>
</template>

<style scope>
#map {
  width: 100%;
  height: 800px;
}
body {
  margin: 0px;
}
.overlaybox {
  position: relative;
  display: inline-block;
  background: #284a6e no-repeat;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
}
</style>

<script>
import axios from "axios";
import sidoJson from "@/assets/sidoJson.json";

export default {
  name: "rscmMap",
  data() {
    return {
      map: null,
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
    loadScript() {
      // api 불러오기
      const script = document.createElement("script");
      script.src =
        "https://dapi.kakao.com/v2/maps/sdk.js?appkey=c1479b041c5feb85f1cc85dc2ed3cf39&autoload=false";
      script.onload = () => window.kakao.maps.load(this.loadMap);
      document.head.appendChild(script);
    },
    loadMap() {
      // 맵 출력하기
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(36.26682, 127.57865),
        level: 12,
      };
      this.map = new window.kakao.maps.Map(container, options);
      this.loadPolygonData();
    },
    loadPolygonData() {
      sidoJson.features.forEach((feature) => {
        this.getPolyCode(feature);
      });
    },
    getPolyCode(feature) {
      const coordinates = feature.geometry.coordinates;
      const type = feature.geometry.type;
      const properties = feature.properties;
      let path = []; // kakao.maps.LatLng 객체의 배열
      let points = []; // centroid 계산을 위한 x, y 좌표 객체의 배열

      if (type === "Polygon") {
        coordinates[0].forEach((coord) => {
          path.push(new kakao.maps.LatLng(coord[1], coord[0]));
          points.push({ x: coord[0], y: coord[1] });
        });
      } else if (type === "MultiPolygon") {
        coordinates.forEach((polygon) => {
          polygon[0].forEach((coord) => {
            path.push(new kakao.maps.LatLng(coord[1], coord[0]));
            points.push({ x: coord[0], y: coord[1] });
          });
        });
      }
      // Set the polygon
      this.setPolygon(path, properties);
    },
  },
};
</script>
