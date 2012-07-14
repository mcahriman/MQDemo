function initstage() {

        // create a new stage and point it at our canvas:
        var stage = new createjs.Stage(document.getElementById("testCanvas"));

	screen_width = stage.width;
	screen_height = stage.height;

        var ss = new createjs.SpriteSheet({
                "animations":
                {
                        "m_down": [0, 2, "m_down", 2],
                        "m_right": [3, 5, "m_right", 2],
                        "m_left": [6,8, "m_left", 2],
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

        var funkymonkey = new createjs.BitmapAnimation(ss);
        var funkymonkey2 = new createjs.BitmapAnimation(ss);
        var funkymonkey3 = new createjs.BitmapAnimation(ss);
        var funkymonkey4 = new createjs.BitmapAnimation(ss);
        
        funkymonkey.x = funkymonkey2.x = funkymonkey3.x = funkymonkey4.x = 20;
        funkymonkey.y = 50;
        funkymonkey2.y = 100;
        funkymonkey3.y = 150;
        funkymonkey4.y = 200;
        funkymonkey.gotoAndPlay("m_down");
        funkymonkey2.gotoAndPlay("m_left");
        funkymonkey3.gotoAndPlay("m_right");
        funkymonkey4.gotoAndPlay("m_up");
        

        // Add Grant to the stage, and add it as a listener to Ticker to get updates each frame.
        stage.addChild(funkymonkey,funkymonkey2,funkymonkey3,funkymonkey4);
        createjs.Ticker.setFPS(20);
        createjs.Ticker.addListener(stage);
}

function tick() {
        
}

