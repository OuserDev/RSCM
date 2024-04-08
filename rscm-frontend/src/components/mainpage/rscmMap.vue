<template>
  <div class="col px-0">
    <div id="map"></div>
  </div>
</template>

<style scoped>
#map {
  max-height: 87vh;
}
</style>

<script>
import { onMounted, ref, reactive } from "vue";
import sidoJson from "@/assets/json/gson.json";
import sidoJsonUp from "@/assets/json/TL_SCCO_SIG_(구단위 백업).json";

export default {
  setup() {
    const map = ref(null);
    const mapState = reactive({
      currentLevel: 12,
      previousLevel: null,
    });
    const polygons = ref([]);
    const overlayMap = reactive({}); // 오버레이를 관리할 객체

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
          "https://dapi.kakao.com/v2/maps/sdk.js?appkey=c1479b041c5feb85f1cc85dc2ed3cf39&autoload=false&libraries=services";
        document.head.appendChild(script);
      });
    }

    // API 로드 후 지도 초기화
    function initializeMap() {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new kakao.maps.LatLng(36.370998, 129.237870),
        level: mapState.currentLevel,
      };

      map.value = new kakao.maps.Map(mapContainer, mapOption);

      // 마커를 추가하는 코드
      const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커 이미지 URL
          imageSize = new kakao.maps.Size(64, 69), // 마커 이미지 크기
          imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커 이미지에서의 옵션

      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
          markerPosition = new kakao.maps.LatLng(36.370998, 129.237870); // 마커 위치

      const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage // 마커 이미지 설정
      });

      marker.setMap(map.value); // 마커를 지도 위에 표시

      // 인포윈도우에 표출될 내용
      const iwContent = '<div style="padding:5px;">test <br><a href="https://map.kakao.com/link/map/안녕하세요!,36.370998,129.237870" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/안녕하세요!,36.370998,129.237870" style="color:blue" target="_blank">길찾기</a></div>',
          iwPosition = new kakao.maps.LatLng(36.370998, 129.237870); // 인포윈도우 표시 위치

      // 인포윈도우를 생성하고 마커 위에 표시
      const infowindow = new kakao.maps.InfoWindow({
          position: iwPosition, 
          content: iwContent 
      });

      infowindow.open(map.value, marker); // 인포윈도우를 마커 위에 표시  
    
      // 지도 이동 시 이벤트
      map.value.addListener("zoom_changed", () => {
        const level = map.value.getLevel();
        mapState.previousLevel = mapState.currentLevel;
        mapState.currentLevel = level;

        if (
          (mapState.previousLevel <= 10 && mapState.currentLevel > 10) ||
          (mapState.previousLevel > 10 && mapState.currentLevel <= 10)
        ) {
          loadPolygonData(mapState.currentLevel <= 10 ? sidoJsonUp : sidoJson);
        }
      });

      loadPolygonData(mapState.currentLevel <= 10 ? sidoJsonUp : sidoJson);
    }

    function loadPolygonData(data) {
      clearPolygonsAndOverlays();
      data.features.forEach((feature, index) => {
        const coordinates = feature.geometry.coordinates;
        // sidoJson과 sidoJsonUp에서 지역명 키 값이 다르므로 적절히 선택
        const name =
          feature.properties.SIG_KOR_NM || feature.properties.CTP_KOR_NM;
          console.log(`Feature #${index}:`, name);
        displayMap(coordinates, name, index);
      });
    }

    function displayMap(coordinates, name, index) {
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
      overlaySet(name, path, index);

      // 마우스 오버 이벤트
      kakao.maps.event.addListener(polygon, "mouseover", () => {
        polygon.setOptions({ fillColor: "#09f" });
      });

      // 마우스 아웃 이벤트
      kakao.maps.event.addListener(polygon, "mouseout", () => {
        polygon.setOptions({ fillColor: "#fff" });
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
      polygons.value.forEach((polygon) => polygon.setMap(null));
      polygons.value = [];
      Object.values(overlayMap).forEach((overlay) => overlay.setMap(null));
      for (const key in overlayMap) {
        delete overlayMap[key];
      }
    }

    function overlaySet(name, points, index) {
      let position = centerMap(points); // 폴리곤의 중심 좌표 계산

      // 위치를 조정하고 싶은 여러 지역들의 조정 값을 매핑하는 객체
      const locationAdjustments = {
        서울: { lat: -0.04, lng: -0.05 },
        세종: { lat: -0.08, lng: -0.01 },
        대전: { lat: -0.05, lng: -0.03 },
        인천: { lat: -0.04, lng: -0.05 },
        경기: { lat: 0, lng: +0.13 },
        부산: { lat: -0.06, lng: -0.01 },
        광주: { lat: -0.06, lng: -0.05 },
        제주: { lat: -0.06, lng: -0.04 },
        전남: { lat: -0.05, lng: +0.01 },
        경남: { lat: 0.02, lng: -0.06 },
        울산: { lat: -0.06, lng: -0.03 },
        대구: { lat: -0.07, lng: -0.05 },
      };

      // 해당 지역의 위치 조정이 필요한 경우, 조정 값을 적용
      if (locationAdjustments[name]) {
        const adjustment = locationAdjustments[name];
        position = new kakao.maps.LatLng(
          position.getLat() + adjustment.lat,
          position.getLng() + adjustment.lng
        );
      }

      const content = `<div class="area" style="font-weight:bold; color: #003478; font-size:14px;">${name}</div>`;
      const overlay = new kakao.maps.CustomOverlay({
        position: position,
        content: content,
        xAnchor: 0.3,
        yAnchor: 0.91,
      });

      overlay.setMap(map.value);
      overlayMap[index] = overlay; // 오버레이 관리를 위해 객체에 추가
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