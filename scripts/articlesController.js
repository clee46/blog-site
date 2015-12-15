var articlesController = {};

articlesController.index = function() {
  console.log('-> articlesController.index');
  webDB.init();
  Article.loadAll(articleView.index);
  blog.hamburgerHandler();
  blog.filterHandler();
};
