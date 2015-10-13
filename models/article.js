var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var categories = [
  ''
];

var articleSchema = new Schema({
  author: String,
  title: {type: String, index: { unique: true }},
  date: { type: Date, default: Date.now },
  updated: Date,
  body: {},
  comments: [{ body: String, date: Date }],
  category: {type: String, enum: categories},
  tags: [String],
  meta: {
    upvotes: Number,
    downvotes: Number,
  }
});

articleSchema.methods.findRelated = function (callback) {
  return this.model('Article').find({ tags: {$in: this.tags} }, callback);
};

articleSchema.methods.findSameAuthor = function (callback) {
  return this.model('Article').find({ author: this.author }, callback);
};

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;
