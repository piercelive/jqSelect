var jqSelect = function(opts){
	var options = {
		selector : 'select',
		slide : true,
		dropdownClass : 'dropdown',
		arrowClass : 'arrow',
		optionClass : 'option',
		fakeBoxClass : 'fake',
		debug : false
	}
	$.extend(options, opts);
	debugMode = options.debug;

	var selectBoxes = $(options.selector);
	$.each(selectBoxes, function() {
		var $selectBox = $(this);
		if(!options.debug){
			$selectBox.hide();
		}
		var $fakeBox = $('<span/>', {
			"class" : options.fakeBoxClass,
			text: $selectBox.find(":selected").text(),
			"data-value": $selectBox.val()	
		});
		var $container = $selectBox.parent();
		var optionElements = $selectBox.children('option');
		var newOptions = [];
		$.each(optionElements, function(){
			var $option = $(this);
			var val = $option.val();
			var text = $option.text();
			var $newOption = $('<span/>',{
				"class" : options.optionClass,
				"data-value" : val,
				text : text						
			});
			newOptions.push($newOption);
		});
		$dropdown = $('<div/>', {
			"class": options.dropdownClass
		});
		$.each(newOptions, function(){
			var $that = $(this);
			$that.on('click', function(){
				$selectBox.trigger('change');
				$fakeBox.attr('data-value', $that.data('value'));
				$fakeBox.text($that.text());
				$selectBox.val($that.data('value'));
			});
			$dropdown.append($that);
		});
		$arrow = $('<span/>', {
			"class" : options.arrowClass
		});
		$arrow.on('click', function(e){
			e.stopPropagation();
			$dropdown.show();
		});
		$surroundingDiv = $('<div/>', {
			"class" : "jq-select"
		});
		$surroundingDiv.append($fakeBox);
		$surroundingDiv.append($arrow);
		$surroundingDiv.append($dropdown);
		$container.append($surroundingDiv);
		$('body').on('click', function(){
			$dropdown.hide();
		});
		
		
	});	
}
var debug = function(message) {
	if(debugMode){
		console.log(message);
	}
}

