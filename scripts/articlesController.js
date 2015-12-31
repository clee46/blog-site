var articlesController = {};

articlesController.index = function() {
  webDB.init();
  Article.loadAll(articlesView.index);
};

articlesController.category = function(ctx, next) {
  var categoryData = function(data) {
    console.log(data);
    ctx.articles = data;
    next();
  };
  console.log(ctx);
  console.log(ctx.params.category);
  Article.findByCategory(ctx.params.category, categoryData);
};
articlesController.author = function(ctx, next) {
  console.log(ctx.params.author);
};
articlesController.show = function(ctx, next) {
  console.log('in show action');
  console.log(ctx.articles);
  articlesView.show(ctx.articles);
};
