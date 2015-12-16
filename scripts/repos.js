var repos = {};

repos.all = [];

repos.requestAll = function(callback) {
  $.ajax({
    type: 'GET',
    url: '/github/users/clee46'
  }).done(function(data) {
    repos.all = data;
  }).done(callback);
};
