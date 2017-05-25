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

pjs.system.setTitle('PointJS Game'); // Set Title for Tab or Window

game.newLoopFromConstructor('myGame', function () {

  // Объявим переменную скорости
  var speed = 2*r;

  // Объявим переменну счета
  var score = 0;

  // Первым делом создадим фон

  var back = game.newImageObject({
    file : 'background.jpg',
    h : height/1.5 * r // Растягивание фона под экран
  });

  var djostik = game.newImageObject({
    h : 200 * r, 
    onload : function () {
      // отпозиционируем его по высоте
      this.y = -this.h + height + 20*r; // Отлично
    }
  });
  var points = [];

  var timer = OOP.newTimer(1000, function () {
    podarki.push(game.newImageObject({
      x : math.random(0, width - 50*r), // 50*r - ширина объекта
      y : -math.random(50*r, 500*r), // уберем минус, так как он уже есть
      w : 50*r, h : 50*r,
      file : 'point.png'
    }));
  });
});

game.startLoop('myGame');