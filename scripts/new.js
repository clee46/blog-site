$(document).ready(function() {
  webDB.init();
  console.log('database initialized');
  blog.initArticleEditorPage();
  
});



//
// var newEntry = {};
// var temp = new Article(newEntry);
// console.log(temp);
//
// $.get('template-handlebars.html', function(data) {
//   Article.prototype.handlebarTest = Handlebars.compile(data);
// }).done(function() {
//   $('#new-form').change(function() {
//
//     temp.title = $('#article-title').val();
//     temp.category = $('#article-category').val();
//     temp.author = $('#article-author').val();
//     temp.authorUrl = $('#article-author-url').val();
//     temp.publishedOn = new Date();
//     // temp.age = temp.postAge(new Date());
//     temp.body = marked($('#article-body').val());
//
//     var previewTemplateScript = $('#entry-template').html();
//     var previewTemplate = Handlebars.compile(previewTemplateScript);
//     var previewHTML = previewTemplate(temp);
//
//     $('#articles').empty().append(previewHTML);
//     $('pre code').each(function (i, block){
//       hljs.highlightBlock(block);
//     });
//
//     var newArticle = JSON.stringify(newEntry);
//     $('#article-json').val(newArticle);
//
//   });
//
// });
