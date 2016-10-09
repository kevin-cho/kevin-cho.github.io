/* Credit goes to https://github.com/tw2113/WordPress-Starter-Theme/blob/master/js/konami.js */

(function() {
  "use strict";
  
  var konamiKeys = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  var started = false;
  var index = 0;

  $(document).keydown(function(e) {
    var key = e.keyCode;

    if (!started && key == 38) {
      started = true;
    }

    if (started) {
      if (konamiKeys[index] == key) {
        index++;
      } else {
        reset();
      }
      if (index == 10) {
        window.location.href = 'mario.html';
        reset();
      }
    } else {
      reset();
    }
  });

  function reset() {
    started = false;
    index = 0;
    return;
  }
})();
