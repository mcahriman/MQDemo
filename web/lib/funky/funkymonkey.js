MONKEY.prototype = DEMO;
function MONKEY() {
    FunkyMonkey = FunkyCharacter;
    FunkyMonkey.prototype.spriteSheet = new createjs.SpriteSheet({
        "animations":
        {
            "m_down": [0, 2, "m_down", 2],
            "m_left": [3, 5, "m_left", 2],
            "m_right": [6,8, "m_right", 2],
            "m_up": [9,11, "m_up", 2],
            "m_idle": [0,0,'m_idle', 6],
            "m_ready": [0,1,'m_ready',6]

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
    FunkyMonkey.prototype.constructor = FunkyCharacter;
    FunkyMonkey.prototype.notifyAction = function(message) {
        DemoDispatcher.send(message);
    };
    window.FunkyMonkey = FunkyMonkey;
    
};
MONKEY();
