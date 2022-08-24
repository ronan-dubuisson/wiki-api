const { default: mongoose } = require('mongoose');

// DB constructor method
function Database(connectionString) {
  this.connectionString = connectionString;
}

// DB shchemas
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
}, { timestamps: true });

// DB modules
const Article = mongoose.model('Article', articleSchema);

async function getArticles() {
  await mongoose.connect(this.connectionString);

  // eslint-disable-next-line array-callback-return
  const articles = await Article.find();

  await mongoose.connection.close();

  return articles;
}

async function postNewArticle(title, content) {
  await mongoose.connect(this.connectionString);

  const article = await new Article({
    title,
    content,
  }).save();

  await mongoose.connection.close();

  return article;
}

module.exports = Database;
Database.prototype.getArticles = getArticles;
Database.prototype.postNewArticle = postNewArticle;
