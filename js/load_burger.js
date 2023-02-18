fetch("./burger.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector("header").innerHTML = data;
    $('.menu-btn').on('click', function(e){
      e.PreventDefault;
      $(this).toggleClass('menu-btn_active');
      $('.menu-nav').toggleClass('menu-nav_active');
    });
  });