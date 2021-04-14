document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParrent = document.querySelector('.tabheader__items');

// работа с блоками меню
    function hideTabContent() { //убираем весь кнтент
        tabsContent.forEach(tabs => {         
            tabs.classList.add('hide'); //add hide
            tabs.classList.remove('show', 'fade'); //remove show
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active'); //remove active class
        });
    }

    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade'); // add show
        tabsContent[i].classList.remove('hide'); //remove hide
        tabs[i].classList.add('tabheader__item_active'); // add active
    }

    hideTabContent();
    showTabContent();


    tabsParrent.addEventListener('click', (e)=>{ // добавляем обработчик на кнопки
        const target = e.target;

        if(target && target.classList.contains('tabheader__item')){ // проверяем все эелементы на наличие класса
            tabs.forEach((item, i) =>{
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

// Таймер

const deadLine = '2021-05-11';

function getTimeReaining(deadLine) {
    const t = Date.parse(deadLine) - Date.parse(new Date());
    const days = Math.floor(t / (1000 * 60 * 60 *24));
    const hours = Math.floor((t / (1000 * 60 *60) % 24));
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const seconds = Math.floor((t / 1000) % 60);

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function getZero(num){
    if(num >= 0 && num < 10){
        return `0${num}`;
    } else {
        return num;
    }
}

function setClock(selector, deadline) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    const timeInterval = setInterval(updateClock, 1000);

    updateClock(); // Убирает моргание таймера

    function updateClock() {
        const t = getTimeReaining(deadline);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.totel <= 0){
            clearInterval(timeInterval);
        }
    }
}

setClock('.timer', deadLine);

// modal

const modalTrigger = document.querySelectorAll('[data-modal]');
const modal = document.querySelector('.modal');


function opneModal(){ // открываем окно модалки
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);

}

modalTrigger.forEach(btn => { // обработчик всех кнопок модалки
    btn.addEventListener('click', opneModal);
});

function closeModal(){ 
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
};


modal.addEventListener('click', (e) => {
    if(e.target === modal || e.target.getAttribute('data-close') == ''){
    closeModal();
    }
});

document.addEventListener('keydown', (e)=>{
    if(e.code === 'Escape' && modal.classList.contains('show')){
        closeModal();
    }

});

const modalTimerId = setTimeout(opneModal, 50000);

function showModalByScroll(){
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
        opneModal();
        window.removeEventListener('scroll', showModalByScroll); // сам обработчки и удаление
    }
}

window.addEventListener('scroll', showModalByScroll); //вешаем обработчик на скролл


// Классы для кариочек

class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes){
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.descr = descr;
    this.price = price;
    this.classes = classes;
    this.parent = document.querySelector(parentSelector);
    this.transfer = 78;   
    this.changeTuRUB();
    }
        changeTuRUB(){
            this.price = this.price * this.transfer;
        }

        render(){
            const element = document.createElement('div');

            if(this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
            this.classes.forEach(className => element.classList.add(className));
        }
            element.innerHTML = `
              
                    <img src="${this.src}" alt="${this.alt}">
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.descr}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
           
            `;

                this.parent.append(element);
            }
      
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
    
      

    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню "Премиум"',
        'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        12,
        '.menu .container',
        'menu__item',
        'big'

    ).render();
    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        6,
        '.menu .container',
        'menu__item',
        'big'

    ).render();

    //forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо скоро мы с вами свяжемся',
        failure: 'Что то пошло не так...'
    };

    forms.forEach(item => { // перебираем формы
        postData(item);
    });

    function postData(form){
        form.addEventListener('submit', (e) => {  // добавляем обработчик
            e.preventDefault();

            const statusMessage = document.createElement('img'); //создаем тег для  картинки загрузки статусов
            statusMessage.src = message.loading;  // добавляем путь к картинке стстауса 
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `; // помещаем сообщение loading
            // form.append(statusMessage); 
            form.insertAdjacentElement('afterend', statusMessage);// добавляем сообщение в конец блока


            //const request = new XMLHttpRequest(); // запрос на сервер
            //request.open('POST', 'server.php'); // метод и адрес


        

            request.setRequestHeader('Content-type', 'aplication/json'); //устанавливаем параметры
            const formData = new FormData(form); //новый объект

            const object = {}; // создаем пустой объект

            formData.forEach(function(value,key){ // перебираем формдату и записываем в объект
                object[key] = value;
            });

            


            request.send(json); // отправляем


            fetch('server.php', {
                method: "POST",
                headers: {
            'Content-type': 'application/json',
                body: JSON.stringify(object) 
        }
            })
            .then(data => data.text())
            .then(data =>{ //data получает данные от formData
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();   
            })
            .catch(() =>{
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
            })

            // request.addEventListener('load', () => { //вешаем обработчик на событие 200 и остальные 
            //     if(request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //             statusMessage.remove();                 
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }

    // modal window success or fail

    function showThanksModal(message) { //функция показа окна об отправке
        const prevModalDialog = document.querySelector('.modal__dialog'); //выбираем блок с окном
        prevModalDialog.classList.add('hide'); //скрываем содержимое
        opneModal(); //вызываем функию открытия окна

        const thanksModal = document.createElement('div'); //создаем блок
        thanksModal.classList.add('modal__dialog') // добавляем ему класс
        //помещаем внутрь содержимое
        thanksModal.innerHTML = ` 
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal); //находим модал, добавляем блок с текстом
        setTimeout(()=>{ // устанавливаем таймаут
            thanksModal.remove(); //удаляем блок
            prevModalDialog.classList.add('show'); // добавляем класс с видимостью
            prevModalDialog.classList.remove('hide'); // убираем класс хайд
            closeModal(); //закрываем окно по таймауту 4 секунды
        }, 4000);
    };


    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "POST",
        body: JSON.stringify({name: 'Alex'}),
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(response => response.json()) //возвращает промис
    .then(json => console.log(json));

});



