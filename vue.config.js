const path = require("path");
const projectName = require("./package.json").name;
function resolve(dir) {
  return path.join(__dirname, dir);
}


module.exports = {
  devServer: {
    historyApiFallback: true,
    port: 8080
  },
  configureWebpack: {
    name: projectName,
    resolve: {
      alias: {
        "@": resolve("src"),
        // 添加本配置, 成功使用vue-layer
        "vue$": "vue/dist/vue.js"
      }
    }
  }
};
