(function($){
	$.fn.multiSelect = function(delimiter){
		delimiter = (delimiter == undefined) ? '-' : delimiter;
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
				var reg = new RegExp('^'+val+'(?='+delimiter+')');
				selects.eq(index+1).find('option').each(function(){
					if(!this.value.match(reg)){
						$(this).remove();
					}
				});
			}
		})
		selects.on('click change', 'option', function(e){
			var next_sib_index = $(e.target).parent().index() + 1;
			console.log(next_sib_index);
			// alert(next_sib_index);
			for(n=next_sib_index; n<selects.length; n++){
				console.log(next_sib_index);
				selects.eq(n).each(function(){
					this.length=0;
				});
			}
			if(next_sib_index < selects.length){
				// alert(selects.length);
				var regex = new RegExp('^'+$(e.target).val()+'(?='+delimiter+')');// match x if only followed by y
				console.log(regex);
				$.each(arr[next_sib_index], function(key,val){
					// console.log('key: '+key +' val: '+val);	
					if(key.match(regex)){
						// console.log(selects.eq());
						selects.eq(next_sib_index).append('<option value="'+ key +'">'+ val +'</option>');
					}
				});
			}
		});
	};
})(jQuery);