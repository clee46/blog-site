function Article (opts) {
  Object.keys(opts).forEach(function(e,index,keys) {
    this[e] = opts[e];
  },this);
  this.authorUrl = opts.authorUrl;
  this.age = this.postAge(this.publishedOn);
  this.body = opts.body || marked(this.markdown);
}
Article.prototype.postAge = function(date) {
  console.log('-> Article.postAge');
  var d1 = parseInt(new Date().getDate());
  var m1 = parseInt(new Date().getMonth()+1); //January is 0!
  var y1 = parseInt(new Date().getFullYear());
  var d2 = parseInt(date.slice(8,10));
  var m2 = parseInt(date.slice(5,7));
  var y2 = parseInt(date.slice(0,4));
  return Math.round(Math.abs((new Date(y2,m2,d2).getTime() - new Date(y1,m1,d1).getTime())/(24*60*60*1000)));
};
Article.prototype.toHTML = function () {
  console.log('-> Article.toHTML');
  var age = this.postAge(this.publishedOn);
  var html = this.handlebarTest(this);
  $('#app').append(html);
  return html;
};
Article.prototype.tagsDropDown = function() {
  console.log('-> Article.tagsDropDown');
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
Article.prototype.insertRecord = function(callback) {
  console.log('-> Article.insertRecord');
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
  console.log('-> Article.updateRecord');
  webDB.execute(
    'UPDATE articles SET title="' + this.title + '", author="' + this.author + '", authorUrl="' + this.authorUrl + '", category="' + this.category + '", publishedOn="' + this.publishedOn + '", markdown="' + this.markdown + '" WHERE id="' + this.id + '";'
    ,
    callback
  );
};
Article.prototype.deleteRecord = function(callback) {
  console.log('-> Article.deleteRecord');
  webDB.execute(
    [{
      'sql': 'DELETE FROM articles WHERE id = ?;',
      'data': [this.id]
    }]
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
  var count = 0;
  console.log('-> Article.requestAll');
  $.getJSON('/data/hackerIpsum.json', function (data) {
    data.forEach(function(item) {

      var article = new Article(item);
      article.insertRecord();
      count++;
      console.log(count);
    });
    next(callback);
  });
};

Article.loadAll = function(callback) {
  console.log('-> Article.loadAll');
  var callback = callback || function() {};

  if (Article.all.length === 0) {
    webDB.execute('SELECT * FROM articles ORDER BY publishedOn;',
      function(rows) {
        if (rows.length === 0) {
          // Request data from server, then try loading from db again:
          Article.requestAll(Article.loadAll, callback);
        } else {
          rows.forEach(function(row) {
            Article.all.push(new Article(row));
          });
          callback();
        }
      }
    );
  } else {
    callback();
  }
};
