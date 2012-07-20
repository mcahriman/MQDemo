$(document).ready(function(){
		
		/*TOGGLE MENU*/
		
		$(document).delegate($(this), 'keydown', function(e){
			var code = (e.keyCode ? e.keyCode : e.which);
			if (code === 192) {
				if ($('div#controlsSection').hasClass('visible')){
					$('div#controlsSection').removeClass('visible').fadeOut();
				} else {
					$('canvas#testCanvas').after('<div id="controlsSection" class="visible"><a href="#" id="clear">Clear and generate</a><a href="#" id="randomize">Randomize monkeys</a><a href="#" id="move">Let them move</a><a href="#" id="move">	Stop!</a><a href="#" id="remove">Remove monkey</a><input value="name" id="monkeyName"><a href="#" id="addMonkey">Add monkey</a></div>');
				}
			}
		});

		/*MENU FUNCTIONS*/

		/*CLEAR AND GENERATE*/

		$('div#controlsSection').delegate($('a#clear'), 'click', function(e){
				e.preventDefault();
				monkeys = new FunkyMonkey();
				alert(monkeys.children);
			});
});