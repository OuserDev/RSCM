const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080 // 여기서 포트 번호를 원하는 번호로 변경한다
  }
})