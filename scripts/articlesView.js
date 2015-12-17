var articlesView = {};

articlesView.index = function() {
  var _renderAll = function() {
    $articles = $('#articles');
    $articles.show().siblings().hide(); // hides about, stats pages
    Article.all.forEach(function(article) {
      $articles.append(articlesView.render(article)); // append each rendered article
      article.tagsDropDown(); // populate dropdown menus
    });
    Article.truncateArticles(); // truncate articles
    Article.filterHandler();    // event handlers for filter menus
  };

  if (articlesView.template) {  // handlebars template already retrieved
    _renderAll();
  } else {  // handlebars template not yet retrieved
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
  return articlesView.template(article);  // return the article in handlebars template form
};
