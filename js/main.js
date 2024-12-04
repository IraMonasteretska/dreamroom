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
    $(function () {
        if ($("#slider").length > 0) {
            $("#slider").slider({
                min: 50,
                max: 200,
                value: 125,
                slide: function (event, ui) {
                    $(".image-box > img").css("transform", `scale(${ui.value / 100})`);
                },
            });

            $(".image-box").click(function () {
                var previewImg = $(this).children("img");

                $(this)
                    .siblings()
                    .children("input")
                    .trigger("click");

                $(this)
                    .siblings()
                    .children("input")
                    .off("change")
                    .change(function () {
                        var reader = new FileReader();

                        reader.onload = function (e) {
                            var urll = e.target.result;
                            $(previewImg).attr("src", urll);
                            previewImg.parent().css("background", "transparent");
                            previewImg.show();
                            previewImg.siblings("p").hide();

                            $(previewImg).siblings(".remove-btn").show();

                            $("#slider").slider("value", 125);
                            $(".image-box > img").css("transform", "scale(1)");
                        };

                        reader.readAsDataURL(this.files[0]);
                    });
            });

            $(".remove-btn").click(function (event) {
                event.stopPropagation();
                var previewImg = $(this).siblings("img");
                var inputField = $(this).closest(".control-group").find("input[type='file']");

                previewImg.attr("src", "");
                previewImg.parent().css("background", "");
                previewImg.hide();
                previewImg.siblings("p").show();

                $(this).hide();

                $("#slider").slider("value", 125);
                $(".image-box > img").css("transform", "scale(1)");

                inputField.val("");
            });
        }
    });



    // design style - scroll
    if ($(".designswrappers").length > 0) {
        document.querySelector(".designswrappers").addEventListener("wheel", function (event) {
            event.preventDefault();
            this.scrollLeft += event.deltaY;
        });
    }

    // fancybox
    if ($("[data-fancybox]").length > 0) {
        Fancybox.bind("[data-fancybox]", {
            // Your custom options
        });
    }


    // TEST
    


});