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
		selects.each(function(index){
			arr[index] = {};
			$(this).find('option').each(function(){
				arr[index][this.value] = this.innerHTML;
			});
		});


		selects.each(function(index, el){
			var this_options = $(el).find('option');
			var this_options_selected = $(el).find('option:selected');
			var val = this_options_selected.val();
			
			if(index< selects.length){
				var reg = new RegExp('^'+val+'(?='+o.delimiter+')');
				selects.eq(index+1).find('option').each(function(){
					if(!this.value.match(reg)){
						this.outerHTML = "";
					}
				});
			}
		})
		$this.on('change', 'select', function(e){
			// console.log($(e.target).attr('ind'));
			// console.log($(this).attr('ind'));

			var next_sib_index = parseInt($(this).attr('ind')) + 1;
			//  why use attr ind becuase can not use index() if the siblings include different element rather than select.
			for(n=next_sib_index; n<selects.length; n++){
				selects.eq(n).each(function(){
					this.length=0;
				});
			}
			var selected_option = $(e.target).val();
			if(next_sib_index < selects.length){
				// alert(selects.length);
				// match value that follow by '-'
				var regex = new RegExp('^'+$(e.target).val()+'(?='+o.delimiter+')');
				

				$.each(arr[next_sib_index], function(key,val){
					if(key.match(regex)){

						selects.eq(next_sib_index).append('<option value="'+ key +'">'+ val +'</option>');
					}
				});
			}
			o.callback.call(this);
		});
	};
})(jQuery);