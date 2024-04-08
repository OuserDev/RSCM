<template>
    <div class="col border border-secondary border-start-0 me-4 mt-3 px-0 mh-100 boxCs" style="height: 90%;">
        <div class="row m-3">
          <p class="my-0 px-0 text-start h3 fw-bold textCs">Checked List</p>
        </div>

        <div class="text-start row mx-4 my-0 tight-spacing2 textCs h6">
          수집된 데이터 01 / 24-01-28 / 12:34:56
          <img class="ms-3 mb-1" src="@/assets/svg/cancel-circle.svg" style="max-width:9%;">
          <img class="mb-1" src="@/assets/svg/download.svg" style="max-width:9%;">
          <img class="mb-1" src="@/assets/svg/copy.svg" style="max-width:9%;">
        </div>

        <div class="row border-bottom m-4 border-secondary"></div>

        <div class="row m-3">
          <p class="my-0 px-0 text-start h4 fw-bold textCs">Information (통합된 단일 GIS 정보)</p>
        </div>

        <div class="row ms-3" style="max-width: 93%; heg">
          <div class="container mt-5 tight-spacing2 textCs text-start fw-bold">
            <form>
              <div class="form-group row py-1">
                <label for="inputDate" class="col-sm-5 col-form-label">발생 지역</label>
                <div class="col-sm-7">
                  <input type="text" class="form-control" id="inputDate" placeholder="강원도 홍천군">
                </div>
              </div>
              <div class="form-group row py-1">
                <label for="inputDate" class="col-sm-5 col-form-label">추정 날짜 및 시간</label>
                <div class="col-sm-7">
                  <input type="text" class="form-control" id="inputDate" placeholder="01월 22일 오전 11시 50분">
                </div>
              </div>
              <div class="form-group row py-1">
                <label for="inputType" class="col-sm-5 col-form-label">범죄 유형</label>
                <div class="col-sm-7">
                  <input type="text" class="form-control" id="inputType" placeholder="포획">
                </div>
              </div>
              <div class="form-group row py-1">
                <label for="inputLocation" class="col-sm-5 col-form-label">발생 장소</label>
                <div class="col-sm-7">
                  <input type="text" class="form-control" id="inputLocation" placeholder="산책로">
                </div>
              </div>
              <div class="form-group row py-1">
                <label for="inputAge" class="col-sm-5 col-form-label">가해자</label>
                <div class="col-sm-7">
                  <input type="text" class="form-control" id="inputAge" placeholder="20대 남성">
                </div>
              </div>
              <div class="form-group row py-1">
                <label for="inputCount" class="col-sm-5 col-form-label">피해자 또는<br>피해액, 피해 규모</label>
                <div class="col-sm-7">
                  <input type="text" class="form-control" id="inputCount" placeholder="1명 경상, 2명 중상">
                </div>
              </div>
              <div class="form-group row py-1">
                <label for="inputDetails" class="col-sm-6 col-form-label">공개 가능한 부가 정보</label>
              </div>
            </form>
          </div>
          <textarea class="form-control" id="inputDetails" rows="1">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</textarea>
        </div>

        <div class="d-flex justify-content-center align-items-center row tight-spacing2 mx-4 mt-4">
          <div class="col p-0 py-1 form-group row">
            <button type="submit" class="btn boxCs2 btn white-text p-2 pt-3"><span class="h4 fw-bold">Apply - 최종 등록</span>
              <img class="ms-3 mb-1" src="@/assets/svg/upload.svg" style="max-width: 9%;">
            </button>
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

export default {
  name: "checkedData",
  components: {},
  data() {
    return {};
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  computed: {
    ...mapState(["leftToggleStatus"]),
    },
  methods: {
    ...mapMutations(['setLeftToggleStatus']),
  },
};
</script>