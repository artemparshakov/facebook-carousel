$(document).ready(function() {
    var carouselReel = $('.slider__reel'),
        carouselCards = $('.slider__card'),
        carousel = $('.slider'),
        cardsCount = carouselCards.length,
        index = 0,
        leftPosition = 0,
        widthOfCard = carouselCards.eq(0).width(),
        restVisibleAreaFullWidth = carousel.width() - widthOfCard;

    var init = function() {
        onEdgeCard(index);
    };

    var onEdgeCard = function(index) {
        if (index === undefined) {
            carousel.removeClass('on-edge-card');
            carousel.removeClass('on-edge-card-first');
            carousel.removeClass('on-edge-card-last');
            carousel.addClass('in-the-middle');
            return;
        }

        var className = 'on-edge-card';
        className += (index === 0) ? ' on-edge-card-first' : ' on-edge-card-last';
        carousel.addClass(className);
        carousel.removeClass('in-the-middle');
    };

    var setLeftPosition = function(position) {
        carouselReel.css({ 'left': position });
    };

    var nextCardIsLast = function() {
        return (cardsCount - 1) === index;
    };

    var nextCardIsFirst = function() {
        return 0 === index;
    };

    var move = function() {
        if (nextCardIsLast()) {
            leftPosition = -(widthOfCard * (index - 1) + (widthOfCard - restVisibleAreaFullWidth));
            onEdgeCard(index);
        }
        else if (nextCardIsFirst()) {
            leftPosition = 0;
            onEdgeCard(index);
        }
        else {
            leftPosition = -(widthOfCard * (index - 1) + (widthOfCard - restVisibleAreaFullWidth/2));
            onEdgeCard();
        }
    };

    $('[data-nav=prev]').on('click', function() {
        index = (index-1) < 0 ? index : index - 1;
        move();
        setLeftPosition(leftPosition);
    });

    $('[data-nav=next]').on('click', function() {
        index = index < (cardsCount-1) ? index + 1 : index;
        move();
        setLeftPosition(leftPosition);
    });

    setLeftPosition(leftPosition);
    init();
});