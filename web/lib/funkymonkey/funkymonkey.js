DEMO = function() {

var monkeysCount = 200;
var d_idle = -1;
var d_up = 0;
var d_right = 90;
var d_down = 180;
var d_left = 270;
var roamRandFactor = 0.05;

var statelist = [d_up, d_right, d_down, d_left];

FunkyMonkey = function() {
   var animation = new createjs.BitmapAnimation(this.ss);
   var state = d_right;
   var fieldWidth;
   var fieldHeight;
   var minY=32;
   var minX=32;
   var oldState;
   
   var spriteMap = {};
   spriteMap[d_up] = "m_up";
   spriteMap[d_idle] = "m_idle";
   spriteMap[d_down] =  "m_down";
   spriteMap[d_left] = "m_left";
   spriteMap[d_right] ="m_right";
        
   
   //fsm with no accepting state
   this.roam = function () {
       var maxX = fieldWidth - 32;
       var maxY = fieldHeight - 32;
       switch(state) {
            case d_up:
                animation.y--;
                if ( animation.y <= minY ) {state = d_right;}
                break;
            case d_right:
                animation.x++;
                if ( animation.x >= maxX ) {state = d_down;}
                break;
            case d_down:
                animation.y++;
                if( animation.y >= maxY ) {state = d_left;}
                break;
            case d_left:
                animation.x--;
                if( animation.x <= minX ) {state = d_up;}
                break;
       }
       this.move(state)
       if(Math.random() < roamRandFactor ) {
          randno = Math.floor(Math.random() * statelist.length);
          state = statelist[randno];
       }
       
   }
   
   this.setLocation = function(x,y) {
        animation.x = x;
        animation.y = y;
   };
   
   this.setDirection = function (direction) {
       animation.gotoAndPlay(spriteMap[direction]);
   };
   
   this.attachTo = function(stage) {
       stage.addChild(animation);
       fieldWidth = stage.canvas.width;
       fieldHeight = stage.canvas.height;
       
   };
   
   this.move = function(direction) {
       
       switch(direction) {
           case d_down:
               animation.y++;
               break;
           case d_up:
               animation.y--;
               break;
           case d_left:
               animation.x--;
               break;
           case d_right:
               animation.x++;
               break;
       }
       if(oldState != direction) {
           this.setDirection(direction);
           oldState = direction;
       }
   };
}

FunkyMonkey.prototype.ss = new createjs.SpriteSheet({
    "animations":
    {
            "m_down": [0, 2, "m_down", 2],
            "m_left": [3, 5, "m_left", 2],
            "m_right": [6,8, "m_right", 2],
            "m_up": [9,11, "m_up", 2],
            "m_idle": [1]

    },
            "images": ["assets/sprites/PinedaVX-monkeytophat.png"],
            "frames":
                    {
                            "regX": 0,
                            "regY": 0,
                            "height": 32,
                            "width":32,
                            "count": 12
                    }
    });
    
initstage = function () {

        // create a new stage and point it at our canvas:
        var stage = new createjs.Stage(document.getElementById("testCanvas"));
//        stage.canvas.width = window.width;
//        stage.canvas.height = window.height;
        monkeys = [];
        
        for(var i = 0; i < monkeysCount; i++ ) {
            var monkey = new FunkyMonkey();
            var w = stage.canvas.width;
            var h = stage.canvas.height;
            monkey.setLocation(Math.floor(w*Math.random()), Math.floor(h*Math.random()))
            monkey.setDirection(d_down);
            monkey.attachTo(stage);
            monkeys[i] =  monkey;
        }
        
        createjs.Ticker.setFPS(20);
        createjs.Ticker.addListener(stage);
        
        window.setInterval(tick, 50);
}

tick = function() {
    for(var i = 0; i < monkeys.length; i++) {
        monkeys[i].roam();
    }
    
}

}();