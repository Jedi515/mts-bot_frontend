$('.menu-btn').on('click', function(e){
  e.PreventDefault;
  $(this).toggleClass('menu-btn_active');
  $('.menu-nav').toggleClass('menu-nav_active');
});