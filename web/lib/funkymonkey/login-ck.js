$(document).ready(function(){$("canvas#testCanvas").after('<div id="loginForm"><div class="formText">Please enter your username to start the game</div><form method="POST" action=""><input type="text" name="username" size="15" /><button><p id="loginButton" class="formText">start</p></button></form></div>');$("div#loginForm").delegate($("p#loginButton"),"click",function(e){e.preventDefault();$("div#loginForm input").val()!=""&&$("div#loginForm").fadeOut("slow")});$("div#loginForm").delegate($(this),"keydown",function(e){e==13&&$("div#loginForm input").val()!=""&&$("div#loginForm").fadeOut("slow")})});