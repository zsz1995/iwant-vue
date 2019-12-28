const path = require("path");
const projectName = require("./package.json").name;
function resolve(dir) {
  return path.join(__dirname, dir);
}


module.exports = {
  publicPath: '/',
  outputDir: "dist",
  productionSourceMap: false,
  devServer: {
    historyApiFallback: true,
    host: "127.0.0.1",
    port: 8080,
    proxy: {
      "/": {
        target: "http://10.1.88.151:8081",
        changeOrigin: true,
        pathRewrite: {
          "^/": "/"
        }
      }
    }
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
