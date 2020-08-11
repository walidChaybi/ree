const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  if (process.env.NODE_ENV === "development") {
    if (process.env.API_MODE === "localhost") {
      app.use(
        "/rece/rece-securite-api/v1",
        proxy.createProxyMiddleware({
          target: "http://localhost:8086",
          changeOrigin: true,
        })
      );

      app.use(
        "/rece/rece-requete-api/v1",
        proxy.createProxyMiddleware({
          target: "http://localhost:8081",
          changeOrigin: true,
        })
      );
    } else if (process.env.API_MODE === "DMZ501") {
      app.use(
        "/rece/rece-securite-api/v1",
        proxy.createProxyMiddleware({
          target: "http://10.110.192.130:80",
          changeOrigin: true,
        })
      );

      app.use(
        "/rece/rece-requete-api/v1",
        proxy.createProxyMiddleware({
          target: "http://10.110.192.130:80",
          changeOrigin: true,
        })
      );
    }
  }
};
