const db = require("../db/connection.js");

exports.selectTopics = () => {
  return db.query(`SELECT * FROM topics;`).then((res) => {
    return res.rows;
  });
};

exports.selectArticleById = (article_id) => {
  return db
    .query(`SELECT * FROM articles WHERE article_id= $1`, [article_id])
    .then((res) => {
      if (res.rows.length === 0) {
        return Promise.reject({ message: "Invalid URL", status: 404 });
      } else {
        return res.rows[0];
      }
    });
};

exports.selectArticles = () => {
  return db
    .query(
      `SELECT articles .*, CAST(COUNT(comments.article_id) AS INT) AS comment_count
      FROM articles
      LEFT JOIN comments
      ON articles.article_id = comments.article_id
      GROUP BY articles.article_id
      ORDER BY articles.created_at DESC
      `
    )
    .then((res) => {
      return res.rows;
    });
};

exports.selectComments = (article_id) => {
  return db
    .query(
      `SELECT *
    FROM comments
    WHERE article_id = $1
    ORDER BY created_at DESC`,
      [article_id]
    )
    .then((res) => {
      return res.rows;
    });
};
