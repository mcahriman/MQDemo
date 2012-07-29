//Dispatcher implementation
(function(){
    var DemoDispatcher;
    Dispatcher = function() {
        client = Stomp.client(url)
    }
    if(typeof(window) !== undefined) {
        window.DemoDispatcher = DemoDispatcher;
    }
}).call(this);