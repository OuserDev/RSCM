import { createApp } from 'vue';
import { createToast } from 'mosha-vue-toastify';

export default {
  install: (app) => {
    app.config.globalProperties.$nothingToast = () => {
      createToast(
        {
          title: "미구현된 서비스입니다.",
          description: "빠른 시일 내에 찾아뵙도록 하겠습니다 :)"
        },
        {
          position: "top-center",
          type: "warning",
          transition: "bounce",
          timeout: 5000,
          showCloseButton: true,
          swipeClose: true,
          showIcon: true,
        }
      );
    };
  }
};