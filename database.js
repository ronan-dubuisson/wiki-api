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

  const articles = await Article.find();

  await mongoose.connection.close();

  return articles;
}

async function getArticleById(articleID) {
  await mongoose.connect(this.connectionString);

  const article = await Article.findById({ _id: articleID });

  await mongoose.connection.close();

  return article;
}

async function postNewArticle(title, content) {
  await mongoose.connect(this.connectionString);

  const article = await new Article({
    title,
    content,
  })
    .save();

  await mongoose.connection.close();

  return article;
}

async function replaceArticleById(_id, replacement) {
  await mongoose.connect(this.connectionString);

  const filter = { _id };
  const options = { returnDocument: 'after' };
  const article = await Article.findOneAndReplace(filter, replacement, options);

  await mongoose.connection.close();

  return article;
}

async function updateArticleById(_id, update) {
  await mongoose.connect(this.connectionString);

  const options = { returnDocument: 'after' };
  const article = await Article.findByIdAndUpdate(_id, update, options);

  await mongoose.connection.close();

  return article;
}

async function deleteArticleById(_id) {
  await mongoose.connect(this.connectionString);

  const article = await Article.findByIdAndRemove(_id);

  await mongoose.connection.close();

  return article;
}

module.exports = Database;
Database.prototype.getArticles = getArticles;
Database.prototype.getArticleById = getArticleById;
Database.prototype.postNewArticle = postNewArticle;
Database.prototype.replaceArticleById = replaceArticleById;
Database.prototype.updateArticleById = updateArticleById;
Database.prototype.deleteArticleById = deleteArticleById;
