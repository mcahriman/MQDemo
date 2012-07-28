function DEMO() {

    this.monkeysCount = 50;
    this.d_idle = 500;
    this.d_up = 0;
    this.d_right = 90;
    this.d_down = 180;
    this.d_left = 270;
    this.d_accept = -1;
    this.d_ready = -2;

    this.roamRandFactor = 0.05;

    this.statelist = [d_up, d_right, d_down, d_left];
    this.modeCycleList = ['roam', 'idle'];

    FunkyCharacter = function() {
        var animation = new createjs.BitmapAnimation(this.spriteSheet);
        var username = new createjs.Text('', "12px Arial", "#fff");
        var state = d_right;
        var fieldWidth;
        var fieldHeight;
        var minY=20;
        var minX=0;
        var oldState;
        var mode = 'roam';
        animation.referenceObj = this;
        var destinationX;
        var destinationY;

        this.setUsername = function(name) {
            username.text = name;
        };

        function getRandomState() {
            randno = Math.floor(Math.random() * statelist.length);
            return statelist[randno];
        };

        this.setMode = function(newMode) {
            switch(newMode) {
                case 'idle':
                    this.setDirection(d_idle);
                    state = d_idle;
                    break;
                case 'roam':
                    state = getRandomState();
                    this.setDirection(state);
                    break;
                case 'move':
                    state = d_idle;
                    break;
            }
            mode = newMode;
        };
   
        this.moveTo = function(x,y) {
            destinationX = x;
            destinationY = y;
            this.setMode('move');
        };

        this.processAction = function() {
            switch (mode) {
                case 'roam':
                    this.roam();
                    break;
                case 'idle':
                    break;
                case 'move':
                    this.moveToPointFsm();
                    break;
			  
            }
        }
   
        this.cycleModes = function() {
            var cycle_len = modeCycleList.length;	   
            var nextmode = 0;
            for(var i=0; i < cycle_len; i++) {
                if(modeCycleList[i] == mode) {
                    nextmode = i + 1;
                }
                if(nextmode >= cycle_len) {
                    nextmode = 0;
                }
            }
            mode = modeCycleList[nextmode];
            this.setMode(mode);
        }
   
        var spriteMap = {};
        spriteMap[d_up] = "m_up";
        spriteMap[d_idle] = "m_idle";
        spriteMap[d_down] =  "m_down";
        spriteMap[d_left] = "m_left";
        spriteMap[d_right] ="m_right";
        spriteMap[d_ready] ="m_ready";
   
       
   
        //fsm with no accepting state
        this.roam = function () {
            var maxX = fieldWidth - 32;
            var maxY = fieldHeight - 80;
            switch(state) {
                case d_up:
                    if ( animation.y <= minY ) {
                        state = d_right;
                    }
                    break;
                case d_right:
                    if ( animation.x >= maxX ) {
                        state = d_down;
                    }
                    break;
                case d_down:
                    if( animation.y >= maxY ) {
                        state = d_left;
                    }
                    break;
                case d_left:
                    if( animation.x <= minX ) {
                        state = d_up;
                    }
                    break;
            }
            this.move(state);
            if(Math.random() < roamRandFactor ) {
                state = getRandomState()
            }       
        }
   
        this.setReady = function() {
            this.setDirection(d_ready);
            this.setUsername($('div#loginForm input').val());
        }
   
        this.setIdle = function() {
            if (state == d_idle) {
                this.setDirection(d_idle);
            }
        }
   
        //fsm with accepting state:
        this.moveToPointFsm = function() {
            var maxX = fieldWidth - 32;
            var maxY = fieldWidth - 32;
            var direction;
            //change direction to the destination
	   
	   
            this.setDirection(direction);
	   
            switch (state) {
                case d_idle:
                    state = (animation.x >= destinationX ? d_left : d_right);
                    direction = state
                    break;
                case d_left:
                    state = (animation.x <= destinationX ? d_accept : d_left);
                    break;
                case d_right:
                    state = (animation.x >= destinationX ? d_accept : d_right);
                    break;
                case d_accept:
                    state = (animation.y >= destinationY ? d_up : d_down);
                    direction = state;
                    break;
                case d_up:
                    if(animation.y <= destinationY) { 
                        state = d_idle;				
                        this.setMode('idle'); 
                    }
                    break;
                case d_down:
                    if(animation.y >= destinationY) { 
                        state = d_idle;
                        this.setMode('idle'); 
                    }
            }
            this.move(state);
        }

        this.setLocation = function(x,y) {
            animation.x = x;
            animation.y = y;
            username.x = x;
            username.y = y;
        };
   
        this.setDirection = function (direction) {
            if(state!=d_accept) {
                animation.gotoAndPlay(spriteMap[direction]);
            }
        };
   
        this.attachTo = function(stage) {
            stage.addChild(animation);
            stage.addChild(username);
            fieldWidth = stage.canvas.width;
            fieldHeight = stage.canvas.height;
       
        };

        this.removeChildren = function(stage) {
            stage.removeAllChildren()
        };
   
        this.move = function(direction) {
       
            switch(direction) {
                case d_down:
                    animation.y++;
                    username.y++;
                    break;
                case d_up:
                    animation.y--;
                    username.y--;
                    break;
                case d_left:
                    animation.x--;
                    username.x--;
                    break;
                case d_right:
                    animation.x++;
                    username.x++;
                    break;
                default:
                    break;
            }
            if(oldState != direction) {
                this.setDirection(direction);
                oldState = direction;
            }
        };
    }
}

DEMO();