var webDB = {};
webDB.sqlResult = null;

webDB.verbose = function (verbose) {
  console.log('-> webDB.verbose');
  var msg;
  if (verbose) {
    html5sql.logInfo = true;
    html5sql.logErrors = true;
    html5sql.putSelectResultsInArray = true;
    msg = 'html5sql verbosity on';
  } else {
    html5sql.logInfo = false;
    html5sql.logErrors = false;
    html5sql.putSelectResultsInArray = false;
    msg = 'html5sql verbosity off';
  }
  console.log(msg);
};
webDB.init = function() {
  console.log('-> webDB.init');
  // Open and init DB
  try {
    if (openDatabase) {
      webDB.verbose(true);
      webDB.connect('blogDB', 'Blog Database', 5*1024*1024);
    } else {
      console.log('Web Databases not supported.');
    }
  } catch (e) {
    console.error('Error occured during DB init. Web Database may not be supported.');
  }
};
webDB.connect = function (database, title, size) {
  console.log('-> webDB.connect');
  html5sql.openDatabase(database, title, size);
};
webDB.setupTables = function () {
  console.log('-> webDB.setupTables');
  html5sql.process(
    'CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY, title VARCHAR(255) NOT NULL, author VARCHAR(255) NOT NULL, authorUrl VARCHAR (255), category VARCHAR(20), publishedOn DATETIME, markdown TEXT NOT NULL);',
    function() {}
  );
};
webDB.importArticlesFrom = function (path) {
  console.log('-> webDB.importArticlesFrom');
  // Import articles from JSON file
  $.getJSON(path, webDB.insertAllRecords).done(function() {
    // blog.fetchFromDB(blog.truncateArticles);
    blog.fetchFromDB(blog.handleMainNav);
  });
};
webDB.insertAllRecords = function (articles) {
  console.log('-> webDB.insertAllRecords');
  articles.forEach(webDB.insertRecord);
};
webDB.insertRecord = function (a) {
  console.log('-> webDB.insertRecord');
  // insert article record into database
  html5sql.process(
    [
      {
        'sql': 'INSERT INTO articles (title, author, authorUrl, category, publishedOn, markdown) VALUES (?, ?, ?, ?, ?, ?);',
        'data': [a.title, a.author, a.authorUrl, a.category, a.publishedOn, a.markdown],
      }
    ],
    function () {}
  );
};
webDB.execute = function (sql, callback) {
  console.log('-> webDB.execute');
  callback = callback || function() {};
  html5sql.process(
    sql,
    function (tx, result, resultArray) {
      callback(resultArray);
    }
  );
};
