/**
 * jQRangeSlider
 * A javascript slider selector that supports dates
 *
 * Copyright (C) Guillaume Gautreau 2012
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */

(function ($, undefined) {
	"use strict";
	
	$.widget("ui.editDateRangeSlider", $.ui.rangeSlider, {
		options: {
			bounds: {min: new Date(2014,0,1).valueOf(), max: new Date(2016,0,1).valueOf()},
			defaultValues: {min: new Date(2014,1,11).valueOf(), max: new Date(2015,1,11).valueOf()}
		},

		_create: function(){
			$.ui.rangeSlider.prototype._create.apply(this);

			this.element.addClass("ui-editDateRangeSlider");
		},

		destroy: function(){
			this.element.removeClass("ui-editDateRangeSlider");
			$.ui.rangeSlider.prototype.destroy.apply(this);
		},

		_setDefaultValues: function(){
			this._values = {
				min: this.options.defaultValues.min.valueOf(),
				max: this.options.defaultValues.max.valueOf()
			};
		},

        _labelType: function(){
            return "editDateRangeSliderLabel";
        },

		_setRulerParameters: function(){
			this.ruler.ruler({
				min: new Date(this.options.bounds.min),
				max: new Date(this.options.bounds.max),
				scales: this.options.scales
			});
		},

		_setOption: function(key, value){
			if ((key === "defaultValues" || key === "bounds") && typeof value !== "undefined" && value !== null && this._isValidDate(value.min) && this._isValidDate(value.max)){
				$.ui.rangeSlider.prototype._setOption.apply(this, [key, {min:value.min.valueOf(), max:value.max.valueOf()}]);
			}else{
				$.ui.rangeSlider.prototype._setOption.apply(this, this._toArray(arguments));
			}
		},

		_handleType: function(){
			return "dateRangeSliderHandle";
		},

		option: function(key){
			if (key === "bounds" || key === "defaultValues"){
				var result = $.ui.rangeSlider.prototype.option.apply(this, arguments);

				return {min:new Date(result.min), max:new Date(result.max)};
			}

			return $.ui.rangeSlider.prototype.option.apply(this, this._toArray(arguments));
		},

		_defaultFormatter: function(value){
			var month = value.getMonth() + 1,
				day = value.getDate();

			return "" + (month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day) + "/" + value.getFullYear();
		},

		_getFormatter: function(){
			var formatter = this.options.formatter;

			if (this.options.formatter === false || this.options.formatter === null){
				formatter = this._defaultFormatter;
			}

			return (function(formatter){
				return function(value){
					return formatter(new Date(value));
				}
			}(formatter));
		},

		values: function(min, max){
			var values = null;
			
			if (this._isValidDate(min) && this._isValidDate(max))
			{
				values = $.ui.rangeSlider.prototype.values.apply(this, [min.valueOf(), max.valueOf()]);
			}else{
				values = $.ui.rangeSlider.prototype.values.apply(this, this._toArray(arguments));
			}

			return {min: new Date(values.min), max: new Date(values.max)};
		},

		min: function(min){
			if (this._isValidDate(min)){
				return new Date($.ui.rangeSlider.prototype.min.apply(this, [min.valueOf()]));
			}

			return new Date($.ui.rangeSlider.prototype.min.apply(this));
		},

		max: function(max){
			if (this._isValidDate(max)){
				return new Date($.ui.rangeSlider.prototype.max.apply(this, [max.valueOf()]));
			}

			return new Date($.ui.rangeSlider.prototype.max.apply(this));
		},
		
		bounds: function(min, max){
			var result;
			
			if (this._isValidDate(min) && this._isValidDate(max)) {
				result = $.ui.rangeSlider.prototype.bounds.apply(this, [min.valueOf(), max.valueOf()]);
			} else {
				result = $.ui.rangeSlider.prototype.bounds.apply(this, this._toArray(arguments));
			}
			
			return {min: new Date(result.min), max: new Date(result.max)};
		},

		_isValidDate: function(value){
			return typeof value !== "undefined" && value instanceof Date;
		},

		_toArray: function(argsObject){
			return Array.prototype.slice.call(argsObject);
		},


        _setLabelOption: function(key, value){
            if (this.labels.left !== null){
                this._leftLabel("option", key, value);
                this._rightLabel("option", key, value);
            }
        },


        _createLabel: function(label, handle){
            var result = $.ui.rangeSlider.prototype._createLabel.apply(this, [label, handle]);

            if (label === null){
                result.bind("valueChange", $.proxy(this._onValueChange, this));
            }

            return result;
        },

        _onValueChange: function(event, data){
            var changed = false;
            //alert(data.value);
            if (data.isLeft){
                changed = this._values.min !== this.min(data.value);
            }else{
                changed = this._values.max !== this.max(data.value);
            }

            if (changed){
                this._trigger("userValuesChanged");
            }
        }
	});
}(jQuery));