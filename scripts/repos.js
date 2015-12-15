var repos = {};

repos.all = [];

repos.requestAll = function(callback) {
  // console.log('GitHubToken: ' + githubToken);
  //TODO: How would you like to fetch your repos?
  $.ajax({
    type: 'GET',
    url: 'https://api.github.com/users/clee46/repos?sort=updated',
    headers: { Authorization: 'token ' + githubToken}
  }).done(function(data) {
    repos.all = data;
  }).done(callback);
};
