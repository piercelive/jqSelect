var jqSelect = function(opts){
	var options = {
		selector : 'select',
		slide : true,
		dropdownClass : 'dropdown',
		arrowClass : 'arrow',
		optionClass : 'option',
		fakeBoxClass : 'fake'
	}
	$.extend(options, opts);

	var selectBoxes = $(options.selector);
	$.each(selectBoxes, function() {
		var $selectBox = $(this);
		var $fakeBox = $('<h1/>', {
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
		$container.append($fakeBox);
		$.each(newOptions, function(){
			var $that = $(this);
			$that.on('click', function(){
				$selectBox.trigger('change');
				$fakeBox.attr('data-value', $that.data('value'));
				$fakeBox.text($that.text());
			});
			$container.append($that);
		});
		
	});	
}

