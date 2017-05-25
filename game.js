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
});

game.startLoop('myGame');