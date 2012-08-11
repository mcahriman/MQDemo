//Dispatcher implementation
(function(){
    var DemoDispatcher;
    if (typeof(DEMOCONFIG) === undefined) {
        alert("Server configuration is not defined");
    }
    DemoDispatcher = function() {
        var client,
            bindings,
            dispatchInbound,
            connectHandler,
            identifier,
            token,
            connectionErrorHandler;
            
        dispatchInbound = function(m) {
            console.debug(m);
        }

        setAdvertized = function(nick) {
            identifier = nick;
            token = identifier.toString() + 
                Math.floor(Math.random() * 1000).toString(16);
            console.debug('It is your token now:' + token);
        }
        
        connectHandler = function(m) {
            console.debug('connected');
            client.subscribe(DEMOCONFIG.TOPIC, dispatchInbound);            
        }
        connectionErrorHandler = function(m) {
            console.debug(">>> reconnecting");
            DemoDispatcher.call(connect);
        }
        
        connect = function() {
            client.connect('demo', 'demo', connectHandler, connectionErrorHandler)
            
        }
        
        this.connect = connect;
        
        client = Stomp.client(DEMOCONFIG.MQHOST);
        bindings = {};
        this.connect();
        
        
        //API
        this.registerListener = function(listener) {
            if( typeof(listener.id) !== undefined ) {
                bindings[listener.id] = listener.obj;
            }
        }
        
        this.send = function(message) {
            console.debug(message);
            client.send(DEMOCONFIG.TOPIC, {}, JSON.stringify(message));
        }

        this.setAdvertized = setAdvertized;
    }
    if(typeof(window) !== undefined) {
        window.DemoDispatcher = new DemoDispatcher();
    }
}).call(this);