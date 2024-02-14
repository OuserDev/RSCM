<template>
  <div>
    <h1>RSCM (RealTime-SNS-Crime-Map)</h1>
    <div id="map"></div>
  </div>
</template>

<style scope>
#map {
  width: 50%;
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
.label {
  /* Label 스타일 정의 */
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  padding: 4px;
  font-size: 14px;
  /* 추가 스타일 */
}
</style>

<script>
import axios from "axios";
import sidoJson from "@/assets/TL_SCCO_CTPRVN.json";

export default {
  name: "rscmMap",
  data() {
    return {
      map: null,
      customOverlay: null, // 초기화를 여기서 하지 않음
    };
  },
  setup() {},
  created() {},
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.loadMap({ mapId: "map" });
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
      // 화살표 함수를 사용하여 this.loadMap을 호출하고, 필요한 매개변수를 전달한다.
      script.onload = () =>
        window.kakao.maps.load(() => this.loadMap({ mapId: "map" }));
      document.head.appendChild(script);
    },
    loadMap(options) {
      // CustomOverlay 인스턴스 생성
      this.customOverlay = new kakao.maps.CustomOverlay({});

      // 지도를 표시할 컨테이너
      const container = document.getElementById(options.mapId || "map"); // options.mapId를 사용하거나 기본값으로 "map" 사용
      const mapOptions = {
        center: new kakao.maps.LatLng(36.26682, 127.57865), // 지도의 중심좌표
        level: 12, // 지도의 확대 레벨
      };

      // 지도 생성
      this.map = new kakao.maps.Map(container, mapOptions);

      // 폴리곤 데이터 로드 및 지도에 표시
      this.loadPolygonData();
    },
    loadPolygonData() {
      sidoJson.features.forEach((feature) => {
        this.getPolyCode(feature);
      });
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
        strokeOpacity: 0.8,
        fillColor: "#fff",
        fillOpacity: 0.7,
      });
      // 폴리곤의 중심점을 계산
      const centroidPoint = this.centroid(path);
      //   this.createLabel(centroidPoint, properties.CTP_KOR_NM);
      //   // 폴리곤 중심에 CustomOverlay를 생성하여 지역 이름 표시
      //   const content = document.createElement("p");
      //   content.className = "overlaybox";
      //   content.innerText = properties.CTP_KOR_NM;

      //   const overlay = new kakao.maps.CustomOverlay({
      //     map: this.map,
      //     position: centroidPoint,
      //     content: content,
      //     yAnchor: 1,
      //   });

      //   // 중심점과 지역 이름을 콘솔에 로깅
      //   console.log(
      //     `지역: ${
      //       properties.CTP_KOR_NM
      //     }, 중심점: ${centroidPoint.getLat()}, ${centroidPoint.getLng()}`
      //   );

      kakao.maps.event.addListener(polygon, "mouseover", () => {
        polygon.setOptions({ fillColor: "#09f" });
        this.customOverlay.setPosition(centroidPoint); // centroid 계산 로직에 path를 전달
        // this.customOverlay.setContent(
        //   `<div class='overlaybox'>${properties.CTP_KOR_NM}</div>`
        // );
        this.customOverlay.setMap(this.map);
      });

      kakao.maps.event.addListener(polygon, "mouseout", () => {
        polygon.setOptions({ fillColor: "#fff" });
        this.customOverlay.setMap(null);
      });

      polygon.setMap(this.map);
    },
    centroid(points) {
      let x = 0,
        y = 0,
        area = 0,
        factor = 0;

      for (let i = 0, j = points.length - 1; i < points.length; j = i, i++) {
        let xi = points[i].getLng(),
          yi = points[i].getLat();
        let xj = points[j].getLng(),
          yj = points[j].getLat();
        factor = xi * yj - xj * yi;
        x += (xi + xj) * factor;
        y += (yi + yj) * factor;
        area += factor * 3;
      }

      // If area is 0, which shouldn't happen for polygons, return early to avoid division by zero
      if (area === 0) {
        return new kakao.maps.LatLng(0, 0); // Or some other default value
      }

      area = Math.abs(area);
      x /= area;
      y /= area;

      // Adjust the signs of x and y as they should be negative if area is negative
      if (area < 0) {
        x = -x;
        y = -y;
      }

      return new kakao.maps.LatLng(y, x);
    },
    // createLabel(centroid, text) {
    //   var content = document.createElement("div");
    //   content.className = "label"; // CSS 클래스 설정
    //   content.innerHTML = text;
    //   content.style.position = "relative";
    //   content.style.left = "-50%";
    //   content.style.top = "-50%";
    //   content.style.whiteSpace = "nowrap";
    //   content.style.textAlign = "center";

    //   var customOverlay = new kakao.maps.CustomOverlay({
    //     map: this.map,
    //     position: centroid,
    //     content: content,
    //     yAnchor: 1,
    //   });

    //   return customOverlay;
    // },
  },
};
</script>
