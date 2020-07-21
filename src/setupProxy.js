const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  if (process.env.NODE_ENV === "development") {
    app.use(
      "/rece-requete-api/v1",
      proxy.createProxyMiddleware({
        target: "http://localhost:8081",
        changeOrigin: true,
      })
    );
  }
};
