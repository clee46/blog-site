var articleView = {};

articleView.index = function() {
  console.log('-> articleView.index');
  var _renderAll = function() {
    $articles = $('#articles');
    $articles.show().siblings().hide();
    // $('#spinner').hide();
    Article.all.forEach(function(article) {
      $articles.append(articleView.render(article));
      article.tagsDropDown();
    });
    blog.handleMainNav();
  };

  if (articleView.template) {
    _renderAll();
  } else {
    $.get('template/template.handlebars.html', function(data, msg, xhr) {
      articleView.template = Handlebars.compile(data);
      _renderAll();
    });
  }
};

articleView.render = function(article) {
  console.log('-> articleView.render');
  // if (!blog.isAdmin() && !this.publishedOn) {
  //   return '';
  // }
  article.daysAgo =
    parseInt((new Date() - new Date(article.publishedOn))/60/60/24/1000);

  article.publishStatus = article.publishedOn ? 'published ' + article.daysAgo + ' days ago' : '(draft)';
  article.authorSlug = util.slug(article.author);
  article.categorySlug = util.slug(article.category);

  return articleView.template(article);
};
