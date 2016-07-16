//seperate from the main .js file so as to not corrupt working code

var ctaBtn = $('.cta_btn');
    header = $('header');

ctaBtn.hover(function(){
  header.toggleClass('explore');
});