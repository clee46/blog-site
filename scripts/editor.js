$(document).ready(function() {
  webDB.init();
  console.log('database initialized');
  blog.initArticleEditorPage();
  blog.handleAddButton();
  blog.handleUpdateButton();
  blog.handleDeleteButton();
});
