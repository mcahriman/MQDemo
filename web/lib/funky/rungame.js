RUN.prototype = DEMO;
//TODO: refactor
function RUN() {
    initstage = function () {
        setTimeout(rungame, 1000);
    };
    
    addRandomMonkey = function(stage) {
        var monkey = new FunkyMonkey();
        var w = stage.canvas.width;
        var h = stage.canvas.height - 70;
        monkey.attachTo(stage);
        monkey.setLocation(Math.floor(w*Math.random()), 
            Math.floor(h*Math.random()));
        monkey.removeRoamMode();
        monkey.setMode('idle');
        return monkey;
    }

    rungame = function () {

        var canvas = document.getElementById("testCanvas");
        var stage = new createjs.Stage(canvas);
        var readymonkey;
        monkeys = [];
        canvas.onclick = function (e) {
            obj = stage.getObjectUnderPoint(e.offsetX, e.offsetY);
            if (obj && typeof (obj.referenceObj) !== 'undefined') {
                var monkey = obj.referenceObj;
                for (i = 0; i < monkeys.length; i++) {
                    monkeys[i].setCaption("");
                }
                console.debug(monkey);
                if (monkey === readymonkey) {
                    monkey.cycleModes();
                } else {
                    if (typeof (readymonkey) !== 'undefined') {
                        monkey.setIdle();
                    }
                    readymonkey = monkey;
                    readymonkey.setReady();
                }
            } else if (typeof (readymonkey) !== 'undefined') {
                readymonkey.moveTo(e.offsetX, e.offsetY);
            }
        };

        for (var i = 0; i < monkeysCount; i++ ) {
            monkeys[i] =  addRandomMonkey(stage);
        }
                
        createjs.Ticker.setFPS(20);
        createjs.Ticker.addListener(stage);
        createjs.Ticker.addListener(this);
    }
    
    tick = function() {
        for(var i = 0; i < monkeys.length; i++) {
            monkeys[i].processAction();
        }
    
    };
    initstage = function () {
        setTimeout(rungame, 1000);
    }
};
RUN();
