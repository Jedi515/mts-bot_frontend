$('.menu-nav').on('click', function(e){
    e.PreventDefault;
    $(this).toggleClass('menu-nav_active');
    $('.menu-btn').toggleClass('menu-btn_active');
  });