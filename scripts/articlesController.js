var articlesController = {};

articlesController.index = function() {
  webDB.init();
  Article.loadAll(articlesView.index);
};

articlesController.category = function(ctx, next) {
  var categoryData = function(data) {
    ctx.articles = data;
    next();
  };
  console.log(ctx.params.category);
  Article.findByCategory(ctx.params.category, next);
};
articlesController.author = function(ctx, next) {
  console.log(ctx.params.author);
};
articlesController.show = function() {
  console.log('in show action');
  console.log(ctx.articles);
};
