var jqSelect = function(opts){
	var options = {
		selector : 'select',
		slide : true,
		dropdownClass : 'dropdown',
		arrowClass : 'arrow',
		optionClass : 'option'
	}
	$.extend(options, opts);

	var selectBoxes = $(options.selector);
	$.each(selectBoxes, function() {
		var optionElements = $(this).children('option');
		$.each(optionElements, function(){
			var $el = $(this);
			$('body').append('<li>'+$el.val()+'</li>');
		});
	});	
}


