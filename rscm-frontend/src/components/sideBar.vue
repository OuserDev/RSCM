<template>
    <div class="col p-0 sideBar" style="background: #696969; max-width: 5%">
      <router-link to="/">
        <div :class="['menu-item', menuItemClass(1)]" @click="setSideBarStatus(1), 대시보드상태변경()">
          <div class="p-3">
              <img class="img-fluid" src="@/assets/svg/home3.svg">
          </div>
        </div>
      </router-link>

      <router-link to="/manage">
        <div :class="['menu-item', menuItemClass(2)]" @click="setSideBarStatus(2)">
          <div class="p-3">
              <img class="img-fluid" src="@/assets/svg/admin.svg">
          </div>
        </div>
      </router-link>

      <div @click="showNothingToast()" :class="['menu-item', menuItemClass(3)]">
        <div class="p-3">
          <img class="img-fluid" src="@/assets/svg/user.svg">
        </div>
      </div>

      <div @click="showNothingToast()" :class="['menu-item', menuItemClass(4)]">
        <div class="p-3">
          <img class="img-fluid" src="@/assets/svg/bar.svg">
        </div>
      </div>
    </div>
</template>

<style scoped>
  .sideBar {
    height: 87vh;
  }
  .menu-item:hover {
    background-color: #1d62bd;
  }
  .bg-color-1, .bg-color-2, .bg-color-3, .bg-color-4 {
    background-color: #003478; /* 모든 상태에 대해 동일한 색상 적용 */
  }
</style>
  
<script>
import { mapState,mapMutations } from "vuex";

export default {
  name: "sideBar",
  components: {},
  data() {
    return {};
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  computed: {
  ...mapState(["sideBarStatus"]),

  menuItemClass() {
      return (menuItemNumber) => {
        if (this.sideBarStatus === menuItemNumber) {
          return `bg-color-${this.sideBarStatus}`;
        } else {
          return '';
        }
      }
    }
  },
  methods: {
    ...mapMutations(['setSideBarStatus', '대시보드상태초기화']),

  showNothingToast() {
    this.$nothingToast(); // 메서드 이름이 일치해야 함
  },

  대시보드상태변경() {
    this.대시보드상태초기화();
  },
  },
};
</script>
