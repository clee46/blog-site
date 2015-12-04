
var newEntry = {};

$('#new-form').change(function() {

  newEntry.articleTitle = $('#article-title').val();
  newEntry.category = $('#article-category').val();
  newEntry.author = $('#article-author').val();
  newEntry.authorUrl = $('#article-author-url').val();
  newEntry.publishedOn = new Date();
  newEntry.articleBody = $('#article-body').val();
});
