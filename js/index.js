(function() {
  "use strict";

  $(document).ready(function() {
    $('#fullpage').fullpage({
      anchors: ['Home', 'About', 'Interests'],
      slidesNavigation: true,
      recordHistory: false,

      onLeave: function(index, nextIndex, direction) {
        if (index === 1) {
          $('.icon-btn').css('color', '#FCFCFC');
        }
      },
      afterLoad: function(anchorLink, index) {
        if (index === 1) {
          $('.icon-btn').css('color', '#333');
        }
      }
    });
  });
})();
