$(document).ready(function() {
  $.get('../template/template.handlebars', function(data) {
      Article.prototype.handlebarTest = Handlebars.compile(data);
      // blog.loadArticles();
    })
    .done(function() {
      webDB.init(); // open database
    })
    .done(function() {
      webDB.execute('DROP TABLE articles;', function() { // delete existing table
          webDB.setupTables();
          webDB.importArticlesFrom('data/hackerIpsum.json');
        });
      })
        .done(function() {
          blog.hamburgerHandler();
          blog.tabHandler();
          blog.filterHandler();

          // $('pre code').each(function(i, block) {
          //   hljs.highlightBlock(block);
          // });

        });
      //  ETAG STUFF
      // $.get(templates/article.handlebars)
      // .done(checkForNewArticles)
      //

});
