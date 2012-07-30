<?php
$MQHOST = $_SERVER['HTTP_HOST'];
$TOPIC = '/topic/MQDEMO.MONKEYS';
header("Content-type: text/javascript");
echo("
   ;
   (function() {
        if (typeof (window) !== undefined) {
        window.DEMOCONFIG = {};
        window.DEMOCONFIG.MQHOST = 'ws://$MQHOST:61614/stomp';
        window.DEMOCONFIG.TOPIC = '$TOPIC';
        }   
    })();
");

