// Article constructor creates a new article object from the blog raw data
function Article (opts) {
  Object.keys(opts).forEach(function(e,index,keys) {
    this[e] = opts[e];
  },this);
  this.authorUrl = opts.authorUrl;
  this.age = this.postAge(this.publishedOn);
  this.body = opts.body || marked(this.markdown);
}
// Article method to calculate age of blog post
Article.prototype.postAge = function(date) {
  var d1 = parseInt(new Date().getDate());
  var m1 = parseInt(new Date().getMonth()+1); //January is 0!
  var y1 = parseInt(new Date().getFullYear());
  var d2 = parseInt(date.slice(8,10));
  var m2 = parseInt(date.slice(5,7));
  var y2 = parseInt(date.slice(0,4));
  return Math.round(Math.abs((new Date(y2,m2,d2).getTime() - new Date(y1,m1,d1).getTime())/(24*60*60*1000)));
}
// Article method to display a blog post to the DOM
Article.prototype.toHTML = function () {
  // console.log(this);
  var age = this.postAge(this.publishedOn);
  var html = this.handlebarTest(this);
  // console.log(html);
  $('#app').append(html);
}

// Article.prototype.insertRecord = function(callback) {
//   // insert article record into database
//   webDB.execute(
//     // TODO: Add SQL here...
//     {'sql':'INSERT INTO articles (author, title, authorUrl, publishedOn, category, markdown)'}]
//
//      ,
//     callback
//   );
// };
// Article.prototype.updateRecord = function(callback) {
//   //update article record in databse
//   webDB.execute(
//     // TODO: Add SQL here...
//     ,
//     callback
//   );
// };
//
// Article.prototype.deleteRecord = function(callback) {
//   // Delete article record in database
//   webDB.execute(
//     // TODO: Add SQL here...
//     ,
//     callback
//   );
// };
//
// Article.prototype.truncateTable = function(callback) {
//   // Delete all records from given table.
//   webDB.execute(
//     'DELETE * FROM articles'
//     ,
//     callback
//   );
// };

// Article method to populate drop down menu
Article.prototype.tagsDropDown = function() {
  // Populate the category menu
  var $clonedMenuItem1 = $('.catMenuItem').clone();
  $clonedMenuItem1.removeAttr('class');  // essential so that you only clone the original template
  $clonedMenuItem1.attr('value', this.category);
  $clonedMenuItem1.text(this.category);
  if ($("#catFilter select").find('option[value="' + this.category + '"]').length === 0) {
    $('#catFilter select').append($clonedMenuItem1);
  }
  // Populate the authors menu
  var $clonedMenuItem2 = $('.authMenuItem').clone();
  $clonedMenuItem2.removeAttr('class');  // essential so that you only clone the original template
  $clonedMenuItem2.attr('value', this.author);
  $clonedMenuItem2.text(this.author);
  if ($("#authFilter select").find('option[value="' + this.author + '"]').length === 0) {
    $('#authFilter select').append($clonedMenuItem2);
  }
}
