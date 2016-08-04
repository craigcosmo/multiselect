(function($){
	$.fn.multiSelect = function(options){



		var defaults = {
			callback: function(){},
			delimiter: '-'
		},
		o = $.extend({},defaults, options);


		var $this = $(this);
		var selects = $this.find('select');
		var arr = [];
		var n;
		// selects.each(function(index){
		// 	arr[index] = {};
		// 	$(this).find('option').each(function(){
		// 		arr[index][this.value] = this.innerHTML;
		// 	});
		// });
		// storing key and value of options in a cached array
		for (var index = 0; index <= selects.length; index++) {
			arr[index] = {};
			$(selects[index]).find('option').each(function(){
				arr[index][this.value] = this.innerHTML;
			});
		}


		// selects.each(function(index, el){
		// 	var this_options = $(el).find('option');
		// 	var this_options_selected = $(el).find('option:selected');
		// 	var val = this_options_selected.val();
			
		// 	if(index< selects.length){
		// 		var reg = new RegExp('^'+val+'(?='+o.delimiter+')');
		// 		selects.eq(index+1).find('option').each(function(){
		// 			// the checking of value != is only because it has to integrate with chosen plugin
		// 			// should remove it if not using chosen plugin
		// 			if(!this.value.match(reg) && this.value != ''){
		// 				this.outerHTML = "";
		// 			}
		// 		});
		// 	}
		// 	// console.log(this_options.length);
		// 	if(this_options.length==1) $(el)[0].disabled = true;
		// 	// check lenght ==1 because there is one dummy option
		// })

		for (var i = 0; i <= selects.length; i++) {
			var _this = $(selects[i]);
			var this_options = _this.find('option');
			var this_options_selected = _this.find('option:selected');
			var val = this_options_selected.val();
			
			if(i< selects.length){
				var reg = new RegExp('^'+val+'(?='+o.delimiter+')');
				$(selects[i+1]).find('option').each(function(){
					// the checking of value != is only because it has to integrate with chosen plugin
					// should remove it if not using chosen plugin
					// this is check for empty option, empty option won't get remove
					if(!this.value.match(reg) && this.value !== ''){
						this.outerHTML = "";
					}
				});
			}
			// console.log(this_options.length);
			if(this_options.length==1) selects[i].disabled = true;
			// check lenght ==1 because there is one dummy option
			// if at this stage there is only option it is highly propably empty option
			// this option will not be removed but it's parent select will be disabled
		}
	


		$this.on('change', 'select', function(e){
			// console.log($(e.target).attr('ind'));
			// console.log($(this).attr('ind'));

			var next_sib_index = parseInt($(this).attr('ind')) + 1;
			//  why use attr ind becuase can not use index() if the siblings include different element rather than select.
			// remove all the options
			for(n=next_sib_index; n<selects.length; n++){
				selects.eq(n).each(function(){
					this.length=0;
				});
			}

			//repopulate the relavent options
			var selected_option = $(e.target).val();
			if(next_sib_index < selects.length){
				// alert(selects.length);
				// match value that follow by '-'
				var regex = new RegExp('^'+$(e.target).val()+'(?='+o.delimiter+')');
				
				//  this extra two line is only used when integrate with chosen plugin
				// if not use chosen can remove these two lines
				// var op = '<option value=""></option>';
				// selects.eq(next_sib_index).append(op);


				$.each(arr[next_sib_index], function(key,val){
					if(key.match(regex)){

						selects.eq(next_sib_index).append('<option value="'+ key +'">'+ val +'</option>');
					}
				});

				if (selects.eq(next_sib_index).find('option').length > 1 ) selects.eq(next_sib_index)[0].disabled = false;
				if (selects.eq(next_sib_index).find('option').length == 1 ) selects.eq(next_sib_index)[0].disabled = true;
			}
			o.callback.call(this);
		});
	};
})(jQuery);