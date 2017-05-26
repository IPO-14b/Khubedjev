/**
 * Пордключения окружения движка
 *
 * Используется для инициальзции всех переменных и объектов движка
 *
 * @var Object $pjs
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
var width = pjs.game.getWH().w; 
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
     * @var int $score
     */
    var score = 0;

    // Первым делом создадим фон

    /**
    * Фон игры
    *
    * Испоьзуется дляя создания фона игры
    *
    * @var Object $back
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
    * @var Object $djostik
    */
    var djostik = pjs.game.newImageObject({
        file : 'djostik.png',
        h : 100 * r, 
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

    /**
    * Массив поинтов
    *
    * Используется для хранения и создания поинтов
    *
    * @var Object $points
    */
    var points = [];

    /**
    * Объект таймер
    *
    * Испоьзуется для создания таймера
    *
    * @var Object $timer
    */
    var timer = pjs.OOP.newTimer(1000, function () {
        points.push(pjs.game.newImageObject({
            x : pjs.math.random(0, width - 50*r), // 50*r - ширина объекта
            y : -pjs.math.random(50*r, 500*r), // уберем минус, так как он уже есть
            w : 20*r, h : 20*r,
            file : 'point.png'
        }));
    });
    /**
    * Функция обновления
    *
    * Функция, которая отвечает за обновление экрана
    */
    this.update = function () {

        /**
        * Объект дельта-тайм
        *
        * Задействуем фактор дельта-тайм
        *
        * @var Object $dt
        */
        var dt = pjs.game.getDT(10); // 10 - это делитель дкльты для
        // удобного округления

        pjs.game.clear(); // clear screen

        back.draw(); // Отрисуем фон
        djostik.draw(); // Отрисуем санту

        timer.restart();
        /**
        * Функция усложнения
        *
        * Функция, которая отвечает за счет и увелечение скорости
        */
        pjs.OOP.forArr(points, function (el, i) { // i - идентификатор
            el.draw(); 

            el.move(pjs.vector.point(0, speed*dt)); // Двигаем вниз

            if (el.isIntersect(djostik)) {
                points.splice(i, 1); // i - идентификатор, 1 - количество
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
    /**
    * Функция новой игры
    *
    * Функция, которая при новой игры обновляет счет
    */
    this.entry = function () { // [optional]
        // При входе в игру будем очищать поинты и удалять счет
        pjs.OOP.clearArr(points);
        score = 0;
    };

});

pjs.game.startLoop('myGame');