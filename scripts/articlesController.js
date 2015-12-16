var articlesController = {};

articlesController.index = function() {
  webDB.init();
  Article.loadAll(articlesView.index);
};
