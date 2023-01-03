// константа для задания скорости анимации
const INCREASE_NUMBER_ANIMATION_SPEED = 50;

/************** шаг анимации **************/

// i — счетчик анимации. Он будет принимать значение от 0 до 5000 и каждый кадр анимации увеличиваться на 1.
// element — html-элемент тега с числом. За один кадр анимации значение внутри element мы будем менять на i.
// endNumber — значение, когда анимация остановится. В нашем случае — 5000.
function increaseNumberAnimationStep(i, element, endNumber) {
    if (i <= endNumber) {
        if (i === endNumber) {
            element.innerText = i + '+';
        } else {
            element.innerText = i;
        }

        i = i + 100;

        /******** вызов анимации с задержкой **********/

        setTimeout(function () {
            increaseNumberAnimationStep(i, element, endNumber);
        }, INCREASE_NUMBER_ANIMATION_SPEED);
    }
}

/******* инициализирует и запускает анимацию *****/

function initIncreaseNumberAnimation() {
    const element = document.querySelector('.features__clients-count');

    increaseNumberAnimationStep(0, element, 5000);
}
initIncreaseNumberAnimation();