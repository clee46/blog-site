$(document).ready(function() {
  webDB.init();
  console.log('database initialized');
  blog.initNewArticlePage();
  blog.handleAddButton();
  blog.handleUpdateButton();
  blog.handleDeleteButton();
});
