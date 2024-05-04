module.exports = {
  launch: {
    headless: true,
  },
  server: {
    protocol: "http-get",
    command: "npm run dev",
    host: "0.0.0.0",
    port: 3000,
    launchTimeout: 10000,
    waitOnScheme: {
      headers: {
        Accept: "text/html",
      },
    },
  },
};
