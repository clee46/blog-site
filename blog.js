var blog = {};
blog.library = [];

blog.createAll = function() {
  this.rawData.sort(function (a, b) {
    if (a.publishedOn > b.publishedOn) {return -1;}
    if (a.publishedOn < b.publishedOn) {return 1;}
    return 0;
  });
  for (var i = 0; i < this.rawData.length; i++) {
    var temp = new Article(this.rawData[i]);
    this.library.push(temp);
    temp.toHTML();
    temp.tagsDropDown();
  }
};
blog.truncateArticles = function() {
  $('article .postBody p:not(:first-child)').hide();  // hides all posts
  $('main').on('click', '.read-on', function(event) {
   event.preventDefault();
  $(this).siblings('.postBody').find('p:not(:first-child)').toggle();
 });
};
blog.hamburgerHandler = function() {
  $( ".cross" ).hide();
  $( ".menu" ).hide();

  $( ".hamburger" ).click(function() {
    $( ".menu" ).slideToggle( "slow", function() {
      $( ".hamburger" ).hide();
      $( ".cross" ).show();
    });
    $( "#filters" ).css('position', 'relative');
    $( "#filters" ).css('margin-top', '49px');
    $( "#filters" ).css('z-index', '1');
    $( ".articlePosts").css('top', '12px');
  });

  $( ".cross" ).click(function() {
    $( ".menu" ).slideToggle( "slow", function() {
      $( ".cross" ).hide();
      $( ".hamburger" ).show();
      $( "#filters" ).css('position', 'fixed');
      $( "#filters" ).css('margin-top', '30px');
      $( "#filters" ).css('z-index', '999999');
      $( ".articlePosts").css('top', '100px');
    });
  });
  // event handler for hamburger menu
  $('.menu > ul > li > a').click(function(event){
  		event.preventDefault();//stop browser to take action for clicked anchor

  		//get displaying tab content jQuery selector
  		var active_tab_selector = $('.nav-tabs > li.active > a').attr('href');

  		//find actived navigation and remove 'active' css
  		var actived_nav = $('.nav-tabs > li.active');
  		actived_nav.removeClass('active');

  		//add 'active' css into clicked navigation
  		$(this).parents('li').addClass('active');

  		//hide displaying tab content
  		$(active_tab_selector).removeClass('active');
  		$(active_tab_selector).addClass('hide');

  		//show target tab content
  		var target_tab_selector = $(this).attr('href');
  		$(target_tab_selector).removeClass('hide');
  		$(target_tab_selector).addClass('active');
      $( ".cross" ).hide();
      $( ".hamburger" ).show();
      $( ".menu" ).hide();
  });
};
blog.tabHandler = function() {
  // event handler for tab menu
  $('.nav-tabs > li > a').click(function(event){
  		event.preventDefault();//stop browser to take action for clicked anchor

  		//get displaying tab content jQuery selector
  		var active_tab_selector = $('.nav-tabs > li.active > a').attr('href');

  		//find actived navigation and remove 'active' css
  		var actived_nav = $('.nav-tabs > li.active');
  		actived_nav.removeClass('active');

  		//add 'active' css into clicked navigation
  		$(this).parents('li').addClass('active');

  		//hide displaying tab content
  		$(active_tab_selector).removeClass('active');
  		$(active_tab_selector).addClass('hide');

  		//show target tab content
  		var target_tab_selector = $(this).attr('href');
  		$(target_tab_selector).removeClass('hide');
  		$(target_tab_selector).addClass('active');
  });
};
blog.filterHandler = function() {
  // event handler for category filter menu
  $('select[id="category"]').change(function(){
    $('#author').find('option:first').attr('selected', 'selected'); // reset other menu
    $('main').find('article').show();
    if ($(this).val() !== 'none'){
      $('.postCategory:not(:contains(' + $(this).val() + '))').parent().hide();
    }
  });
  // event handler for author filter menu
  $('select[id="author"]').change(function(){
    $('#category').find('option:first').attr('selected', 'selected'); // reset other menu
    $('main').find('article').show();
    if ($(this).val() !== 'none'){
      $("article:not(:contains(" + $(this).val() + "))").hide();
    }
  });
};

$(document).ready(function() {
  $.get('hackerIpsum.json').done(function(data) {
    blog.rawData = data;
    localStorage.setItem('rawData', JSON.stringify(blog.rawData));
    $.get('template.handlebars', function(data) {
      Article.prototype.handlebarTest = Handlebars.compile(data);})
      .done(function() {
        blog.createAll();
        blog.truncateArticles();
        blog.hamburgerHandler();
        blog.tabHandler();
        blog.filterHandler();
      });
    });
});
