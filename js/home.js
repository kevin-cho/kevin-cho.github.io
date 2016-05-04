(function() {
  "use strict";

  var fadeOutVal = 100;
  var fadeInVal = 200;

  function changeOnMouseover(text, image) {
    $('#link-description').html(text);
    
    $('.flipper-front').fadeOut(fadeOutVal, function() {
      $('.flipper-front').css('background-image', 'url(images/' + image + ')');
    });
    $('.flipper-front').fadeIn(fadeInVal);
  }

  $(document).ready(function() {
    $('#icon-github').mouseover(function() {
      changeOnMouseover('Beware of awful high school code.', 'github-logo.png');
    });
    $('#icon-linkedin').mouseover(function() {
      changeOnMouseover('Work + education. My professional life.', 'formal-logo.png');
    });
    $('#icon-steam').mouseover(function() {
      changeOnMouseover('I do have a life outside of school and work ;)', 'gaming-logo.png');
    });
    $('#icon-hummingbird').mouseover(function() {
      changeOnMouseover('Many hours invested in watching anime.', 'hummingbird-logo.png');
    });
    $('#icon-email').mouseover(function() {
      changeOnMouseover('Contact me if you wish, cheers.', 'mail-logo.png');
    });

    $('.flipper').mouseout(function() {
      $('.flipper-front').css('background-image', 'url(images/kevin-2.png)');
    });
  });
})();
