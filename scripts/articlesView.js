var articlesView = {};

articlesView.index = function() {
  console.log('-> articlesView.index');
  var _renderAll = function() {
    $articles = $('#articles');
    $articles.show().siblings().hide();
    Article.all.forEach(function(article) {
      $articles.append(articlesView.render(article));
      article.tagsDropDown();
    });
    Article.truncateArticles();
    Article.filterHandler();
    Article.hamburgerHandler();
  };

  if (articlesView.template) {
    _renderAll();
  } else {
    $.get('template/template.handlebars.html', function(data, msg, xhr) {
      articlesView.template = Handlebars.compile(data);
      _renderAll();
    });
  }
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

  return articlesView.template(article);
};
