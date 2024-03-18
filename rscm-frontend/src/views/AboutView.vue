<template>
  <div class="col about">
    <!-- 상단바 -->
    <div class="row" style="background-color:#696969; height: auto;">
      
      <div class="col-2 pe-1 ps-2">
        <div class="mt-3 pt-2 pb-1 px-3 text-start custom-border">
          <span class="h5 text-white">실시간 수집 데이터 관리</span>
        </div>
      </div>

      <div class="col-2 pe-1 ps-2">
        <div class="mt-3 pt-2 pb-1 px-3 text-start custom-border">
          <span class="h5 text-white">과거 데이터 관리</span>
        </div>
      </div>

    </div>
  </div>
</template>

<style>
  .about {
    background-color: #d9d9d9;
  }
  .custom-border {
    border: 1px solid #fff;
    border-top-left-radius: 10px; /* 좌상단 둥글게 */
    border-top-right-radius: 10px; /* 우상단 둥글게 */
    border-bottom: none; /* 하단 선 제거 */
  }
</style>
