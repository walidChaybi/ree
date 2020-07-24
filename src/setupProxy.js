const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    app.use(
      "/rece-requete-api/v1",
      proxy.createProxyMiddleware({
        target: "http://10.110.192.130:80",
        changeOrigin: true,
      })
    );
  }
};
