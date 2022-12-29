
//количество пузырьков
const BUBBLE_DENSITY = 100;

//цвет пузырьков
const COLORS = ["255,108,80", "5,117,18", "29,39,57", "67,189,81"];

//случайное число от MIN до MAX
//получить число в промежутке от left до right, 
//а затем с помощью метода toFixed(2) мы оставляем 
//от числа два знака после запятой
function generateDecimalBetween(left, right) {
    return (Math.random() * (left - right) + right).toFixed(2);
}


/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
//класс пузырьков 
//Bubble будет хранить информацию 
//об отдельном пузырьке — 
//его размерах, цвете, положении
class Bubble {

    //  нужен, чтобы понимать размерность холста
    constructor(canvas) {
        this.canvas = canvas;
        this.getCanvasSize();
        this.init();
    }

    //  Метод getCanvasSize будет вытаскивать из холста его размеры и 
    //  сохранять в переменные внутри класса Bubble
    getCanvasSize() {
        this.canvasWidth = this.canvas.clientWidth;
        this.canvasHeight = this.canvas.clientHeight;
    }


    // Метод init будет инициализировать пузырек: 
    // выбирать ему один из случайных цветов, какой-то размер, 
    // начальное положение на холсте.
    init() {
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.size = generateDecimalBetween(1, 3);

        // прозрачность, которая принимает значения от 0 до 1
        this.alpha = generateDecimalBetween(5, 10) / 10;

        // начальную позицию пузырька, x- и y-координаты
        this.translateX = generateDecimalBetween(0, this.canvasWidth);
        this.translateY = generateDecimalBetween(0, this.canvasHeight);

        // у каждого пузырька будет своя скорость движения
        this.velocity = generateDecimalBetween(20, 40);

        // дельту перемещения точки по оси x и по оси y. 
        // на это число мы будем все время смещать позицию пузырька
        this.movementX = generateDecimalBetween(-2, 2) / this.velocity;
        this.movementY = generateDecimalBetween(1, 20) / this.velocity;
    }

    //метод move будет пересчитывать положение пузырька на холсте, 
    //так как фигуры должны двигаться вверх.
    //обновлять x- и y-координаты нашего пузырька на значения movementX и movementY
    move() {
        this.translateX = this.translateX - this.movementX;
        this.translateY = this.translateY - this.movementY;

        //проверяем, что значения опустились ниже 0 в координатах 
        //или вышли за горизонтальные границы, и, если это так, заново инициализируем данные
        if (this.translateY < 0 || this.translateX < 0 || this.translateX > this.canvasWidth) {
            this.init();
            this.translateY = this.canvasHeight;
        }
    }
}

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
//Давайте теперь проверим работу класса Bubble: создадим несколько пузырьков, 
//экземпляров класса и посмотрим, что они внутри себя хранят

/*const canvas = document.getElementById("orb-canvas");
const bubbles = [];
bubbles.push(new Bubble(canvas));
bubbles.push(new Bubble(canvas));
bubbles.push(new Bubble(canvas));
console.log(bubbles);*/

/*>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/

//класс анимированного фона - 
//CanvasBackground рисовать пузырьки 
//на холсте и анимировать их
class CanvasBackground {
    constructor(id) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');

        //значение devicePixelRatio
        this.dpr = window.devicePixelRatio;
    }

    // запустит анимацию: подстроит размеры холста, создаст пузырьки и анимирует их
    start() {
        this.canvasSize();
        this.generateBubbles();
        this.animate();
    }

    canvasSize() {
        // выставить ширину для холста
        this.canvas.width = this.canvas.offsetWidth * this.dpr;

        //выставить высоту для холста
        this.canvas.height = this.canvas.offsetHeight * this.dpr;

        //настроить масштаб
        this.ctx.scale(this.dpr, this.dpr);

    }


    // создавать массив пузырьков
    generateBubbles(){
        this.bubblesList=[];
        for (let i = 0; i < BUBBLE_DENSITY; i++) {
            this.bubblesList.push(new Bubble(this.canvas));
        }
    }

    animate() {
        // очистите весь холст
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);

        // вычислим новую позицию пузырька
        this.bubblesList.forEach((bubble) => {

            bubble.move();
            // вычислим новую позицию пузырька
            this.ctx.translate(bubble.translateX, bubble.translateY);

            this.ctx.beginPath();

            //нарисуйте круг
            this.ctx.arc(0, 0, bubble.size, 0, 2 * Math.PI);
            //закрасьте круг
            this.ctx.fillStyle="rgba(" + bubble.color + "," + bubble.alpha + ")";
            //Закрасьте пузырек
            this.ctx.fill();

            //настроить масштабирование
            this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        });

        //запустим анимацию
        requestAnimationFrame(this.animate.bind(this));
    }
}

//создать экземпляр класса CanvasBackground и запустить анимацию, вызвав метод start
const canvas = new CanvasBackground("orb-canvas");
canvas.start();

