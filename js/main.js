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
    // const imageContainer = document.getElementById('imageContainer');
    // const selectionBox = document.getElementById('selectionBox');

    // let isDragging = false; 
    // let startX = 0, startY = 0;

    // const selectionMargin = 50; 

    // document.querySelectorAll('.point').forEach((point) => {
    //     point.addEventListener('mousedown', (e) => {
    //         e.stopPropagation(); 
    //         e.preventDefault();

    //         const rect = point.getBoundingClientRect();
    //         const containerRect = imageContainer.getBoundingClientRect();

    //         const x = rect.left - containerRect.left - selectionMargin;
    //         const y = rect.top - containerRect.top - selectionMargin;
    //         const width = rect.width + selectionMargin * 2;
    //         const height = rect.height + selectionMargin * 2;

    //         selectionBox.style.left = `${x}px`;
    //         selectionBox.style.top = `${y}px`;
    //         selectionBox.style.width = `${width}px`;
    //         selectionBox.style.height = `${height}px`;
    //         selectionBox.style.display = 'block';
    //     });
    // });

    // imageContainer.addEventListener('mousedown', (e) => {
    //     if (e.target.classList.contains('point')) {
    //         return;
    //     }

    //     e.preventDefault();
    //     isDragging = true;

    //     startX = e.offsetX;
    //     startY = e.offsetY;

    //     selectionBox.style.left = `${startX}px`;
    //     selectionBox.style.top = `${startY}px`;
    //     selectionBox.style.width = `0px`;
    //     selectionBox.style.height = `0px`;
    //     selectionBox.style.display = 'block';
    // });

    // imageContainer.addEventListener('mousemove', (e) => {
    //     if (!isDragging) return;

    //     e.preventDefault();

    //     const currentX = e.offsetX;
    //     const currentY = e.offsetY;

    //     const width = Math.abs(currentX - startX);
    //     const height = Math.abs(currentY - startY);

    //     const left = Math.min(currentX, startX);
    //     const top = Math.min(currentY, startY);

    //     selectionBox.style.left = `${left}px`;
    //     selectionBox.style.top = `${top}px`;
    //     selectionBox.style.width = `${width}px`;
    //     selectionBox.style.height = `${height}px`;
    // });

    // imageContainer.addEventListener('mouseup', () => {
    //     isDragging = false;
    // });

    // document.addEventListener('click', (e) => {
    //     if (!imageContainer.contains(e.target)) {
    //         selectionBox.style.display = 'none';
    //     }
    // });


    if ($("#imageContainer").length > 0) {

        const imageContainer = document.getElementById('imageContainer');
        const selectionBox = document.getElementById('selectionBox');

        let isDragging = false;
        let startX = 0, startY = 0;
        let isClickOnPoint = false;

        const selectionMargin = 50;

        document.querySelectorAll('.point').forEach((point) => {
            point.addEventListener('mousedown', (e) => {
                e.stopPropagation();
                e.preventDefault();

                isClickOnPoint = true; // Позначаємо, що кліком обрано точку

                const rect = point.getBoundingClientRect();
                const containerRect = imageContainer.getBoundingClientRect();

                const x = rect.left - containerRect.left - selectionMargin;
                const y = rect.top - containerRect.top - selectionMargin;
                const width = rect.width + selectionMargin * 2;
                const height = rect.height + selectionMargin * 2;

                selectionBox.style.left = `${x}px`;
                selectionBox.style.top = `${y}px`;
                selectionBox.style.width = `${width}px`;
                selectionBox.style.height = `${height}px`;
                selectionBox.style.display = 'block';
            });
        });

        imageContainer.addEventListener('mousedown', (e) => {
            // Якщо клік був на точці, не запускаємо створення нового виділення
            if (e.target.classList.contains('point')) {
                isClickOnPoint = true;
                return;
            }

            // Скидаємо флаг, що це клік по точці
            isClickOnPoint = false;

            e.preventDefault();
            isDragging = true;

            startX = e.offsetX;
            startY = e.offsetY;

            selectionBox.style.left = `${startX}px`;
            selectionBox.style.top = `${startY}px`;
            selectionBox.style.width = `0px`;
            selectionBox.style.height = `0px`;
            selectionBox.style.display = 'block';
        });

        imageContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            e.preventDefault();

            const currentX = e.offsetX;
            const currentY = e.offsetY;

            const width = Math.abs(currentX - startX);
            const height = Math.abs(currentY - startY);

            const left = Math.min(currentX, startX);
            const top = Math.min(currentY, startY);

            selectionBox.style.left = `${left}px`;
            selectionBox.style.top = `${top}px`;
            selectionBox.style.width = `${width}px`;
            selectionBox.style.height = `${height}px`;
        });

        imageContainer.addEventListener('mouseup', () => {
            isDragging = false;
            if (!isClickOnPoint) {
                // Якщо це не клік на точці, виділяємо всю картинку при звичайному кліку
                if (selectionBox.style.width === '0px' && selectionBox.style.height === '0px') {
                    const imageRect = imageContainer.getBoundingClientRect();
                    const width = imageRect.width * 0.9;
                    const height = imageRect.height * 0.9;
                    selectionBox.style.left = `${(imageRect.width - width) / 2}px`;
                    selectionBox.style.top = `${(imageRect.height - height) / 2}px`;
                    selectionBox.style.width = `${width}px`;
                    selectionBox.style.height = `${height}px`;
                }
            }
        });

        document.addEventListener('click', (e) => {
            if (!imageContainer.contains(e.target)) {
                selectionBox.style.display = 'none';
            }
        });

    }

    // scroll to solution
    $(".scrolllink").on("click", "a", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top - 80;
        $('body,html').animate({ scrollTop: top }, 800);
    });

    // back
    if ($(".back").length > 0) {
        document.querySelector('.back').addEventListener('click', function (event) {
            event.preventDefault();
            window.history.back();
        });
    }

});