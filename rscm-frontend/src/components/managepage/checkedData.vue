<template>
    <div class="col border border-secondary border-start-0 me-4 mt-3 px-0 mh-100 boxCs" style="height: 90%;">
        <div class="row m-3">
          <p class="my-0 px-0 text-start h3 fw-bold textCs">Checked List</p>
        </div>

        <div class="text-start row mx-4 my-0 tight-spacing2 textCs h6" v-for="item in 등록전데이터목록" :key="item.id">
          [{{ item.id }}] {{ item['이름'] }} / {{ item['수집 날짜'] }} / {{ item['수집 시각'] }}
          <img @click="등록취소(item.id)" class="ms-3 mb-1 my-1" src="@/assets/svg/cancel-circle.svg" style="max-width:8%;">
          <!-- <img class="mb-1" src="@/assets/svg/download.svg" style="max-width:9%;">-->
          <!-- <img class="mb-1" src="@/assets/svg/copy.svg" style="max-width:9%;">-->
        </div>

        <div class="row border-bottom m-4 border-secondary"></div>

        <div class="row m-3">
          <p class="my-0 px-0 text-start h4 fw-bold textCs">Crime GIS Info (통합할 단일 GIS 정보)</p>
        </div>

        <div class="row ms-3" style="max-width: 93%; heg">
          <div class="container mt-2 tight-spacing2 textCs text-start fw-bold">
            <form @submit.prevent="this.등록완료()">
              <div class="form-group row py-1">
                <label for="inputDate" class="col-sm-5 col-form-label">발생 지역</label>
                <div class="col-sm-7">
                  <select id="region" class="form-control" v-model="region">
                    <option disabled value="">지역을 선택해주세요 ▾</option>
                    <option>서울특별시</option>
                    <option>부산광역시</option>
                    <option>대구광역시</option>
                    <option>인천광역시</option>
                    <option>광주광역시</option>
                    <option>대전광역시</option>
                    <option>울산광역시</option>
                    <option>세종특별자치시</option>
                    <option>경기도</option>
                    <option>강원도</option>
                    <option>충청북도</option>
                    <option>충청남도</option>
                    <option>전라북도</option>
                    <option>전라남도</option>
                    <option>경상북도</option>
                    <option>경상남도</option>
                    <option>제주특별자치도</option>
                  </select>
                </div>
              </div>
              <div class="form-group row py-1">
                <label for="inputDate" class="col-sm-5 col-form-label">추정 날짜 및 시각</label>
                <div class="col-sm-7">
                  <input type="datetime-local" class="form-control" v-model="date" id="date" placeholder="01월 22일 오전 11시 50분">
                </div>
              </div>
              <div class="form-group row py-1">
                <label for="inputType" class="col-sm-5 col-form-label">범죄 유형</label>
                <div class="col-sm-7">
                  <input type="text" class="form-control" v-model="type" id="type" placeholder="방화 및 절도">
                </div>
              </div>
              <div class="form-group row py-1">
                <label for="inputLocation" class="col-sm-5 col-form-label">구체적 발생 장소</label>
                <div class="col-sm-7">
                  <input type="text" class="form-control" v-model="location" id="location" placeholder="산책로">
                </div>
              </div>
              <div class="form-group row py-1">
                <label for="inputAge" class="col-sm-5 col-form-label">가해자 또는 가해 규모</label>
                <div class="col-sm-7">
                  <input type="text" class="form-control" v-model="age" id="age" placeholder="30대 남성">
                </div>
              </div>
              <div class="form-group row py-1">
                <label for="inputCount" class="col-sm-5 col-form-label">피해자 또는<br>피해액, 피해 규모</label>
                <div class="col-sm-7 pt-2">
                  <input type="text" class="form-control" v-model="count" id="count" placeholder="1명 경상, 2명 중상">
                </div>
              </div>
              <div class="form-group row py-1">
                <label for="inputDetails" class="col-sm-6 col-form-label">공개 가능한 부가 정보</label>
              </div>
              
              <textarea class="form-control" v-model="details" id="details" rows="3" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."></textarea>
              
              <div class="d-flex justify-content-center align-items-center row tight-spacing2 mx-4 mt-4">
                <div class="col p-0 py-1 form-group row">
                  <button type="submit" class="btn boxCs2 btn white-text p-2 pt-3"><span class="h4 fw-bold">Apply - 최종 등록</span>
                    <img class="ms-3 mb-1" src="@/assets/svg/upload.svg" style="max-width: 9%;">
                  </button>
                </div>
              </div>

            </form>
          </div>
        </div>

    </div>
