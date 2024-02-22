<template>
  <div class="col px-0">
    <div id="map"></div>
  </div>
</template>

<style scoped>
#map {
  height: 800px;
}
body {
  margin: 0;
}
</style>

<script>
import { onMounted, ref } from "vue";
import sidoJson from "@/assets/json/gson.json";
import sidoJsonUp from "@/assets/json/TL_SCCO_SIG.json";

export default {
  setup() {
    const map = ref(null);
    const customOverlay = ref(null); // 현재 활성화된 커스텀 오버레이를 관리
    const polygons = ref([]);
    const overlays = ref([]);

    onMounted(() => {
      loadKakaoMapsAPI().then(() => {
        initializeMap();
      });
    });

    function loadKakaoMapsAPI() {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.onload = () => kakao.maps.load(resolve);
        script.src =
          "https://dapi.kakao.com/v2/maps/sdk.js?appkey=c1479b041c5feb85f1cc85dc2ed3cf39&autoload=false&libraries=services,clusterer";
        document.head.appendChild(script);
      });
    }

    function initializeMap() {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new kakao.maps.LatLng(36.6358, 127.4911),
        level: 12,
      };

      map.value = new kakao.maps.Map(mapContainer, mapOption);
      customOverlay.value = new kakao.maps.CustomOverlay({});

      map.value.addListener("zoom_changed", () => {
        const level = map.value.getLevel();
        loadPolygonData(level <= 10 ? sidoJsonUp : sidoJson);
      });

      loadPolygonData(sidoJson);
    }

    function loadPolygonData(data) {
      clearPolygonsAndOverlays();
      data.features.forEach((feature) => {
        const coordinates = feature.geometry.coordinates;
        const name = feature.properties.CTP_KOR_NM;
        displayMap(coordinates, name);
      });
    }

    function displayMap(coordinates, name) {
      const path = coordinates[0].map(
        (coordinate) => new kakao.maps.LatLng(coordinate[1], coordinate[0])
      );
      const polygon = new kakao.maps.Polygon({
        map: map.value,
        path: path,
        strokeWeight: 2,
        strokeColor: "#004c80",
        strokeOpacity: 0.8,
        fillColor: "#fff",
        fillOpacity: 0.7,
      });

      polygons.value.push(polygon);
      overlaySet(name, path);

      // 마우스 오버 이벤트
      kakao.maps.event.addListener(polygon, "mouseover", () => {
        polygon.setOptions({ fillColor: "#09f" });
      });

      // 마우스 아웃 이벤트
      kakao.maps.event.addListener(polygon, "mouseout", () => {
        polygon.setOptions({ fillColor: "#fff" });
        customOverlay.value.setMap(null);
      });

      // 클릭 이벤트
      kakao.maps.event.addListener(polygon, "click", () => {
        const level = map.value.getLevel() - 2;
        map.value.setLevel(level, {
          anchor: centerMap(path),
          animate: { duration: 350 },
        });
      });
    }

    function clearPolygonsAndOverlays() {
      // 기존 폴리곤 제거
      polygons.value.forEach((polygon) => polygon.setMap(null));
      polygons.value = [];

      // 기존 오버레이 제거
      overlays.value.forEach((overlay) => overlay.setMap(null));
      overlays.value = [];
    }

    function overlaySet(name, points) {
      // 오버레이 중복 생성 방지를 위해 기존 오버레이 제거
      if (customOverlay.value) {
        customOverlay.value.setMap(null);
      }

      const position = centerMap(points);
      const content = `<div class="area" style="font-weight:bold; font-size:10px;">${name}</div>`;
      customOverlay.value = new kakao.maps.CustomOverlay({
        position: position,
        content: content,
        xAnchor: 0.3,
        yAnchor: 0.91,
      });

      customOverlay.value.setMap(map.value);
    }

    function centerMap(points) {
      let area = 0;
      let x = 0;
      let y = 0;

      for (let i = 0, len = points.length, j = len - 1; i < len; j = i++) {
        const p1 = points[i];
        const p2 = points[j];
        const f = p1.getLat() * p2.getLng() - p2.getLat() * p1.getLng();
        x += (p1.getLng() + p2.getLng()) * f;
        y += (p1.getLat() + p2.getLat()) * f;
        area += f * 3;
      }

      return new kakao.maps.LatLng(y / area, x / area);
    }

    return {};
  },
};
</script>
