(function($){

	var JQselect = function(el, options) {

		//Defaults:
		this.defaults = {		
			slide : true,
			dropdownClass : 'dropdown',
			optionClass : 'option',
			fakeBoxClass : 'fake',
			debugMode : false
		};
		//elements:
		this.$fakeBox;
		this.$dropdown;
		this.$surroundingDiv;
		this.$container;

		//Extending options:
		this.opts = $.extend({}, this.defaults, options);

		//Privates:
		this.$el = $(el);
		this.$optionList = this.$el.find('option');
	}

	// Separate functionality from object creation
	JQselect.prototype = {

		init: function() {
			var _this = this;
			var $el = _this.$el;

			//set up the elements we are using
			_this.$container = $el.parent();
			_this.$fakeBox = _this.createFakeBox();
			_this.$dropdown = _this.createDropDown();
			_this.$surroundingDiv = _this.createSurroundingDiv();
			
			//set up the click events
			_this.setupClicks();
			
			
			//hide the original select box
			if(!_this.opts.debugMode){
				$el.hide();
			}
			
			//add elements to the dom
			_this.$surroundingDiv.append(_this.$fakeBox);
			_this.$surroundingDiv.append(_this.$dropdown);
			_this.$container.append(_this.$surroundingDiv);
			
						
		},

		
		debug: function(message) {
			var _this = this;
			if(_this.debugMode){
				console.log(message);
			}
		},
		createFakeBox: function(){
			var _this = this;
			return $('<span/>', {
				"class" : _this.opts.fakeBoxClass,
				text: _this.$el.find(":selected").text(),
				"data-value": _this.$el.val()	
			});
		},
		createDropDown: function(){

			var _this = this;
			$dropdown = $('<div/>', {
				"class": _this.opts.dropdownClass
			});
			$.each(_this.$optionList, function(){
				var $that = $(this);

				var $newOption = $('<span/>',{
					"class" : _this.opts.optionClass,
					"data-value" : $that.val(),
					text : $that.text()						
				});

				$newOption.on('click', function(){
					_this.$el.trigger('change');
					_this.$fakeBox.attr('data-value', $that.val());
					_this.$fakeBox.text($that.text());
					_this.$el.val($that.val());
				});
				$dropdown.append($newOption);
			});
			return $dropdown;
		},
		setupClicks: function(){
			var _this = this;
			$('html').on('click', function(){
				$dropdown.hide();
			});
			_this.$fakeBox.on('click', function(e){
				e.stopPropagation();
				if(_this.slide){
					$dropdown.slideToggle();
				}else{
					$dropdown.toggle();	
				}
			});
		},
		createSurroundingDiv: function() {
			
			return $('<div/>', {
				"class" : "jq-select"
			});
		}

	};

	// The actual plugin
	$.fn.jqSelect = function(options) {
		if(this.length) {
			this.each(function() {
				var rev = new JQselect(this, options);
				rev.init();
				$(this).data('jq-select', rev);
			});
		}
	};
})(jQuery);
