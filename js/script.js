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

});

