
(function($, undefined){
	"use strict";

	$.widget("ui.editDateSliderDemo", $.ui.sliderDemo, {
		_title: "Editable date slider",
		_name: "editDateRangeSlider",

		_createOptions: function(){
			$.ui.sliderDemo.prototype._createOptions.apply(this);

			//this._createInputTypeOption();
		},

		_createInputTypeOption: function(){
			this._createDT("Input type");
			var select = $("<select name='type'></select>")
				.append("<option value='number'>number</option>")
				.append("<option value='text' selected='selected'>text</option>");

			this._createDD(select);

			select.change($.proxy(this._easyOptionChange, this));
		}
	});

})(jQuery);