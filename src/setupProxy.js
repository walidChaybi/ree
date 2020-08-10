const proxy = require("http-proxy-middleware");

console.log("process.env.NODE_ENV ", process.env.NODE_ENV);
module.exports = function (app) {
  if (process.env.NODE_ENV === "development") {
    if (process.env.API_MODE === "localhost") {
      app.use(
        "/rece-securite-api/v1",
        proxy.createProxyMiddleware({
          target: "http://localhost:8086",
          changeOrigin: true,
        })
      );

      app.use(
        "/rece-requete-api/v1",
        proxy.createProxyMiddleware({
          target: "http://localhost:8081",
          changeOrigin: true,
        })
      );
    } else if (process.env.API_MODE === "DMZ501") {
      app.use(
        "/rece-securite-api/v1",
        proxy.createProxyMiddleware({
          target: "http://10.110.192.130:80",
          changeOrigin: true,
        })
      );

      app.use(
        "/rece-requete-api/v1",
        proxy.createProxyMiddleware({
          target: "http://10.110.192.130:80",
          changeOrigin: true,
        })
      );
    }
  }
};
