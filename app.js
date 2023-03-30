const express = require("express");
const app = express();

const {
  getTopics,
  getArticleById,
  getArticles,
  getCommentsById,
} = require("./controllers/controller");

const {
  customErrors,
  errorsPSQL,
  errors404,
  errorsServer,
} = require("./errorhandling.js");

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentsById);

app.use(customErrors);
app.use(errors404);
app.use(errorsPSQL);
app.use(errorsServer);

module.exports = app;
