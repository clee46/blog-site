function unique(collection) {
  var length = collection ?collection.length : 0;

  if (!length) {return [];}
  var seen = [];
  collection.forEach(function(e) {
    // if (seen.indexOf(e))
  })
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
    $numberofArticles(blog);
    $numberofAuthors(blog);
  ])
}
function renderStats(blog) {
  $('#stats').replaceWith($statsComponent(blog));
}


function renderError (message, xhr) {
  $('#stats').replaceWith()
}



function stats(data, message, xhr) {
  if (xhr.status !=200){
    renderError(message,xhr);
  } else {
      renderStats(data);
    }
}
