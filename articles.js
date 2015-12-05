// Article constructor creates a new article object from the blog raw data
function Article (props) {
  this.title = props.title;
  this.category = props.category;
  this.author = props.author;
  this.authorUrl = props.authorUrl;
  this.publishedOn = props.publishedOn;
  this.body = props.body;
  this.age = this.postAge(this.publishedOn);
}
// Article method to calculate age of blog post
Article.prototype.postAge = function(date) {
  var today = new Date();
  var dd = parseInt(today.getDate());
  var mm = parseInt(today.getMonth()+1); //January is 0!
  var yyyy = parseInt(today.getFullYear());

  var year = parseInt(date.slice(0,4));
  var month = parseInt(date.slice(5,7));
  var day = parseInt(date.slice(8,10));

  var firstDate = new Date(year,month,day); // publish date
  var secondDate = new Date(yyyy,mm,dd);    // today's date

  return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(24*60*60*1000)));
}
// Article method to display a blog post to the DOM
Article.prototype.toHTML = function () {
  var age = this.postAge(this.publishedOn);
  var appTemplate = $('#entry-template').html();
  var compiledTemplate = Handlebars.compile(appTemplate);
  var html = compiledTemplate(this);
  $('#app').append(html);
}
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
