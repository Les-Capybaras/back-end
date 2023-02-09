module.exports = function (app) {
  app.use("/", (req, res) => {
    res.status(200);
    res.send("Hello World");
  });
};
