const frontend = (function () {
    function authorMarker() {
        console.log('%cExclusive Qurylys with Iskandarov Timur', 'color:#fff; background-color:#7eb621; padding: 8px 15px; font-size: 14px; border-radius: 4px; text-align:center');
    }

    function phoneValidator() {
        const phoneInputs = document.querySelectorAll('input[name="phone"]');

        phoneInputs.forEach((el) => {
            el.addEventListener('input', (e) => {
                clearMessages();
                const numberCodes = ['710', '711', '712', '713', '714', '715', '716', '717', '718', '721', '722', '723', '724', '725', '726', '727', '728', '729', '736', '700', '701', '702', '703', '704', '705', '706', '707', '708', '709', '747', '750', '751', '760', '761', '762', '763', '764', '771', '775', '776', '777', '778'];
                const x = e.target.value.replace(/\D/g, '').match(/(^\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);

                e.target.value = !x[3] ? `+${x[1]}${x[2]}` : `+${x[1]} (${x[2]}) ${x[3]}${x[4] ? `-${x[4]}` : ''}${x[5] ? `-${x[5]}` : ''}`;

                const errMess = document.createElement('span');

                errMess.classList.add('input-err');
                errMess.textContent = translater.no_valid_number;

                // console.log(numberCodes.indexOf(x[2]))
                if (x[3] && ((x[1] != '7') || (numberCodes.indexOf(x[2]) == -1))) {
                    el.parentNode.appendChild(errMess);
                } else {
                    clearMessages();
                }
            });
        });
    }

    function validatePhoneNumber(number) {
        if (number.match(/^\+\d{1} \(\d{3}\) \d{3}\-\d{2}\-\d{2}$/)) {
            return true;
        }

        return false;
    }

    function clearMessages() {
        const messAll = document.querySelectorAll('.input-err');

        messAll.forEach((el) => {
            el.remove();
        });
    }

    function formValidator(element) {
        let errors = false;
        const form = element;
        const inputs = form.querySelectorAll('input, textarea');
        const userName = form.querySelector('[name="name"]');
        let formQuery = new Object();

        const preloader = document.createElement('div');

        preloader.classList.add('form-preloader');
        form.appendChild(preloader);

        if (userName.value == '') {
            const label = userName.parentNode.querySelector('.callback-h__label');

            if (label) label.classList.add('callback-h__label--focus');

            userName.value = 'Не указано';
        }

        inputs.forEach((el) => {
            if (el.hasAttribute('required') && el.value != '' || !el.hasAttribute('required') && el.value != '') {
                const { id } = el;
                const name = el.getAttribute('fieldname');
                const data = el.value;

                formQuery[`${id}`] = { name, data };
            } else if (el.hasAttribute('required')) {
                el.setAttribute('style', 'border-color: red;');
                errors = true;
            }

            if (el.name == 'phone') {
                if (!validatePhoneNumber(el.value)) {
                    clearMessages();
                    const errMess = document.createElement('span');

                    errMess.classList.add('input-err');
                    errMess.textContent = translater.no_valid_number;
                    el.parentNode.appendChild(errMess);
                    errors = true;
                } else {
                    clearMessages();
                }
            }
        });

        if (!errors) {
            const user_data = collect_user_data();

            formQuery = Object.assign(formQuery, user_data);
            formSendData(formQuery, form);
        } else {
            preloader.remove();
        }
    }

    function collect_user_data() {
        const url = new URL(document.location.href);
        const user_data = new Object();

        // UTM DATA
        if (url.searchParams.get('utm_source')) {
            const name = 'utm_source';
            const data = url.searchParams.get('utm_source');

            user_data.utm_source = { name, data };
        }

        if (url.searchParams.get('utm_medium')) {
            const name = 'utm_medium';
            const data = url.searchParams.get('utm_medium');

            user_data.utm_medium = { name, data };
        }

        if (url.searchParams.get('utm_campaign')) {
            const name = 'utm_campaign';
            const data = url.searchParams.get('utm_campaign');

            user_data.utm_campaign = { name, data };
        }

        if (url.searchParams.get('utm_term')) {
            const name = 'utm_term';
            const data = url.searchParams.get('utm_term');

            user_data.utm_term = { name, data };
        }

        if (url.searchParams.get('utm_content')) {
            const name = 'utm_content';
            const data = url.searchParams.get('utm_content');

            user_data.utm_content = { name, data };
        }

        // UserAgent
        if (window.navigator.userAgent) {
            const name = 'userAgent';
            const data = window.navigator.userAgent;

            user_data.userAgent = { name, data };
        }

        // Cookie
        if (get_cookie('_ga')) {
            const name = '_ga';
            let data = get_cookie('_ga').split('.');

            data = `${data[data.length - 2]}.${data[data.length - 1]}`;
            user_data._ga = { name, data };
        }

        // GetCookie Function
        function get_cookie(cookie_name) {
            const results = document.cookie.match(`(^|;) ?${cookie_name}=([^;]*)(;|$)`);

            if (results) return (unescape(results[2]));

            return null;
        }

        return user_data;
    }

    async function formSendData(formQuery, form) {
        const response = await fetch('/form/send', {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(formQuery),
        });

        form.innerHTML = await response.text();
    }

    const locationFilter = (function () {
        const filterParams = {
            rooms:  null,
            floor:  null,
            square: null,
        };

        const startNewSwiper = () => {
            const flatsCarousel = $('.locations-result__carousel');

            flatsCarousel.owlCarousel({
                loop:    false,
                margin:  0,
                nav:     true,
                navText: [
                    '<i class="ti-angle-left" aria-hidden="true"></i>',
                    '<i class="ti-angle-right" aria-hidden="true"></i>',
                ],
                responsive: {
                    0: {
                        items: 1,
                    },
                    600: {
                        items: 1,
                    },
                    1000: {
                        items: 1,
                    },
                },
            });
        };

        const renderOffers = (locations) => {
            const parent = document.querySelector('.locations__result');
            let html = '';

            html += '<div class="locations-result__carousel owl-carousel">';

            locations.forEach((location, index) => {
                html += `
            <div class="locations-result__item">
              <div class="row location">
                <div class="col-md-4 location__info">
                  <div class="locations-result__data">
                    <h4 class="location__title">${location.rooms} комнатная</h4>
                    <p class="location__square">Площадь: <b>${location.square} м<sup>2</sup></b></p>
                  </div>
                  <div class="location__btn-group">
                    <a class="location__download" href="https://cms.abpx.kz${location.plan.path}" onclick="frontend.popup(this); return false">
                      Скачать планировку
                    </a>
                    <button class="btn location__btn location__btn--id-${index}" onclick="frontend.modal(); return false;">
                      Оставить заявку
                    </button>
                  </div>
                </div>
                <div class="col-md-8 location__img-block d-flex justify-content-center align-items-center">
                  <a href="https://cms.abpx.kz${location.plan.path}" onclick="frontend.popup(this); return false" >
                    <img class="location__img" src="https://cms.abpx.kz${location.plan.path}" />
                  </a>
                </div>
              </div>
            </div>`;
            });

            html += '</div>';

            parent.innerHTML = html;

            startNewSwiper();
        };

        const renderButtons = (locations) => {
            const locationsFilter = document.querySelector('.locations-filter');
            const rooms =  new Set();
            let floors =  new Set();
            const squares =  new Set();

            locations.map((location) => {
                rooms.add(location.rooms);
                floors = new Set(location.floors.concat(...floors));
                squares.add(location.square);
            });

            locationsFilter.innerHTML = '';

            (function () {
                const label = document.createElement('span');
                const btnsGroup = document.createElement('div');
                let roomsButtons = null;

                label.classList = 'locations-filter__label';
                label.textContent = 'Количество комнат:';
                locationsFilter.appendChild(label);

                btnsGroup.classList = 'locations-filter__group filter-group';

                roomsButtons = [...rooms].sort((a, b) => a - b);
                roomsButtons.forEach((room) => {
                    const btn = document.createElement('button');

                    btn.classList = 'btn filter-group__btn filter-group__btn--room';

                    if (filterParams.rooms == room) {
                        btn.classList.add('active');
                    }

                    btn.textContent = `${room} Комнатные`;
                    btn.setAttribute('data-filter', room);

                    btn.addEventListener('click', (e) => {
                        if (btn.classList.contains('active')) {
                            filterParams.rooms = null;
                        } else {
                            filterParams.rooms = room;
                        }

                        filterParams.floor = null;
                        filterParams.square = null;

                        updateFilter();
                    });

                    btnsGroup.appendChild(btn);
                });

                locationsFilter.appendChild(btnsGroup);
            }());

            (function () {
                const label = document.createElement('span');
                const btnsGroup = document.createElement('div');
                let floorsButtons = null;

                label.classList = 'locations-filter__label';
                label.textContent = 'Этаж:';
                locationsFilter.appendChild(label);

                btnsGroup.classList = 'locations-filter__group filter-group';

                floorsButtons = [...floors].sort((a, b) => a - b);
                floorsButtons.forEach((floor) => {
                    const btn = document.createElement('button');

                    btn.classList = 'btn filter-group__btn filter-group__btn--floors';

                    if (filterParams.floor == floor) {
                        btn.classList.add('active');
                    }

                    btn.textContent = floor;
                    btn.setAttribute('data-filter', floor);

                    btn.addEventListener('click', () => {
                        if (btn.classList.contains('active')) {
                            filterParams.floor = null;
                        } else {
                            filterParams.floor = floor;
                        }

                        filterParams.square = null;

                        updateFilter();
                    });

                    btnsGroup.appendChild(btn);
                });

                locationsFilter.appendChild(btnsGroup);
            }());

            (function () {
                const label = document.createElement('span');
                const btnsGroup = document.createElement('div');
                let squaresButtons = null;

                label.classList = 'locations-filter__label';
                label.textContent = 'Площадь:';
                locationsFilter.appendChild(label);

                btnsGroup.classList = 'locations-filter__group filter-group';

                squaresButtons = [...squares].sort((a, b) => a - b).slice(0, 16);
                squaresButtons.forEach((square) => {
                    const btn = document.createElement('button');

                    btn.classList = 'btn filter-group__btn filter-group__btn--square';

                    if (filterParams.square == square) {
                        btn.classList.add('active');
                    }

                    btn.innerHTML = `${square} м <sup>2</sup>`;
                    btn.setAttribute('data-filter', square);

                    btn.addEventListener('click', () => {
                        if (btn.classList.contains('active')) {
                            filterParams.square = null;
                        } else {
                            filterParams.square = square;
                        }

                        updateFilter();
                    });

                    btnsGroup.appendChild(btn);
                });

                locationsFilter.appendChild(btnsGroup);
            }());
        };

        const fetchData = (rooms = null, floor = null, square = null) => {
            const url = new URL('filter', document.location.href);
            const params = {};

            !rooms || (params.rooms = rooms);
            !floor || (params.floor = floor);
            !square || (params.square = square);

            // !rooms || url.searchParams.set('rooms', rooms);
            // !floor || url.searchParams.set('floor', floor);
            // !square || url.searchParams.set('square', square);

            fetch(url.href, {
                method:  'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
            })
                .then(res => res.json())
                .then((res) => {
                    // Checked errors
                    renderButtons(res.entries);
                    renderOffers(res.entries);
                });
        };

        const updateFilter = () => {
            fetchData(
                filterParams.rooms,
                filterParams.floor,
                filterParams.square,
            );
        };

        fetchData();
    }());

    function openModal() {
        $('#callbackModal').modal('show');
    }

    function openPopup(link) {
        $.magnificPopup.open({
            items: {
                src: link.href,
            },
            mainClass: 'plan-popup',
            type:      'image',
        });
    }

    function buildingStepsPopup() {
        const buildingSteps = document.querySelectorAll('.building-steps__item');

        buildingSteps.forEach((item) => {
            const photosString = item.getAttribute('data-gallery-images').split(',');
            const photos = photosString.map(i => ({
                src: i,
            }));

            item.addEventListener('click', () => {
                $.magnificPopup.open({
                    items:   photos,
                    type:    'image',
                    gallery: {
                        enabled: true,
                    },

                });
            });
        });
    }

    function frontendReady() {
        authorMarker();
        phoneValidator();
        buildingStepsPopup();
    }

    return {
        marker: authorMarker,
        form:   formValidator,
        ready:  frontendReady,
        modal:  openModal,
        popup:  openPopup,
    };
}());

document.addEventListener('DOMContentLoaded', () => { frontend.ready(); });
