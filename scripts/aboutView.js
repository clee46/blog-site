var aboutView = {};

aboutView.index = function() {
  aboutView.ui();
  console.log(repos);
  var _append = function(repo) {
    // console.log(repo);
    $('#about ul').append(aboutView.render(repo));
  };

  repos.all.forEach(_append);

  // repos.all.filter(function(repo) {
  //   console.log(repo.stargazers_count);
  //   return repo.stargazers_count;
  // }).forEach(_append);
};

aboutView.render = function(repo) {
  // console.log(repo);
  return $('<li>').text(repo.full_name);
};

aboutView.ui = function() {
  var $about = $('#about');
  var $ul = $about.find('ul');

  $ul.empty();
  $about.fadeIn().siblings().hide();
};
