var blog = {};
blog.rawData = [];

blog.isAdmin = function () {
  var admin = util.getParameterByKey('admin');
  if (admin === 'true') {
    return true;
  }
  return false;
};
blog.loadArticles = function() {
  $.get('template/template.handlebars', function(data, message, xhr) {
    Article.prototype.handlebarTest = Handlebars.compile(data);
    $.ajax({
      type: 'HEAD',
      url: 'data/hackerIpsum.json',
      success: blog.fetchArticles
    });
  });
};
blog.fetchArticles = function(data, message, xhr) {
  console.log('fetching articles');
  var eTag = xhr.getResponseHeader('eTag');
  if (typeof localStorage.articlesEtag == 'undefined' || localStorage.articlesEtag != eTag) {
    console.log('cache miss!');
    localStorage.articlesEtag = eTag;
    // Remove all prior articles from the DB, and from blog:
    // blog.articles = [];
    // webDB.execute(
    //   // TODO: Add SQL here...
    //   , blog.fetchJSON);
  }
  else {
    console.log('cache hit!');
    webDB.execute('DROP TABLE articles;', function() { // delete existing table
      webDB.setupTables();
      webDB.importArticlesFrom('data/hackerIpsum.json');
    });
  }
};

blog.exportJSON = function() {
  console.log('exportJSON');
  $('#export-field').show();
  var output = '';
  blog.rawData.forEach(function(article) {
    output += JSON.stringify(article) + ',\n';
  });
  $('#article-json').val('[' + output + '{"markdown":""}]');
};
blog.fetchFromDB = function(callback) {
  callback = callback || function() {};
  console.log(callback);
  // Fetch all articles from db.
  webDB.execute(
    'SELECT * FROM articles ORDER BY publishedOn DESC;',
    function (resultArray) {
      resultArray.forEach(function(ele) {
        var temp = new Article(ele);
        blog.rawData.push(temp);
        temp.toHTML();
        temp.tagsDropDown();
      });
      callback();
    });
};
blog.clearAndFetch = function () {
  blog.rawData = [];
  blog.fetchFromDB(blog.exportJSON);
};
blog.buildArticle = function() {
  return new Article({
    title: $('#article-title').val(),
    author: $('#article-author').val(),
    authorUrl: $('#article-author-url').val(),
    category: $('#article-category').val(),
    markdown: $('#article-body').val(),
    publishedOn: $('#article-published:checked').length ? util.today() : null
  });
};
blog.buildPreview = function() {
  $('#new-form').change(function() {
    console.log('form updated');
    var article = blog.buildArticle();
    console.log(article);
    $('#articles').empty().append(article.toHTML());
    $('pre code').each(function (i, block){
      hljs.highlightBlock(block);
    });
      // var newArticle = JSON.stringify(newEntry);
      // $('#article-json').val(newArticle);
  });
    // var article = blog.buildArticle();
    // $('#articles').html(article.toHTML());
    // $('pre code').each(function (i, block){
    //   hljs.highlightBlock(block);
    // });
};
blog.fillFormWithArticle = function (a) {
  var checked = a.publishedOn ? true : false;
  $('#articles').empty();
  $('#article-title').val(a.title);
  $('#article-author').val(a.author);
  $('#article-author-url').val(a.authorUrl);
  $('#article-category').val(a.category);
  $('#article-body').val(a.markdown);
  $('#article-published').attr('checked', checked);
  blog.buildPreview(); // Show the initial preview
};
blog.loadArticleById = function (id) {
  // Grab just the one article from the DB
  webDB.execute(
    'SELECT * FROM articles WHERE id=' + id +';'
    ,
    function (resultArray) {
      if (resultArray.length === 1) {
        blog.fillFormWithArticle(resultArray[0]);
      }
    }
  );
};
blog.checkForEditArticle = function () {
  if (util.getParameterByKey('id')) {
    var id = util.getParameterByKey('id');
    blog.loadArticleById(id);
    $('#add-article-btn').hide();
    $('#update-article-btn').show().data('article-id', id);
    $('#delete-article-btn').show().data('article-id', id);
    console.log('Found article to edit.');
  } else {
    console.log('No article to edit.');
  }
};
blog.initArticleEditorPage = function() {
  $.get('template/template.handlebars.html', function(data, msg, xhr) {
    Article.prototype.handlebarTest = Handlebars.compile(data);
  });
  $('.tab-content').show();
  $('#export-field').hide();
  $('#article-json').on('focus', function(){
    this.select();
  });
  blog.checkForEditArticle();
  // blog.watchNewForm();
};
blog.initNewArticlePage = function() {
  $.get('template/template.handlebars.html', function(data, msg, xhr) {
    Article.prototype.handlebarTest = Handlebars.compile(data);
  });

  $('.tab-content').show();
  $('#export-field').hide();
  $('#article-json').on('focus', function(){
    this.select();
  });
  blog.buildPreview();
  // blog.checkForEditArticle();
  // blog.watchNewForm();
};
// blog.clearAndFetch = function () {
//   blog.articles = [];
//   // blog.fetchFromDB(blog.exportJSON);
//   blog.fetchFromDB();
// };

//
blog.handleAddButton = function () {
  console.log('add loaded correctly');
  $('#add-article-btn').on('click', function (e) {
    console.log('add button clicked');
    var article = blog.buildArticle();
    article.insertRecord(article);
    // Insert this new record into the DB, then callback to blog.clearAndFetch


  });
};

blog.handleUpdateButton = function () {
  console.log('update loaded correctly');
  $('#update-article-btn').on('click', function () {
    console.log('update button clicked');
    var id = $(this).data('article-id');
    console.log(id);
    var article = blog.buildArticle();
    article.id = id;
    article.updateRecord();
    // Save changes to the DB:

    blog.clearAndFetch();
  });
};

blog.handleDeleteButton = function () {
  console.log('delete loaded correctly');
  $('#delete-article-btn').on('click', function () {
    console.log('delete button works');
    var id = $(this).data('article-id');
    console.log(id);
    var article = blog.buildArticle();
    article.id = id;
    article.deleteRecord(blog.clearAndFetch);

    // Remove this record from the DB:

    // webDB.execute('DELETE FROM articles WHERE id=' + id
    //   , blog.clearAndFetch);
    blog.clearNewForm();
  });
};
