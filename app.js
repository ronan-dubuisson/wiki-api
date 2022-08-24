const express = require('express');
const bodyParser = require('body-parser');
require('ejs');

// eslint-disable-next-line import/no-dynamic-require
const Database = require(`${__dirname}/database.js`);
const dbConnectionString = 'mongodb://localhost:27017/wikiDB';
const db = new Database(dbConnectionString);

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// requests to Root Route
app.get('/', (req, res) => {
  res.send('Hello world');
});

/* eslint-disable-next-line */
///////////////////////////////////////////// Request for all article /////////////////////////////////////////////

app.route('/articles')
  .get((req, res) => {
    db.getArticles()
      .then((articles) => {
        res.send(articles);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  })
  .post((req, res) => {
    db.postNewArticle(req.body.title, req.body.content)
      .then((savedArticle) => {
        res.send(savedArticle);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  })
  .delete((req, res) => {
    res.status(401).send();
  });

/* eslint-disable-next-line */
///////////////////////////////////////////// Request for articles by ID /////////////////////////////////////////////

app.route('/articles/:articleId')
  .get((req, res) => {
    db.getArticleById(req.params.articleId)
      .then((article) => {
        res.send(article);
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          res.status(404).send(`Article with _id = ${req.params.articleId} could not be found!`);
        } else {
          res.status(500).send(err);
        }
      });
  });

// eslint-disable-next-line no-bitwise
app.listen(process.env.PORT | 3000, () => {
  console.log(`${new Date().toISOString()}: server is running`);
});
