/**
 * Пордключения окружения движка
 *
 * Используется для инициальзции всех переменных и объектов движка
 *
 * @var $pjs
 */
var pjs = new PointJS('2D', 1280 / 2, 720 / 2, { // 16:9
    backgroundColor : '#53769A' // if need
});
pjs.system.initFullPage(); // for Full Page mode

/**
 * ширина сцены
 *
 * Используется для определения ширены сцены
 *
 * @var int $width
 */
var width  = pjs.game.getWH().w; 
/**
 * высота сцены
 *
 * Используется для определения высоты сцены
 *
 * @var int $height
 */
// Получим резолюцию экрана
var height = pjs.game.getWH().h; // height of scene viewport
/**
 * резолюция экрана
 *
 * Используется для определения резолюции экрана
 *
 * @var int $r
 */
var r = pjs.game.getResolution();


pjs.system.setTitle('Game'); // Set Title for Tab or Window

pjs.game.newLoopFromConstructor('myGame', function () {

      /**
     * Скорость
     *
     * Используется для определения скорости
     *
     * @var int $speed
     */
    var speed = 3*r;
      /**
     * Счет
     *
     * Используется для определения счета
     *
     * @var int $speed
     */
    var score = 0;

    // Первым делом создадим фон

    /**
    * Фон игры
    *
    * Испоьзуется дляя создания фона игры
    *
    * @var  $back
    */    
    var back = pjs.game.newImageObject({
        file : 'background.jpg',
        h : height/1.5 * r // Растягивание фона под экран
    });

    /**
    * Объект "джостик""
    *
    * Испоьзуется дляя создания объекта джостика
    *
    * @var  $djostik
    */
    var djostik = pjs.game.newImageObject({
        file : 'djostik.png',
        //<<<<<<< lab4
        //    h : 100 * r, 
        //=======
        h : 100 * r, // Оптимальный размер санты
        //>>>>>>> master
        /**
        * Функция оптимизации джостика под экран
        *
        * Функция, которая при загрузке обьекта джостик,
        * оптимизирует его размеры под экран
        */
        onload : function () {
            this.y = -this.h + height + 20*r; // Отлично
        }
    });

//<<<<<<< lab4
//=======
// Объявим массив с подарками
//>>>>>>> master
    var pjs.vector.points = [];

    var timer = pjs.OOP.newTimer(1000, function () {
        pjs.vector.points.push(pjs.game.newImageObject({
            x : pjs.math.random(0, width - 50*r), // 50*r - ширина объекта
            y : -pjs.math.random(50*r, 500*r), // уберем минус, так как он уже есть
            w : 20*r, h : 20*r,
            file : 'pjs.vector.point.png'
        }));
    });

    this.update = function () {

    // Задействуем фактор дельта-тайм
    var dt = pjs.game.getDT(10); // 10 - это делитель дкльты для
    // удобного округления

    pjs.game.clear(); // clear screen

    back.draw(); // Отрисуем фон
//<<<<<<< lab4
//    djostik.draw(); 
//=======
    djostik.draw(); // Отрисуем санту
    //>>>>>>> master

    timer.restart();

    pjs.OOP.forArr(pjs.vector.points, function (el, i) { // i - идентификатор
//<<<<<<< lab4
//      el.draw(); 
//
//      el.move(pjs.vector.point(0, speed*dt)); // Двигаем вниз
//
//=======
        el.draw(); // Рисуем подарок

        el.move(pjs.vector.point(0, speed*dt)); // Двигаем вниз

        // Проверка на столкновение подарка с сантой

//>>>>>>> master
        if (el.isIntersect(djostik)) {
            pjs.vector.points.splice(i, 1); // i - идентификатор, 1 - количество
            score++; // Увеличиваем счет
            speed+= 0.01; // увеличиваем скорость
        }

    });

    if (pjs.keyControl.initKeyControl().isDown('LEFT')) {
        // Двигаем влево
        if (djostik.x >= 0)
            djostik.x -= 5 * dt;
    }

    if (pjs.keyControl.initKeyControl().isDown('RIGHT')) {
      // Двигаем влево
        if (djostik.x+djostik.w < width)
            djostik.x += 5 * dt;
    }

    // Отрисуем счет
    pjs.brush.drawText({
        x : 10, y : 10,
        text : 'Счет: ' + score,
        size : 20 * r,
        color : '#FFFFFF',
        strokeColor : 'black',
        strokeWidth : 2,
        style : 'bold',
        font : 'Arial'
    });

  };

    this.entry = function () { // [optional]
        // При входе в игру будем очищать поинты и удалять счет
        pjs.OOP.clearArr(pjs.vector.points);
        score = 0;
    };

});

pjs.game.startLoop('myGame');