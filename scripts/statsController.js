var statsController = {};

statsController.index = function() {
  console.log('-> statsController.index');
  $('#stats').show();
  $('#about').hide();
  $('#articles').hide();
  statsView.render();
};
