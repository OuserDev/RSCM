<template>
    <div class="scrollable-container col-4 border border-secondary border-start-0 mt-3 px-0 boxCs" style="">
        <div class="row m-3">
          <p class="my-0 px-0 text-start h3 fw-bold textCs">Selected Data</p>
        </div>

        <div v-if="선택한데이터"class="text-start row mx-4 my-0 tight-spacing2 h5">
          {{ 선택한데이터.keyword }}
          <img @click="선택취소()" class="ms-3 mb-1" src="@/assets/svg/cancel-circle.svg" style="max-width:7%;">
          <img @click="showNothingToast()" class="mb-1" src="@/assets/svg/download.svg" style="max-width:7%;">
          <img @click="showNothingToast()" class="mb-1" src="@/assets/svg/copy.svg" style="max-width:7%;">
        </div>

        <div class="row border-bottom m-4 border-secondary"></div>

        <div class="row m-3">
          <p class="my-0 px-0 text-start tight-spacing h4 fw-bold textCs ">상세보기</p>
        </div>

        <div class="row ms-1 " style="max-width: 93%;">
          <p v-if="선택한데이터" class="m-3 mb-2 boxCs3 p-2 text-start tight-spacing3 white-text">
            {{ 선택한데이터['content'] }}
          </p>
        </div>

        <div class="row tight-spacing2 mx-4 mt-4 mb-3">
          <div class="col p-0 btn boxCs2 py-3 ">
            <span @click="등록할데이터선택()" class="fw-bold white-text h4">Check - 등록 단계로 전송</span>
          </div>
          <div class="col-2 p-0 btn bg-danger py-3 ms-2">
            <span @click="선택데이터삭제()" class="fw-bold white-text h5">삭제</span>
          </div>
        </div>
    </div>
</template>

<style scoped>
.scrollable-container {
  max-height: 79vh; /* 이 값은 부모 컴포넌트의 높이나 원하는 최대 높이에 따라 조정하세요. */
  overflow-y: auto; /* 세로 방향으로 내용이 초과할 경우 스크롤을 활성화합니다. */
}
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
  font-size: 0.8rem;
}
.textCs {
  color:#696969;
}
.boxCs {
  background-color: #E8E8E8;
}
.boxCs2 {
  background-color: rgb(121, 123, 122);
}
.boxCs3 {
  background-color: rgb(91, 92, 105);
  border-radius: 1%;
}
</style>

<script>
import { mapState,mapMutations, mapActions } from "vuex";
import { createToast } from "mosha-vue-toastify";

export default {
  name: "selectData",
  components: {},
  data() {
    return {};
  },
  setup() {
    const successToast = () => {
      createToast(
        {
          title: "원본 수집 데이터 삭제 완료",
          description: "정상적으로 삭제되었습니다."
        },
        {
          position: "top-center",
          type: "info",
          transition: "zoom",
          timeout: 5000,
          showCloseButton: true,
          swipeClose: true,
          showIcon: true,
        }
      );
    };
    return { successToast };
  },
  created() {},
  mounted() {},
  unmounted() {},
  computed: {
    ...mapState(["leftToggleStatus" , "선택한데이터",]),
    },
  methods: {
    ...mapMutations(['setLeftToggleStatus', '등록전데이터목록에추가', '선택한데이터삭제', '선택한데이터취소']),
    ...mapActions(["get선택한데이터삭제",]),
    등록할데이터선택() {
      if (this.선택한데이터) {
        this.등록전데이터목록에추가();
      }
    },

    async 선택데이터삭제() {
      if (this.선택한데이터) {
        try {
          await this.get선택한데이터삭제(this.선택한데이터.id);
          this.successToast();
        } catch (error) {
          console.log("삭제 실패");
        }
      }
    },

    선택취소() {
      if (this.선택한데이터) {
        this.선택한데이터취소();
      }
    },

    showNothingToast() {
      this.$nothingToast(); // 메서드 이름이 일치해야 함
    }
  },
};
</script>