page('/', articlesController.index);

page('/about', reposController.index);

// page('/about', function() {
//   console.log('going to about');
//   $('#about').show();
//   $('#stats').hide();
//   $('#articles').hide();
// });

page('/stats', function() {
  console.log('going to stats');
  $('#stats').show();
  $('#about').hide();
  $('#articles').hide();
});

page.start();
