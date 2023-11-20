$(document).ready(function(){
    var slideCount = $('.slide').length;
    var slideWidth = $('.slide').width() + parseInt($('.slide').css('margin-right'));
    var slideMargin = parseInt($('.slide').css('margin-right'));

    var totalWidth = (slideWidth + slideMargin) * slideCount;
    $('.slider').css('width', totalWidth);

    function slide() {
        $('.slider').animate({
            marginLeft: '-' + (slideWidth + slideMargin)
        }, 1000, function () {
            $('.slider .slide:first').appendTo('.slider');
            $('.slider').css('margin-left', '0');
        });
    }

    function slidePrevious() {
        $('.slider .slide:last').prependTo('.slider');
        $('.slider').css('margin-left', -(slideWidth + slideMargin));
        $('.slider').animate({
            marginLeft: '0'
        }, 1000);
    }

    var slideInterval = setInterval(slide, 3000);

    $('.slider-button.prev').on('click', function() {
        clearInterval(slideInterval);
        slidePrevious();
        slideInterval = setInterval(slide, 3000);
    });

    $('.slider-button.next').on('click', function() {
        clearInterval(slideInterval);
        slide();
        slideInterval = setInterval(slide, 3000);
    });
});
