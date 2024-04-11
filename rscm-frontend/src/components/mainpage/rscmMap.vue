<template>
  <div class="col px-0 position-relative z-1">
    <div id="map">
      <div class="mt-2 position-relative z-2 ">
        <span class="fw-bold p-2 h6" style="border-radius: 8px; background-color: #4A4A4A; color:white; font-size:13px;">현재 지도 레벨 : {{ mapState.currentLevel }}</span>
      </div>
      <div class="mt-2 position-relative z-2">
        <span class="fw-bold ms-2 px-2 py-1 h5 btn" @click="축소()" style="background-color: #4A4A4A; color:white;">-</span>
        <span class="fw-bold ms-1 p-2 px-2 py-1 h5 btn" @click="확대()" style="background-color: #4A4A4A; color:white;">+</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
#map {
  max-height: 87vh;
}
.tight-spacing {
  letter-spacing: -1px;
}  
</style>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import sidoJson from "@/assets/json/gson.json";
import sidoJsonUp from "@/assets/json/TL_SCCO_SIG_(구단위 백업).json";

export default {
  data() {
    return {
      map: null, // 지도 객체
      mapState: {
        currentLevel: 13,
        previousLevel: null,
      },
      polygons: [],
      overlayMap: {}, // 오버레이를 관리할 객체
      regionsData: [], // 지역명과 각 지역의 위도, 경도를 저장할 배열
      markers: [], // 마커를 저장할 배열
      infoWindows: [] // 정보 창을 저장할 배열
    };
  },
  watch: {
    '$store.state.선택한뷰데이터정보' : {
      handler(newValue, oldValue) {
        if (newValue) {
          this.panTo(newValue.latitude, newValue.longitude);
        }
      },
    },
  },
  created() {
    this.loadKakaoMapsAPI().then(() => {
      this.initializeMap();
        this.$nextTick(() => {
          this.setLeftToggleStatus();
      });
    });
  },
  mounted() {
  },
  computed: {
    ...mapState(["뷰데이터목록", "선택한뷰데이터정보", "rightToggleStatus", "leftToggleStatus"]),
  },
  methods: {
    ...mapActions(["updateRegionData", "get뷰데이터목록"]),
    ...mapMutations(['setLeftToggleStatus', 'set뷰데이터선택', 'setRightToggleStatus']),

    // API 호출
    loadKakaoMapsAPI() {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.onload = () => kakao.maps.load(resolve);
        script.src =
          "https://dapi.kakao.com/v2/maps/sdk.js?appkey=c1479b041c5feb85f1cc85dc2ed3cf39&autoload=false&libraries=services";
        document.head.appendChild(script);
      });
    },

    // API 로드 성공 시 지도 초기화
    initializeMap() {
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: new kakao.maps.LatLng(35.73, 130.93787), // 지도 중심 좌표
        level: this.mapState.currentLevel,
      };
      this.map = new kakao.maps.Map(mapContainer, mapOption);

      // 지도 줌 변경 시, 조건에 따라 폴리곤 데이터 로드
      kakao.maps.event.addListener(this.map, "zoom_changed", () => {
        const level = this.map.getLevel();
        this.mapState.previousLevel = this.mapState.currentLevel;
        this.mapState.currentLevel = level;

        this.markers.forEach((marker, index) => {
          if (this.mapState.currentLevel <= 11) {

            // 클릭 이벤트 리스너에 뷰데이터 정보를 사용하는 로직 추가
          kakao.maps.event.addListener(marker, 'click', () => {
            // 여기에서 마커의 data 속성을 사용하여 뷰데이터 정보에 접근한다.
            console.log("마커 클릭", marker.data);
            // 예를 들어, 선택된 뷰데이터 정보를 상태 관리에 반영하는 메소드 호출
            this.뷰데이터선택(marker.data);
          });

            marker.setMap(this.map); // 마커 표시
            this.infoWindows[index].setMap(this.map);
            //this.getBackgroundColor(this.뷰데이터목록[index].crime_type)
          } else {
            marker.setMap(null); // 마커 숨김
            this.infoWindows[index].setMap(null);
          }
        });


        /*
        if (
          (this.mapState.previousLevel <= 10 &&
            this.mapState.currentLevel > 10) ||
          (this.mapState.previousLevel > 10 && this.mapState.currentLevel <= 10)
        ) {
          this.loadPolygonData(
            //this.mapState.currentLevel <= 10 ? sidoJsonUp : sidoJson
            sidoJson
          ); // 줌 레벨 변경시, 조건에 따라 폴리곤 데이터 다르게 로드
        }
        */
      });

      this.loadPolygonData(sidoJson
        //this.mapState.currentLevel <= 10 ? sidoJsonUp : sidoJson
        ); // 초기화 시 폴리곤 데이터 로드
      //console.log("loadPolygonData 함수 실행")
      this.updateRegionData(this.regionsData);

      this.get뷰데이터목록().then(() => {
        this.displayMarkers(this.뷰데이터목록);
        //console.log("displayMarkers 함수 실행", this.뷰데이터목록)
      });
    },

    loadPolygonData(data) {
      this.clearPolygonsAndOverlays();
      //console.log("clearPolygonsAndOverlays 함수 실행")
      data.features.forEach((feature, index) => {
        const coordinates = feature.geometry.coordinates;
        const name =
          feature.properties.SIG_KOR_NM || feature.properties.CTP_KOR_NM;
        this.displayMap(coordinates, name, index);
        //console.log("displayMap 함수 실행:", name)
      });
    },

    // 폴리곤 표시
    displayMap(coordinates, name, index) {
      const path = coordinates[0].map(
        // 경계 좌표 배열을 LatLng 객체로 변환
        (coordinate) => new kakao.maps.LatLng(coordinate[1], coordinate[0]) // 경도, 위도 순서로 좌표값이 들어있음
      );
      const polygon = new kakao.maps.Polygon({
        map: this.map, // 수정된 부분
        path: path,
        strokeWeight: 1,
        strokeColor: "#004c80",
        strokeOpacity: 1,
        fillColor: "#fff",
        fillOpacity: 0.7,
      });

      this.polygons.push(polygon); // 수정된 부분
      this.overlaySet(name, path, index); // 수정된 부분
      //console.log("overlaySet 함수 실행:", name)

      // 마우스 오버 이벤트
      kakao.maps.event.addListener(polygon, "mouseover", () => {
        polygon.setOptions({ fillColor: "#80B0FC" });
      });

      // 마우스 아웃 이벤트
      kakao.maps.event.addListener(polygon, "mouseout", () => {
        polygon.setOptions({ fillColor: "#fff" });
      });

      // 클릭 이벤트
      kakao.maps.event.addListener(polygon, "click", () => {
        const level = this.map.getLevel() - 2;
        this.map.setLevel(level, {
          anchor: this.centerMap(path),
          animate: { duration: 350 },
        });
      });
    },

    // 폴리곤과 오버레이 제거
    clearPolygonsAndOverlays() {
      this.polygons.forEach(polygon => polygon.setMap(null));
      this.polygons = []; // 수정된 부분
      Object.values(this.overlayMap).forEach(overlay => overlay.setMap(null));
      this.overlayMap = {}; // 수정된 부분
    },

    overlaySet(name, points) {
      if (!this.overlayMap[name]) {
        let position = this.centerMap(points);

        // 위치를 조정하고 싶은 여러 지역들의 조정 값을 매핑하는 객체
        const locationAdjustments = {
          서울: { lat: -0.02, lng: -0.03 },
          세종: { lat: -0.04, lng: 0 },
          대전: { lat: -0.02, lng: -0.03 },
          인천: { lat: -0.01, lng: -0.01 },
          경기: { lat: 0, lng: +0.13 },
          부산: { lat: -0.02, lng: -0.01 },
          광주: { lat: -0.02, lng: -0.03 },
          제주: { lat: -0.06, lng: -0.04 },
          전남: { lat: -0.05, lng: +0.01 },
          경남: { lat: 0.02, lng: -0.06 },
          울산: { lat: -0.06, lng: -0.03 },
          대구: { lat: -0.04, lng: -0.03 },
        };

        // 해당 지역의 위치 조정이 필요한 경우, 조정 값을 적용
        if (locationAdjustments[name]) {
          const adjustment = locationAdjustments[name];
          position = new kakao.maps.LatLng(
            position.getLat() + adjustment.lat,
            position.getLng() + adjustment.lng
          );
        }

        // 지역 데이터 배열에 지역명과 중심 좌표 저장
        this.regionsData.push({ // 수정된 부분
          name: name,
          latitude: position.getLat(),
          longitude: position.getLng()
        });

        const content = `<div class="position-relative z-2" style="font-weight:bold; color: #003478; font-size:14px;">${name}</div>`;
        const overlay = new kakao.maps.CustomOverlay({
          position: position,
          content: content,
          xAnchor: 0.3,
          yAnchor: 0.91,
        });

        overlay.setMap(this.map); // 수정된 부분
        console.log("overlay 함수 실행")
        this.overlayMap[name] = overlay; // 수정된 부분
      }
    },

    // 폴리곤의 중심 좌표 계산
    centerMap(points) {
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
    },

    displayMarkers(viewDataList) {
      viewDataList.forEach(data => {
        const markerPosition = new kakao.maps.LatLng(data.latitude+0.04, data.longitude+0.006); // 마커 위치 설정
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          clickable: true,
        });
        marker.data = data;
        //console.log("마커 생성", marker.data)
        //marker.setMap(this.map); // 마커를 지도 위에 표시
        this.markers.push(marker);
        
        const infowindow = new kakao.maps.CustomOverlay({
          content:
            `
            <div id="overlay-${data.id}" class="custom-overlay">
              <div class="text-start tight-spacing bg-white border border-secondary p-3 position-relative" style="z-index: 1000;">
                <span class="text-start fw-bold tight-spacing text-dark" style="letter-spacing: -1px;">${data.region_name}</span>
                <p class="mb-1" style="font-size: 12px;"><span class="text-dark fw-bold">${data.datetime}</span><span style="color: #696969;"> 경 발생 추정</span></p>
                <span style="font-size: 12px; border-radius: 6px; background-color: #FF5C00;" class="text-white p-2">${data.crime_type}</span>
                <span style="font-size: 12px; border-radius: 6px; background-color: #9E00FF; letter-spacing: -1px; " class="text-white p-2">${data.offender}</span>
                <span style="font-size: 12px; border-radius: 6px; background-color: #5C4A4A; letter-spacing: -1px; " class="text-white p-2">${data.victim}</span>
              </div>
            </div>
            `,
          position: markerPosition,
          xAnchor: 0.5,
          yAnchor: 1.4,
        });
        //infowindow.setMap(this.map) ; // 정보박스를 마커 위에 표시
        this.infoWindows.push(infowindow);
        //console.log("마커와 인포윈도우", infowindow.dataId)
      });
    },

    panTo(latitude, longitude) {
      if (this.선택한뷰데이터정보) {
        this.map.setLevel(11);
        const moveLatLon = new kakao.maps.LatLng(latitude, longitude+1.6);
        this.map.panTo(moveLatLon);
      }
    },

    축소() {
      this.map.setLevel(this.map.getLevel() - 1);
    },
    확대() {
      this.map.setLevel(this.map.getLevel() + 1);
    },
    
    뷰데이터선택(item) {
      this.set뷰데이터선택(item);
      console.log("뷰데이터선택 함수 실행", item)
      if (this.rightToggleStatus == 0) {
        this.setRightToggleStatus(item);
      }
      if (this.leftToggleStatus == 0) {
        this.setLeftToggleStatus();
      }
    }
    /*
      getBackgroundColor(crimeType) {
      console.log("getBackgroundColor 함수 실행", crimeType)
      switch (crimeType) {
        case '절도':
          return '#f44336'; // 빨간색
        case '폭력':
          return '#e91e63'; // 분홍색
        case '사기':
          return '#9c27b0'; // 보라색
        case '살인':
          return '#673ab7'; // 어두운 보라색
        case '교통사고':
          return '#3f51b5'; // 파란색
        case '방화':
          return '#009688'; // 틸색
        case '성범죄':
          return '#4caf50'; // 녹색
        case '도박':
          return '#ffeb3b'; // 노란색
        default:
          return '#607d8b'; // 청회색 - 기본 색상
      }
    }
    */
  },
};
</script>

