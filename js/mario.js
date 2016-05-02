(function() {
    "use strict";

    var imgMarioBasicStand = "http://i.imgur.com/zm6xmOT.jpg";
    var imgMarioBasicJump = "http://i.imgur.com/BGYhIM1.png";
    var imgItemBlock = "http://i.imgur.com/Gc24df8.png";
    var imgFireFlower = "http://i.imgur.com/DbHuxfK.gif";
    var imgCoin = "http://i.imgur.com/VEIhO1V.gif";
    var imgStar = "http://i.imgur.com/yEaxeNP.gif";
    var imgMushroomRed = "http://i.imgur.com/GAsOpia.png";
    var imgMushroomGreen = "http://i.imgur.com/DqYXNSh.png";
    var imgGoomba = "http://i.imgur.com/yMFduDp.gif";
    var previousValue = 0;
    var isKeyDown = false;

    $(document).keydown(function(e) {
        // Space key
        if (e.which == 32) {
            if (!isKeyDown) {
                $("#gameSprite").attr("src", imgMarioBasicJump);
                spriteJump();

                $("#gameItem").attr("src", getItem());
                toggleItem();

                isKeyDown = true;
            }
            return false;
        }
    });

    $(document).keyup(function(e) {
        // Space key
        if (e.which == 32) {
            $("#gameSprite").attr("src", imgMarioBasicStand);
            spriteStand();

            toggleItem();

            isKeyDown = false;
            return false;
        }
    });

    function getItem() {
        var currentValue;
        do {
            currentValue = Math.floor((Math.random() * 6) + 1);
        } while (currentValue === previousValue);
        previousValue = currentValue;

        switch (currentValue) {
            case 1:
                return imgFireFlower;
            case 2:
                return imgCoin;
            case 3:
                return imgStar;
            case 4:
                return imgMushroomRed;
            case 5:
                return imgMushroomGreen;
            case 6:
                return imgGoomba;
            default:
                return imgCoin;
        }
    }

    function spriteJump() {
        var sprite = $("#gameSprite");
        sprite.removeClass("stand");
        sprite.addClass("jump");
    }

    function spriteStand() {
        var sprite = $("#gameSprite");
        sprite.removeClass("jump");
        sprite.addClass("stand");
    }

    function toggleItemBlock() {
        var block = $("#gameItemBlock");
        block.toggleClass("static");
        block.toggleClass("hit");
    }

    function toggleItem() {
        var item = $("#gameItem");
        item.toggleClass("float");
        item.toggleClass("land");
    }
})();

var gameTemplate = '<div id="gameArea" class="centreContent showContent"><img id="gameItem" src="http://i.imgur.com/ckC1CKK.png" class="centreContent showContent land"></img><img id="gameItemBlock" src="http://i.imgur.com/Gc24df8.png" class="centreContent showContent "></img><img id="gameSprite" src="http://i.imgur.com/zm6xmOT.jpg" class="centreContent showContent stand" align="bottom"></img></div>';

function marioInit(id) {
    $(id).append(gameTemplate);
}
