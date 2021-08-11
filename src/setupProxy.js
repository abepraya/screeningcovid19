const { createProxyMiddleware } = require("http-proxy-middleware");
const baseURL = "https://screener-backend.herokuapp.com/api";
const baseURLNews = "https://covid19.mathdro.id/api";
const baseURLMaps = "https://api.geoapify.com";
let screenerId;

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/auth/registration", {
      target: baseURL,
      security: true,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/employee/auth/registration", {
      target: baseURL,
      security: true,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/auth/login", {
      target: baseURL,
      security: true,
      timeout: 3600000,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/employee/auth/login", {
      target: baseURL,
      security: true,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/account/get-user/profile", {
      target: baseURL,
      security: true,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/account/get-employee/profile", {
      target: baseURL,
      security: true,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/account/logout-account", {
      target: baseURL,
      security: true,
      timeout: 3600000,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/education/get-education", {
      target: baseURL,
      security: true,
      timeout: 3600000,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/education/add-education", {
      target: baseURL,
      security: true,
      timeout: 3600000,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/education/update-education/:educationId", {
      target: baseURL,
      security: true,
      timeout: 3600000,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/manager/get-data/screening", {
      target: baseURL,
      security: true,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/screening/get-screening", {
      target: baseURL,
      security: true,
      timeout: 3600000,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/screening/get-screening/", {
      target: baseURL,
      security: true,
      timeout: 3600000,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/account/upload-file/avatar", {
      target: baseURL,
      security: true,
      timeout: 3600000,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/account/update-profile", {
      target: baseURL,
      security: true,
      timeout: 3600000,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/get-data/get-symptom", {
      target: baseURL,
      security: true,
      timeout: 3600000,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/account/upload-file/", {
      target: baseURL,
      security: true,
      timeout: 3600000,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/account/symptom-user", {
      target: baseURL,
      security: true,
      timeout: 3600000,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/get-data/get-education", {        //for user
      target: baseURL,
      security: true,
      timeout: 3600000,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/education/update-education", {
      target: baseURL,
      security: true,
      timeout: 3600000,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/education/delete-education", {
      target: baseURL,
      security: true,
      timeout: 3600000,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/screening/get-screening", {
      target: baseURL,
      security: true,
      timeout: 3600000,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/screening/delete-screening", {
      target: baseURL,
      security: true,
      timeout: 3600000,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware(`/screening/update-screening/`, {
      target: baseURL,
      security: true,
      timeout: 3600000,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware(`/account/all-screener`, {  //for user get screening data
      target: baseURL,
      security: true,
      timeout: 3600000,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware(`/account/detail-screener/`, {  //for user get screening data detail
      target: baseURL,
      security: true,
      timeout: 3600000,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/countries/IDN", {
      target: baseURLNews,
      security: true,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/confirmed", {
      target: baseURLNews,
      security: true,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/recovered", {
      target: baseURLNews,
      security: true,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/deaths", {
      target: baseURLNews,
      security: true,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/v1/routing", {
      target: baseURLMaps,
      security: true,
      changeOrigin: true,
    })
  );
};
