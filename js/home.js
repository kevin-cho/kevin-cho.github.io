"use strict";

$(document).ready(function() {
  $('#icon-github').hover(function() {
    $('#link-description').html('Beware of awful high school code.');
    $('.flipper-front').css('background-image', 'url(images/octocat/original-circle.png)');
  });
  $('#icon-linkedin').hover(function() {
    $('#link-description').html('Work + education. My professional life.');
    $('.flipper-front').css('background-image', 'url(images/octocat/octoclark-kentocat-circle.png)');
  });
  $('#icon-steam').hover(function() {
    $('#link-description').html('I do have a life outside of school and work ;)');
    $('.flipper-front').css('background-image', 'url(images/octocat/jetpacktocat-circle.png)');
  });
  $('#icon-hummingbird').hover(function() {
    $('#link-description').html('Many hours invested in watching anime.');
    $('.flipper-front').css('background-image', 'url(images/octocat/saketocat-circle.png)');
  });
  $('#icon-email').hover(function() {
    $('#link-description').html('Contact me if you wish, cheers.');
    $('.flipper-front').css('background-image', 'url(images/octocat/supportcat-circle.png)');
  });

  $('.flipper').mouseout(function() {
    $('.flipper-front').css('background-image', 'url(images/kevin-2.png)');
  });
});
