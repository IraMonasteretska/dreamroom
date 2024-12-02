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

    // $(function () {
    //     // Ініціалізуємо слайдер
    //     $("#slider").slider({
    //         min: 50, // Мінімальне значення
    //         max: 200, // Максимальне значення
    //         value: 125, // Початкове значення (посередині)
    //         slide: function (event, ui) {
    //             // При зміні значення слайдера
    //             $(".image-box > img").css("transform", `scale(${ui.value / 100})`);
    //         },
    //     });

    //     // Додамо функціонал завантаження зображення
    //     $(".image-box").click(function () {
    //         var previewImg = $(this).children("img");

    //         $(this)
    //             .siblings()
    //             .children("input")
    //             .trigger("click");

    //         $(this)
    //             .siblings()
    //             .children("input")
    //             .change(function () {
    //                 var reader = new FileReader();

    //                 reader.onload = function (e) {
    //                     var urll = e.target.result;
    //                     $(previewImg).attr("src", urll);
    //                     previewImg.parent().css("background", "transparent");
    //                     previewImg.show();
    //                     previewImg.siblings("p").hide();

    //                     // Скидаємо слайдер до значення за замовчуванням
    //                     $("#slider").slider("value", 125);
    //                     $(".image-box > img").css("transform", "scale(1)");
    //                 };
    //                 reader.readAsDataURL(this.files[0]);
    //             });
    //     });
    // });

    $(function () {
        // Ініціалізуємо слайдер
        $("#slider").slider({
            min: 50, // Мінімальне значення
            max: 200, // Максимальне значення
            value: 125, // Початкове значення (посередині)
            slide: function (event, ui) {
                // При зміні значення слайдера
                $(".image-box > img").css("transform", `scale(${ui.value / 100})`);
            },
        });

        // Додамо функціонал завантаження зображення
        $(".image-box").click(function () {
            var previewImg = $(this).children("img");

            $(this)
                .siblings()
                .children("input")
                .trigger("click");

            $(this)
                .siblings()
                .children("input")
                .change(function () {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        var urll = e.target.result;
                        $(previewImg).attr("src", urll);
                        previewImg.parent().css("background", "transparent");
                        previewImg.show();
                        previewImg.siblings("p").hide();

                        // Показуємо кнопку видалення
                        $(previewImg).siblings(".remove-btn").show();

                        // Скидаємо слайдер до значення за замовчуванням
                        $("#slider").slider("value", 125);
                        $(".image-box > img").css("transform", "scale(1)");
                    };
                    reader.readAsDataURL(this.files[0]);
                });
        });

        // Додаємо функціонал видалення зображення
        $(".remove-btn").click(function (event) {
            event.stopPropagation(); // Запобігаємо тригеру завантаження
            var previewImg = $(this).siblings("img");

            // Скидаємо блок до початкового стану
            previewImg.attr("src", "");
            previewImg.parent().css("background", "");
            previewImg.hide();
            previewImg.siblings("p").show();

            // Ховаємо кнопку видалення
            $(this).hide();

            // Скидаємо слайдер
            $("#slider").slider("value", 125);
            $(".image-box > img").css("transform", "scale(1)");
        });
    });


    // design style - scroll
    document.querySelector(".designswrappers").addEventListener("wheel", function (event) {
        event.preventDefault();
        this.scrollLeft += event.deltaY;
    });

});