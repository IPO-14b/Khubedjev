var pjs = new PointJS('2D', 1280 / 2, 720 / 2, { // 16:9
  backgroundColor : '#53769A' // if need
});
pjs.system.initFullPage(); // for Full Page mode

var log    = pjs.system.log;     // log = console.log;
var game   = pjs.game;           // Game Manager
var point  = pjs.vector.point;   // Constructor for Point
var camera = pjs.camera;         // Camera Manager
var brush  = pjs.brush;          // Brush, used for simple drawing
var OOP    = pjs.OOP;            // Object's manager
var math   = pjs.math;           // More Math-methods
var levels = pjs.levels;         // Levels manager

var key   = pjs.keyControl.initKeyControl();

var width  = game.getWH().w; // width of scene viewport
var height = game.getWH().h; // height of scene viewport
// Получим резолюцию экрана
var r = game.getResolution();


pjs.system.setTitle('Game'); // Set Title for Tab or Window

game.newLoopFromConstructor('myGame', function () {

  // Объявим переменную скорости
  var speed = 5*r;

  // Объявим переменну счета
  var score = 0;

  // Первым делом создадим фон

  var back = game.newImageObject({
    file : 'background.jpg',
    h : height/1.5 * r // Растягивание фона под экран
  });

  var djostik = game.newImageObject({
    file : 'djostik.png',
//<<<<<<< lab4
//    h : 100 * r, 
//=======
    h : 100 * r, // Оптимальный размер санты
//>>>>>>> master
    onload : function () {
      // отпозиционируем его по высоте
      this.y = -this.h + height + 20*r; // Отлично
    }
  });

//<<<<<<< lab4
//=======
  // Объявим массив с подарками
//>>>>>>> master
  var points = [];

  var timer = OOP.newTimer(1000, function () {
    points.push(game.newImageObject({
      x : math.random(0, width - 50*r), // 50*r - ширина объекта
      y : -math.random(50*r, 500*r), // уберем минус, так как он уже есть
      w : 20*r, h : 20*r,
      file : 'point.png'
    }));
  });

  this.update = function () {

    // Задействуем фактор дельта-тайм
    var dt = game.getDT(10); // 10 - это делитель дкльты для
    // удобного округления

    game.clear(); // clear screen

    back.draw(); // Отрисуем фон
//<<<<<<< lab4
//    djostik.draw(); 
//=======
    djostik.draw(); // Отрисуем санту
//>>>>>>> master

    timer.restart();

    OOP.forArr(points, function (el, i) { // i - идентификатор
//<<<<<<< lab4
//      el.draw(); 
//
//      el.move(point(0, speed*dt)); // Двигаем вниз
//
//=======
      el.draw(); // Рисуем подарок

      el.move(point(0, speed*dt)); // Двигаем вниз

      // Проверка на столкновение подарка с сантой

//>>>>>>> master
      if (el.isIntersect(djostik)) {
        points.splice(i, 1); // i - идентификатор, 1 - количество
        score++; // Увеличиваем счет
        speed+= 0.01; // увеличиваем скорость
      }

    });

    if (key.isDown('LEFT')) {
      // Двигаем влево
      if (djostik.x >= 0)
        djostik.x -= speed * dt;
    }

    if (key.isDown('RIGHT')) {
      // Двигаем влево
      if (djostik.x+djostik.w < width)
        djostik.x += speed * dt;
    }

    // Отрисуем счет
    brush.drawText({
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
    // При входе в игру будем очищать подарки и удалять счет
    OOP.clearArr(points);
    score = 0;
  };

});

game.startLoop('myGame');