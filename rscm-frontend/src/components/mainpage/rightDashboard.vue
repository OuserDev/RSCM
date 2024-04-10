<template>
    <div class="col container-fluid border border-secondary mx-0 px-0" style="max-width:25%; background: #ffffff;" v-if="rightToggleStatus == 1">

      <div class="container-fluid" style="min-height: 50%;">  <!-- 특정지역 현황 박스 -->
        <div v-if="선택한뷰데이터정보" class="m-3 pt-3">
          <div class="row my-0 px-0 tight-spacing">
            <div class="col-7 ps-1 pe-0">
              <img class="pb-4 img-fluid" src="@/assets/svg/siren.svg">
              <span class="h3 ps-3 fw-bold text-dark">{{ this.선택한뷰데이터정보.region_name}}</span>
            </div>
            <div class="text-end col-4 px-0 me-4">
              <p class="pe-3 m-0 h6 fw-bold text-dark">범죄 발생 현황</p>
              <p class="pe-3 m-0 h6 fw-bold" style="color: #b1afaf;">(날짜 기준 정렬)</p>
            </div>
          </div>
        </div>
        <div v-if="!(선택한뷰데이터정보)" class="m-3">
          <div class="row my-0 px-0">
            <div class="ps-1 pe-0">
              <span class="h5 fw-bold text-dark">정보를 선택해주세요.</span>
            </div>
          </div>
        </div>
        <div class="row border-bottom border-secondary"></div>

        <div class="row ms-3" v-if="this.선택한뷰데이터정보" style="max-width: 93%; heg">
          <div class="container mt-2 tight-spacing textCs text-start">
              <div class="form-group row py-1">
                <div class="col-sm-5 py-2"><span style="color: #7F7F7F; font-size:14px; font-size:14px;">발생 지역</span></div>
                <div class="col-sm-1"></div>
                <div class="col-sm-5 py-2 fw-bold">
                  {{ this.선택한뷰데이터정보.region_name}}
                </div>
              </div>
              <div class="form-group row py-1">
                <div for="inputDate" class="col-sm-5 py-2"><span style="color: #7F7F7F; font-size:14px;">추정 날짜 및 시각</span></div>
                <div class="col-sm-1"></div>
                <div class="col-sm-5 py-2 fw-bold">
                  {{ this.선택한뷰데이터정보.datetime }}
                </div>
              </div>
              <div class="form-group row py-1">
                <div for="inputType" class="col-sm-5 py-2"><span style="color: #7F7F7F; font-size:14px;">범죄 유형</span></div>
                <div class="col-sm-1"></div>
                <div class="col-sm-5 py-2 fw-bold">
                  {{ this.선택한뷰데이터정보.crime_type }}
                </div>
              </div>
              <div class="form-group row py-1">
                <div for="inputLocation" class="col-sm-5 py-2"><span style="color: #7F7F7F; font-size:14px;">구체적 발생 장소</span></div>
                <div class="col-sm-1"></div>
                <div class="col-sm-5 py-2 fw-bold">
                  {{ this.선택한뷰데이터정보.location }} 
                </div>
              </div>
              <div class="form-group row py-1">
                <div for="inputAge" class="col-sm-5 py-2"><span style="color: #7F7F7F; font-size:14px;">가해자 또는 가해 규모</span></div>
                <div class="col-sm-1"></div>
                <div class="col-sm-5 py-2 fw-bold">
                  {{ this.선택한뷰데이터정보.offender }}
                </div>
              </div>
              <div class="form-group row py-1">
                <div for="inputCount" class="col-sm-5 py-2"><span style="color: #7F7F7F; font-size:14px;">피해자 또는<br>피해액, 피해 규모</span></div>
                <div class="col-sm-1"></div>
                <div class="col-sm-5 py-2 fw-bold">
                  {{ this.선택한뷰데이터정보.victim }} 
                </div>
              </div>
              <div class="form-group row py-1">
                <div for="inputDetails" class="col-sm-6 py-2 mx-auto"><span style="color: #7F7F7F; font-size:14px;">공개 가능한 부가 정보</span></div>
              </div>    
              <p class="fw-bold">{{ this.선택한뷰데이터정보.add_information }}</p>   
          </div>
        </div>

      </div>

    </div>
</template>

<style scoped>
.tight-spacing {
  letter-spacing: -2px;
}
</style>

<script>
import { mapState,mapMutations } from "vuex";

export default {
  name: "rightDashboard",
  components: {},
  data() {
    return {};
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  computed: {
    ...mapState(["rightToggleStatus", "선택한뷰데이터정보"]),
    },
  methods: {
    ...mapMutations(['setRightToggleStatus']),
  },
};
</script>