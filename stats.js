function wordCount(collection) {
  var all = pluck('body', collection);
  var count = [];
  all.forEach(function(e) {
    var div = document.createElement("div");
    div.innerHTML = e;
    var text = div.textContent || div.innerText || "";
    count.push(text.split(' ').length);
  });
  var total = count.reduce(function(a,b) {return a + b;});
  return total;
}
function wordLength(collection) {
  var all = pluck('body', collection);
  var postWordCount = [];
  var count = [];
  var avgs = [];
  all.forEach(function(e) {
    var div = document.createElement("div");
    div.innerHTML = e;
    var text = div.textContent || div.innerText || "";
    count.push(text.split(' '));
  });
  // count inner array contains all words, outer array contains all posts
  count.forEach(function(e) { // for each post
    e.forEach(function(f) { // go through each word, count length of word
      postWordCount.push(f.length); // store length of each word
    });
  });
  var num = postWordCount.length; // num of words
  console.log('number of words: ' + num);
  // total number of characters
  var sum = postWordCount.reduce(function(a,b) {return a + b;});
  console.log('total characters: ' + sum);
  console.log('average word length is: ' + (sum/num));

  return sum/num;

}

function uniqueAuthors(collection) {
  var length = collection ?collection.length : 0;

  if (!length) {return [];}
  var seen = [];
  var all = pluck('author', collection);
  all.forEach(function(e) {
    if (seen.indexOf(e) === -1) {
      seen.push(e);
    }
  });
  console.log(seen);
  return seen;
}
function uniqueCategories(collection) {
  var length = collection ?collection.length : 0;
  var all = pluck('category', collection);
  if (!length) {return [];}
  var seen = [];
  all.forEach(function(e) {
    if (seen.indexOf(e) === -1) {
      seen.push(e);
    }
  });
  return seen;
}
function pluck(property, collection) {
  return collection.map(function(e){
    return e[property];
  });
}

var $statsComponent = function(blog) {
  var component = $('<div>');
  component.append([
    $headline,
    $numberofArticles(blog),
    $numberofAuthors(blog)
  ])
}
function renderStats(blog) {
  $('#stats').replaceWith($statsComponent(blog));
}

function renderError (message, xhr) {
  $('#stats').replaceWith()
}

function stats(data, message, xhr) {
  if (xhr.status !=200) {renderError(message,xhr);}
  else {renderStats(data);}
}

$(document).ready(function() {
  var fromLS = JSON.parse(localStorage.getItem('rawData'));
  $('#stats').append('Number of articles: ' + fromLS.length);
  $('#stats').append('<br/>Number of authors: ' + uniqueAuthors(fromLS).length);
  $('#stats').append('<br/>Number of categories: ' + uniqueCategories(fromLS).length);
  $('#stats').append('<br/>Number of words: ' + wordCount(fromLS));
  $('#stats').append('<br/>Average word length: ' + wordLength(fromLS));
});
