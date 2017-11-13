
 const digit = i => {
	var displayText;
	if(i<10) {
		displayText = '0'+i;
	}else {
		displayText = i.toString();
	}
	
	return displayText;
};

export default {
	digit
};