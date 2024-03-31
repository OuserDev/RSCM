<template>
    <div class="col-4 border border-secondary border-start-0 mt-3 px-0 mh-100 boxCs" style="height: 90%;">
        <div class="row m-3">
          <p class="my-0 px-0 text-start h3 fw-bold textCs">Selected Data</p>
        </div>

        <div class="text-start row mx-4 my-0 tight-spacing2 h5">
          수집된 데이터 01 / 24-01-28 / 12:34:56
          <img class="ms-3 mb-1" src="@/assets/svg/cancel-circle.svg" style="max-width:7%;">
          <img class="mb-1" src="@/assets/svg/download.svg" style="max-width:7%;">
          <img class="mb-1" src="@/assets/svg/copy.svg" style="max-width:7%;">
        </div>

        <div class="row border-bottom m-4 border-secondary"></div>

        <div class="row m-3">
          <p class="my-0 px-0 text-start tight-spacing h4 fw-bold textCs ">상세보기</p>
        </div>

        <div class="row ms-1 " style="max-width: 93%;">
          <p class="m-3 mb-2 boxCs3 p-2 text-start tight-spacing3 white-text">
://19b4a6d6-f894-4563-a86c-2d6760ce7a2d.mock.pstmn.io/auth/register`, userData)
      .then(response => {
        context.dispatch('get게시물목록');
        context.commit('setViewStatus');
      })
      .catch(error => {
        console.error('글작성 오류',error);
        throw error;://19b4a6d6-f894-4563-a86c-2d6760ce7a2d.mock.pstmn.io/auth/register`, userData)
      .then(response => {
        context.dispatch('get게시물목록');
        context.commit('setViewStatus');
      })
      .catch(error => {
        console.error('글작성 오류',error);
        throw error;
      });://19b4a6d6-f894-4563-a86c-2d6760ce7a2d.mock.pstmn.io/auth/register`, userData)
      .then(response => {
        context.dispatch('get게시물목록');
        context.commit('setViewStatus');
      })
      .catch(error => {
        console.error('글작성 오류',error);
        throw error;
      });://19b4a6d6-f894-4563-a86c-2d
      .catch(error => {
        console.error('글작성 오류',error);
        throw error;
      });://19b4a6d6-f894-4563-a86c-2d6760ce7a2d.mock.pstmn.io/auth/register`, userData)
      .then(response => {
        context.dispatch('get게시물목록');
        context.commit('setViewStatus');
      })
      .catch(error => {
        console.error('글작성 오류',error);
        throw error;
      });
      });
    },

os
          .delete(`${process.env.VUE_APP_BACKEND_URL}/board/delete/${post_id}`)
          .then(response => {

        const fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', fileName);
        do</p>
        </div>

        <div class="row tight-spacing2 mx-4 mt-4">
          <div class="col p-0 btn boxCs2 py-3">
            <span class="fw-bold white-text h4">Check - 등록 단계로 전송</span>
          </div>
          <div class="col-2 p-0 btn bg-danger py-3 ms-2">
            <span class="fw-bold white-text h5">삭제</span>
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
import { mapState,mapMutations } from "vuex";

export default {
  name: "selectData",
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