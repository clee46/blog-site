var articlesView = {};

articlesView.loadTemplate = function(articles) {
  $.get('/template/template.handlebars.html', function(data, msg, xhr) {
    articlesView.template = Handlebars.compile(data);
    articlesView.renderGroup(articles);
  });
};
articlesView.renderGroup = function(articleList) {
  $('#articles')
    .fadeIn()
    .append(
      articleList.map( function(a) {
        var temp = new Article(a);
        temp.tagsDropDown();
        return articlesView.render(a);
      })
    )
    .siblings().hide();
  Article.truncateArticles();
  Article.filterHandler();
};
articlesView.index = function() {
  articlesView.loadTemplate(Article.all);
};
articlesView.render = function(article) {
  // console.log('-> articlesView.render');
  // if (!blog.isAdmin() && !this.publishedOn) {
  //   return '';
  // }
  article.daysAgo = parseInt((new Date() - new Date(article.publishedOn))/60/60/24/1000);
  article.publishStatus = article.publishedOn ? 'published ' + article.daysAgo + ' days ago' : '(draft)';
  article.authorSlug = util.slug(article.author);
  article.categorySlug = util.slug(article.category);
  return articlesView.template(article);  // return the article in handlebars template form
};
articlesView.show = function(articles) {
  articlesView.loadTemplate(articles);
};
