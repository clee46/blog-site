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
  }
}
$(document).ready(function() {
  blog.createAll();
});
