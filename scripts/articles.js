function Article (opts) {
  Object.keys(opts).forEach(function(e,index,keys) {
    this[e] = opts[e];
  },this);
  this.authorUrl = opts.authorUrl;
  this.age = this.postAge(this.publishedOn);
  this.body = opts.body || marked(this.markdown);
}
Article.prototype.tagsDropDown = function() {
  var $categoryMenu = $('.catMenuItem').clone();
  $categoryMenu.removeAttr('class');  // essential so that you only clone the original template
  $categoryMenu.attr('value', this.category);
  $categoryMenu.text(this.category);
  if ($('#catFilter select').find('option[value="' + this.category + '"]').length === 0) {
    $('#catFilter select').append($categoryMenu);
  }
  var $authorMenu = $('.authMenuItem').clone();
  $authorMenu.removeAttr('class');  // essential so that you only clone the original template
  $authorMenu.attr('value', this.author);
  $authorMenu.text(this.author);
  if ($('#authFilter select').find('option[value="' + this.author + '"]').length === 0) {
    $('#authFilter select').append($authorMenu);
  }
};
Article.prototype.postAge = function(date) {
  var d1 = parseInt(new Date().getDate());
  var m1 = parseInt(new Date().getMonth()+1); //January is 0!
  var y1 = parseInt(new Date().getFullYear());
  var d2 = parseInt(date.slice(8,10));
  var m2 = parseInt(date.slice(5,7));
  var y2 = parseInt(date.slice(0,4));
  return Math.round(Math.abs((new Date(y2,m2,d2).getTime() - new Date(y1,m1,d1).getTime())/(24*60*60*1000)));
};
Article.prototype.insertRecord = function(callback) {
  webDB.execute(
    [
      {
        'sql': 'INSERT INTO articles (title, author, authorUrl, category, publishedOn, markdown) VALUES (?, ?, ?, ?, ?, ?);',
        'data': [this.title, this.author, this.authorUrl, this.category, this.publishedOn, this.markdown]
      }
    ],
    callback
  );
};
Article.prototype.updateRecord = function(callback) {
  webDB.execute(
    'UPDATE articles SET title="' + this.title + '", author="' + this.author + '", authorUrl="' + this.authorUrl + '", category="' + this.category + '", publishedOn="' + this.publishedOn + '", markdown="' + this.markdown + '" WHERE id="' + this.id + '";'
    ,
    callback
  );
};
Article.prototype.deleteRecord = function(callback) {
  webDB.execute(
    [
      {
        'sql': 'DELETE FROM articles WHERE id = ?;',
        'data': [this.id]
      }
    ]
    ,
    callback
  );
};
// Article.getAll = function(callback) {
//   webDB.execute('SELECT * FROM articles ORDER BY publishedOn;');
//   callback
// }
//
// Article.prototype.truncateTable = function(callback) {
//   // Delete all records from given table.
//   webDB.execute(
//     'DELETE * FROM articles'
//     ,
//     callback
//   );
// };

Article.all = [];

Article.requestAll = function(next, callback) {
  $.getJSON('/data/hackerIpsum.json', function (data) {
    data.forEach(function(item) {
      var article = new Article(item);
      article.insertRecord();
    });
    next(callback);
  });
};
Article.findByCategory = function(category, callback) {
  category = category.slice(1);
  webDB.execute(
    [
      {
        'sql': 'SELECT * FROM articles WHERE category = ?;',
        'data': [category]
      }
    ]
    ,
    callback
  );
};
Article.loadAll = function(callback) {
  var callback = callback || function() {};

  if (Article.all.length === 0) { // if articles not loaded before, fetch from DB
    webDB.execute('SELECT * FROM articles ORDER BY publishedOn;',
      function(rows) {
        if (rows.length === 0) {
          // Request data from server, then try loading from db again:
          Article.requestAll(Article.loadAll, callback);
        } else {
          rows.forEach(function(row) {
            Article.all.push(new Article(row));
          });
          Article.hamburgerHandler();
          callback();
        }
      }
    );
  } else {  // if articles already loaded, go straight to articlesView (callback)
    callback();
  }
};
Article.truncateArticles = function() {
  $('.postBody h2:not(:first-child)').hide();  // hides all posts
  $('.postBody p:not(:nth-child(2))').hide();  // hides all posts
  $('.read-on').on('click', function(event) {
    event.preventDefault();
    $(this).siblings('.postBody').find('h2:not(:first-child)').toggle();
    $(this).siblings('.postBody').find('p:not(:nth-child(2))').toggle();
  });
};
Article.filterHandler = function() {

  // $('.view').click(function(e){
  // page('/user/12')
  // e.preventDefault()
// })
  $('select[id="category"]').change(function(e){
    $('#author').find('option:first').attr('selected', 'selected'); // reset other menu
    $('main').find('article').show();
    if ($(this).val() !== 'none'){
      console.log($(this).val());
      // $('.postCategory:not(:contains(' + $(this).val() + '))').parent().hide();
      page('/category/' + $(this).val());
      // page('/category/:' + $(this).val(), articlesController.category, articlesController.show);
      // page.start();
      e.preventDefault();
    }
  });
  $('select[id="author"]').change(function(){
    $('#category').find('option:first').attr('selected', 'selected'); // reset other menu
    $('main').find('article').show();
    if ($(this).val() !== 'none'){
      $('article:not(:contains(' + $(this).val() + '))').hide();
    }
  });
};
Article.hamburgerHandler = function() {
  $( '.cross' ).hide();
  $( '.menu' ).hide();

  $( '.hamburger' ).click(function() {
    $( '.menu' ).slideToggle( 'slow', function() {
      $( '.hamburger' ).hide();
      $( '.cross' ).show();
    });
    $( '#filters' ).css('position', 'relative');
    $( '#filters' ).css('margin-top', '49px');
    $( '#filters' ).css('z-index', '1');
    $( '.articlePosts').css('top', '12px');
  });

  $( '.cross' ).click(function() {
    $( '.menu' ).slideToggle( 'slow', function() {
      $( '.cross' ).hide();
      $( '.hamburger' ).show();
    });
    $( '#filters' ).css('position', 'fixed');
    $( '#filters' ).css('margin-top', '30px');
    $( '#filters' ).css('z-index', '999999');
    $( '.articlePosts').css('top', '100px');
  });

  // event handler for hamburger menu
  $('.menu > ul > li > a').click(function(event){
    // event.preventDefault();//stop browser to take action for clicked anchor

    //get displaying tab content jQuery selector
    var active_tab_selector = $('.nav-tabs > li.active > a').attr('href');

    //find actived navigation and remove 'active' css
    var actived_nav = $('.nav-tabs > li.active');
    actived_nav.removeClass('active');

    //add 'active' css into clicked navigation
    $(this).parents('li').addClass('active');

    //hide displaying tab content
    $(active_tab_selector).removeClass('active');
    $(active_tab_selector).addClass('hide');

    //show target tab content
    var target_tab_selector = $(this).attr('href');
    $(target_tab_selector).removeClass('hide');
    $(target_tab_selector).addClass('active');
    $( '.cross' ).hide();
    $( '.hamburger' ).show();
    $( '.menu' ).hide();
  });
};