</template>

<style scoped>
.white-text {
  color: #FFFFFF; /* 글자색 하얀색 */
}
.tight-spacing {
  letter-spacing: -2px;
}
.tight-spacing2 {
  letter-spacing: -1px;
}
.tight-spacing3 {
  line-height: 1.5;
}
.textCs {
  color:#696969;
}
.boxCs {
  background-color: #E8E8E8;
}
.boxCs2 {
  background-color: #65CBA0;
}
.boxCs3 {
  background-color: rgb(91, 92, 105);
  border-radius: 1%;
}

</style>

<script>
import { mapState,mapMutations,mapActions } from "vuex";
import { createToast } from "mosha-vue-toastify";

export default {
  name: "checkedData",
  components: {},
  data() {
    return {
      region: '',
      date: '',
      type: '',
      location: '',
      age: '',
      count: '',
      details: '',
    };
  },
  setup() {
    const errorToast1 = () => {
      createToast(
        {
          title: "통합 GIS 정보 등록 실패 !",
          description: "처리할 원본 수집 데이터가 없습니다.",
        },
        {
          type: "danger",
          position: "top-right",
          transition: "slide",
          timeout: 3000,
          showCloseButton: true,
          swipeClose: true,
          showIcon: true,
        }
      );
    };
    const errorToast2 = () => {
      createToast(
        {
          title: "통합 GIS 정보 등록 실패 !",
          description: "모든 정보를 입력해주세요.",
        },
        {
          type: "danger",
          position: "top-right",
          transition: "slide",
          timeout: 5000,
          showCloseButton: true,
          swipeClose: true,
          showIcon: true,
        }
      );
    };
    const successToast = () => {
      createToast(
        {
          title: "통합 GIS 정보 등록 성공!",
          description: "정상적으로 등록되었습니다."
        },
        {
          position: "top-center",
          type: "success",
          transition: "zoom",
          timeout: 5000,
          showCloseButton: true,
          swipeClose: true,
          showIcon: true,
        }
      );
    };
    return { errorToast1, errorToast2, successToast };
  },
  created() {},
  mounted() {},
  unmounted() {},
  computed: {
    ...mapState(["leftToggleStatus", "등록전데이터목록", "등록전데이터목록인덱스"]),
    },
  methods: {
    ...mapMutations(['setLeftToggleStatus', "데이터등록취소", "등록완료된데이터삭제"]),
    ...mapActions(['최종등록']),
    
    등록취소(id) {
      this.데이터등록취소(id);
    },

    등록완료() {
      if (this.등록전데이터목록인덱스.length === 0) {
        this.errorToast1();
        return;
      }
      if (this.region === '' || this.date === '' || this.type === '' || this.location === '' || this.age === '' || this.count === '' || this.details === '') {
        this.errorToast2();
        return;
      }
      const viewData = {
        region: this.region,
        date: this.date,
        type: this.type,
        location: this.location,
        age: this.age,
        count: this.count,
        details: this.details,
      };
      //console.log(viewData);
      this.최종등록(viewData)
        .then(() => {
            //('등록 성공');
            this.successToast();
            this.region = '',
            this.date = '',
            this.type = '',
            this.location = '',
            this.age = '',
            this.count = '',
            this.details = ''
        })
        .catch(error => {
          //(error);
            //this.errorToast();
        })
    },
  },
};
</script>