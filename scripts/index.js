$(document).ready(function() {
  webDB.init();
  blog.loadArticles();
  blog.hamburgerHandler();
  blog.tabHandler();
  blog.filterHandler();
});
//  ETAG STUFF
// $.get(templates/article.handlebars)
// .done(checkForNewArticles)
//
