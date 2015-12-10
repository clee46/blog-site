var blog = {};
blog.rawData = [];

blog.createAll = function() {
  this.rawData.sort(function (a, b) {
    if (a.publishedOn > b.publishedOn) {return -1;}
    if (a.publishedOn < b.publishedOn) {return 1;}
    return 0;
  });
  for (var i = 0; i < blog.rawData.length; i++) {
    blog.rawData[i].toHTML();
    blog.rawData[i].tagsDropDown();
  }
};
blog.truncateArticles = function() {
  $('article .postBody p:not(:first-child)').hide();  // hides all posts
  $('main').on('click', '.read-on', function(event) {
   event.preventDefault();
  $(this).siblings('.postBody').find('p:not(:first-child)').toggle();
 });
};
blog.hamburgerHandler = function() {
  $( ".cross" ).hide();
  $( ".menu" ).hide();

  $( ".hamburger" ).click(function() {
    $( ".menu" ).slideToggle( "slow", function() {
      $( ".hamburger" ).hide();
      $( ".cross" ).show();
    });
    $( "#filters" ).css('position', 'relative');
    $( "#filters" ).css('margin-top', '49px');
    $( "#filters" ).css('z-index', '1');
    $( ".articlePosts").css('top', '12px');
  });

  $( ".cross" ).click(function() {
    $( ".menu" ).slideToggle( "slow", function() {
      $( ".cross" ).hide();
      $( ".hamburger" ).show();
      $( "#filters" ).css('position', 'fixed');
      $( "#filters" ).css('margin-top', '30px');
      $( "#filters" ).css('z-index', '999999');
      $( ".articlePosts").css('top', '100px');
    });
  });
  // event handler for hamburger menu
  $('.menu > ul > li > a').click(function(event){
  		event.preventDefault();//stop browser to take action for clicked anchor

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
      $( ".cross" ).hide();
      $( ".hamburger" ).show();
      $( ".menu" ).hide();
  });
};
blog.tabHandler = function() {
  // event handler for tab menu
  $('.nav-tabs > li > a').click(function(event){
  		event.preventDefault();//stop browser to take action for clicked anchor

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
  });
};
blog.filterHandler = function() {
  // event handler for category filter menu
  $('select[id="category"]').change(function(){
    $('#author').find('option:first').attr('selected', 'selected'); // reset other menu
    $('main').find('article').show();
    if ($(this).val() !== 'none'){
      $('.postCategory:not(:contains(' + $(this).val() + '))').parent().hide();
    }
  });
  // event handler for author filter menu
  $('select[id="author"]').change(function(){
    $('#category').find('option:first').attr('selected', 'selected'); // reset other menu
    $('main').find('article').show();
    if ($(this).val() !== 'none'){
      $("article:not(:contains(" + $(this).val() + "))").hide();
    }
  });
};
// blog.exportJSON = function() {
//   console.log('exportJSON');
//   $('#export-field').show();
//   var output = '';
//   blog.articles.forEach(function(article) {
//     output += JSON.stringify(article) + ",\n";
//   });
//   $('#article-json').val('[' + output + '{"markdown":""}]');
// };
blog.fetchFromDB = function(callback) {
  callback = callback || function() {};
  // Fetch all articles from db.
  webDB.execute(
    'SELECT * FROM articles ORDER BY publishedOn DESC;',
    function (resultArray) {
      resultArray.forEach(function(ele) {
        var temp = new Article(ele);
        blog.rawData.push(temp);
        // console.log('executing toHTML');
        temp.toHTML();
        // console.log('executing tagsDropDown');
        temp.tagsDropDown();
      });
      callback();
    }
  );
};

// blog.clearAndFetch = function () {
//   blog.articles = [];
//   // blog.fetchFromDB(blog.exportJSON);
//   blog.fetchFromDB();
// };


// blog.handleAddButton = function () {
//   $('#add-article-btn').on('click', function (e) {
//     var article = blog.buildArticle()
//     // Insert this new record into the DB, then callback to blog.clearAndFetch
//     // TODO: Trigger SQL here...
//
//   });
// };

// blog.handleUpdateButton = function () {
//   $('#update-article-btn').on('click', function () {
//     var id = $(this).data('article-id');
//     var article = blog.buildArticle();
//     article.id = id;
//
//     // Save changes to the DB:
//     // TODO: Trigger SQL here...
//
//     blog.clearAndFetch();
//   });
// };

// blog.handleDeleteButton = function () {
//   $('#delete-article-btn').on('click', function () {
//     var id = $(this).data('article-id');
//     // Remove this record from the DB:
//     webDB.execute(
//       // TODO: Add SQL here...
//       , blog.clearAndFetch);
//     blog.clearNewForm();
//   });
// };


// blog.loadArticleById = function (id) {
//   // Grab just the one article from the DB
//   webDB.execute(
//     // TODO: Add SQL here...
//
//     ,
//     function (resultArray) {
//       if (resultArray.length === 1) {
//         blog.fillFormWithArticle(resultArray[0]);
//       }
//     }
//   );
// };

// blog.fetchArticles = function(data, message, xhr) {
//   var eTag = xhr.getResponseHeader('eTag');
//   if (typeof localStorage.articlesEtag == 'undefined' || localStorage.articlesEtag != eTag) {
//     console.log('cache miss!');
//     localStorage.articlesEtag = eTag;
//
//     // Remove all prior articles from the DB, and from blog:
//     blog.articles = [];
//     webDB.execute(
//       // TODO: Add SQL here...
//       , blog.fetchJSON);
//   } else {
//     console.log('cache hit!');
//     blog.fetchFromDB();
//   }
// };

$(document).ready(function() {
  $.get('templates/template.handlebars', function(data) {
    console.log('1 template received!');
      Article.prototype.handlebarTest = Handlebars.compile(data);
    })
    .done(function() {
      console.log('2 Executing .init()');
      webDB.init(); // open database
      console.log('3 Database initialized');
    })
    .done(function() {
      console.log('4 Beginning to delete articles table');
      webDB.execute('DROP TABLE articles;', function() { // delete existing table
          console.log('5 deleted table!');
          console.log('6 Executing .setupTables()');
          webDB.setupTables();
          console.log('7 created table!');
          console.log('8 executing importArticlesFrom');
          webDB.importArticlesFrom('data/hackerIpsum.json');
          console.log('9 imported articles!');
          blog.truncateArticles();
          blog.hamburgerHandler();
          blog.tabHandler();
          blog.filterHandler();
        });
      });
      //  ETAG STUFF
      // $.get(templates/article.handlebars)
      // .done(checkForNewArticles)
      //
      // blog.checkForNewArticles = function() {
      // 	$.ajax({TYPE:’HEAD’, url: ‘scripts/hackerIpsum.json’, success: blog.fetchArticles})
      //     .done(function(data, msg, xhr) {
      //       if (forEach(xhr.responseHeader[‘eTag’])) {
      //         localStorage.articleTag = 'eTag';
      //         $.getJSON('scripts/hackerIpsum.json')
      //
      // }
      // }
      // }
});
