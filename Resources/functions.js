getStars = function(avg, total){
	var iavg   = parseInt(avg);
	var itotal = parseInt(total);
	var result = '';
	
	for (var i = 1; i <= 5; i++){
		if(i <= iavg)
			result += '\u2605';
		else
			result += '\u2606';
	}
	
	result += ' ('+itotal.toString()+')';
	
	return result;
};
