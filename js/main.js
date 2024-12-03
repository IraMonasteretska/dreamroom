$(document).ready(function () {

    var swiper = new Swiper(".mainslider", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 1500,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            formatFractionCurrent: function (number) {
                return number < 10 ? '0' + number : number; // Додаємо 0 перед одиничними числами
            },
            formatFractionTotal: function (number) {
                return number < 10 ? '0' + number : number; // Те ж саме для загальної кількості
            },
            renderFraction: function (currentClass, totalClass) {
                return `<span class="${currentClass}"></span>/<span class="${totalClass}"></span>`;
            },
        },
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: true,
        },
    });


    $(".after-before").twentytwenty();

    $('.menubtn').click(function () {
        $('.mobilemenu').addClass('show');
    });
    $('.closemenu').click(function () {
        $('.mobilemenu').removeClass('show');
    });

    // upload

  



    // design style - scroll
    if ($(".designswrappers").length > 0) {
        document.querySelector(".designswrappers").addEventListener("wheel", function (event) {
            event.preventDefault();
            this.scrollLeft += event.deltaY;
        });
    }

});