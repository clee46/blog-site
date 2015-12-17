page('/', articlesController.index);
page('/about', reposController.index);
page('/stats', statsController.index);
page.start();

page('/category/:category', articlesController.category, articlesController.show);
