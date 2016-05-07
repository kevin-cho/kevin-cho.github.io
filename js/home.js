(function() {
  "use strict";

  var fadeOutVal = 100;
  var fadeInVal = 200;
  var responseWidth = 550;
  var slideVal = 750;
  var colour = {
    white: '#FFF',
    black: '#333'
  };
  var workInfo = {
    infomax: {
      title: 'InfoMax Technologies',
      shorttitle: 'INFOMAX',
      sub: 'Junior Programmer',
      description: 'Work in progress.',
      url: 'http://www.e-infomax.com/'
    },
    qualicom: {
      title: 'Qualicom Innovations',
      shorttitle: 'QUALICOM',
      sub: 'Programmer Trainee',
      description: 'Work in progress.',
      url: 'http://www.qualicom.com/'
    },
    crosschasm: {
      title: 'CrossChasm Technologies',
      shorttitle: 'CROSSCHASM',
      sub: '.NET Application Developer',
      description: 'Work in progress.',
      url: 'http://www.crosschasm.com/'
    },
    visioncritical: {
      title: 'Vision Critical Communications',
      shorttitle: 'VISIONCRITICAL',
      sub: 'Software Developer',
      description: 'Work in progress.',
      url: 'https://www.visioncritical.com/'
    }
  };
  var linkInfo = {
    github: {
      description: 'Beware of awful high school code.',
      image: 'github-logo.png'
    },
    linkedin: {
      description: 'Work + education. My professional life.',
      image: 'formal-logo.png'
    },
    steam: {
      description: 'I do have a life outside of school and work ;)',
      image: 'gaming-logo.png'
    },
    hummingbird: {
      description: 'Many hours invested in watching anime.',
      image: 'hummingbird-logo.png'
    },
    email: {
      description: 'Contact me if you wish, cheers.',
      image: 'mail-logo.png'
    }
  };
  var workPanelSlide = false;

  function changeOnMouseover(text, image) {
    $('#link-description').html(text);
    
    $('.flipper-front').fadeOut(fadeOutVal, function() {
      $('.flipper-front').css('background-image', 'url(images/' + image + ')');
    });
    $('.flipper-front').fadeIn(fadeInVal);
  }

  function resetTabStyle() {
    $('.tab-panel > div').css('background-color', colour.white);
    $('.tab-panel > div').css('color', colour.black);
  }

  function setTabFocusStyle(element) {
    element.css('background-color', colour.black);
    element.css('color', colour.white);
  }

  function setWorkInfo(info) {
    var changeElement = $('.work-title, .work-title-sub, .work-panel > .description');
    changeElement.fadeOut(fadeOutVal, function() {
      $('.work-title').html('<a href="' + info.url + '" class="work-link">' + info.title + '</a>');
      $('.work-title-sub').html(info.sub);
      $('.work-panel > .description').html(info.description);
    });
    changeElement.fadeIn(fadeInVal);
  }

  function checkWidth() {
    if ($(window).width() < responseWidth) {
      $('#tab-infomax').html('I');
      $('#tab-qualicom').html('Q');
      $('#tab-crosschasm').html('C');
      $('#tab-visioncritical').html('V');
    } else {
      $('#tab-infomax').html(workInfo.infomax.shorttitle);
      $('#tab-qualicom').html(workInfo.qualicom.shorttitle);
      $('#tab-crosschasm').html(workInfo.crosschasm.shorttitle);
      $('#tab-visioncritical').html(workInfo.visioncritical.shorttitle);
    }
  }

  $(document).ready(function() {
    $('#icon-github').mouseover(function() {
      changeOnMouseover(linkInfo.github.description, linkInfo.github.image);
    });
    $('#icon-linkedin').mouseover(function() {
      changeOnMouseover(linkInfo.linkedin.description, linkInfo.linkedin.image);
    });
    $('#icon-steam').mouseover(function() {
      changeOnMouseover(linkInfo.steam.description, linkInfo.steam.image);
    });
    $('#icon-hummingbird').mouseover(function() {
      changeOnMouseover(linkInfo.hummingbird.description, linkInfo.hummingbird.image);
    });
    $('#icon-email').mouseover(function() {
      changeOnMouseover(linkInfo.email.description, linkInfo.email.image);
    });

    $('.flipper').mouseout(function() {
      $('.flipper-front').css('background-image', 'url(images/kevin-2.png)');
    });

    $('.tab-panel > div').click(function() {
      if (!workPanelSlide) {
        workPanelSlide = true;
        $('.work-panel').slideDown(slideVal);
      }

      resetTabStyle();
      setTabFocusStyle($(this));

      var tabId = $(this).attr('id');
      switch (tabId) {
        case 'tab-infomax':
          setWorkInfo(workInfo.infomax);
          break;
        case 'tab-qualicom':
          setWorkInfo(workInfo.qualicom);
          break;
        case 'tab-crosschasm':
          setWorkInfo(workInfo.crosschasm);
          break;
        case 'tab-visioncritical':
          setWorkInfo(workInfo.visioncritical);
          break;
        default:
          console.log('Error: Tab "' + tabId + '" does not exist.');
      }
    });

    checkWidth();
    $(window).resize(checkWidth);
  });
})();
