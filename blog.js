var blog = {};
blog.library = [];

blog.createAll = function() {
  this.rawData.sort(function (a, b) {
  if (a.publishedOn > b.publishedOn) {return -1;}
  if (a.publishedOn < b.publishedOn) {return 1;}
  return 0;
  });
  for (var i = 0; i < this.rawData.length; i++) {
    var temp = new Article(this.rawData[i]);
    this.library.push(temp);
    temp.toHTML();
    temp.tagsDropDown();
  }
};
blog.truncateArticles = function() {
  $('article .postBody p:not(:first-child)').hide();
  $('main').on('click', '.read-on', function(event) {
   event.preventDefault();
   $(this).parent().find('p').show();
   $(this).hide();
 });
};

// blog.filterByCategory = function() {
//
// }
$(document).ready(function() {
  blog.createAll();
  $('#post').remove();    // remove the original article template
  blog.truncateArticles();



  $('select[id="category"]').change(function(){
    $('#author').find('option:first').attr('selected', 'selected');
    $('main').find('article').show();
    console.log($(this).val());
    $('main').find('article:not(.' + $(this).val() + ')').hide();
  });

  $('select[id="author"]').change(function(){
    $('#category').find('option:first').attr('selected', 'selected');
    $('main').find('article').show();
    console.log($(this).val());
    $("article:not(:contains(" + $(this).val() + "))").hide();
    // $('main').find('article:not(p.postAuthor:contains(' + $(this).val() + '))').hide;
  });
});

// hide P elements (blog.truncateArticles)
// $('article p:not:first-child').hide();
// $('main').on('click', '.read-on', function(event) {
//  event.preventDefault();
//  $(this.parent()).find('p').show();
//  $(this).hide();
// })
// read A elements
// .on('click')
// .reveal();


// icomoon.io
// .hide();
// $('#' + $(this).data('content')).fadeIn();
