(function( $ ) {
  "use strict";
  var methods = {
	init: function( options ) {

	var $root = $(this);
	var settings = $.extend({
		// name: 'name',
		// colors: ['#000000', 'red', '#ffffff'],
		// duration: '1000ms',
		// property: 'background-color',
		// timingFunction: 'ease',
		// fillMode: 'infinite',
		// delay: '0s'
	}, options);

	return this.each(function() {
		var initMethods = {
			init: function() { // Initiatoin method
        var self = initMethods;
				var $main = $(this);
					self.addMainStyle();
			},
			addMainStyle : function(){
        $root.toggleClass("slideNumbers");
        $root.append("<div class='number-wrapper'></div>")
        for(var i = 1; i < 366; i++) {
          $root.find(".number-wrapper").append("<a class='number'>" + i + "</a>");
        }
        var offsetDefault = $root.find("a").offset().top;
        var elementHeight = $root.find("a").height();
        var elementsArray = $("#qt .number").toArray();
        var currentElement;
        $root.scroll(function(){
          var offsetCurrent = $root.find("a").offset().top;
          var activeElement = Math.floor((offsetCurrent - offsetDefault) / elementHeight);
          currentElement = Math.abs(activeElement);
          $root.find("a").removeClass("active-number");
          $(elementsArray[currentElement]).addClass("active-number");
          $root.attr("data-current-number", currentElement);
        })
        $root.hover(
          function(){
            $root.addClass("active");
          }, function() {
            $root.removeClass("active");
            if ($root.attr("data-current-number")) {
              var elementCenter = elementHeight / 2;
              var newOffset = (offsetDefault - (elementHeight * currentElement)) + elementCenter;
              $(".number-wrapper").offset({top: newOffset});
            }
          }
        )
			}
    };
		initMethods.init.apply(this); // Initiate plugin
	});
	}

  };

  $.fn.slideNumbers = function( method ) {
	if ( methods[method] ) {
	  return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	} else if ( typeof method === 'object' || ! method ) {
	  return methods.init.apply( this, arguments );
	} else {
	  $.error( 'Method: ' +  method + ' does not exists. jQuery.smoothBackground' );
	}
  };

})( jQuery );
