module.exports = function toReadable (number){
	if (number === 0) return 'zero';
	var number_to_digits = splitToDigits(number);
	return getRazryad(number_to_digits, number);
}

function splitToDigits(number) {  //разбиваем на разряды
	var digits = [];
	while (number) {
		digits.push(number % 10);
		number = Math.floor(number/10);
	} 
	return (digits.reverse());
}

var digits_to_words = ['','one', 'two',
                      'three', 'four', 'five',
                      'six', 'seven', 'eight', 'nine'];
var two_number_to_words = ['ten', 'eleven', 'twelve', 
                          'thirteen', 'fourteen', 'fifteen', 
                          'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var two_number_dec_to_words = ['twenty', 'thirty', 
                               'forty', 'fifty', 'sixty', 
							   'seventy', 'eighty', 'ninety'];
							   
function getRazryad(massiv, number) { //в зависимости от количества цифр в числе вызываем разные функции
	switch (massiv.length) {
  		case 1: return oneDigit (massiv);
  		case 2: return withDesyatki (massiv, number);
  		case 3: return withHundred (massiv, number);
	}
}

function oneDigit (massiv) {
	return digits_to_words[massiv[0]];
}

function withDesyatki (massiv, number) {
	if (massiv[0] == 1) return two_number_to_words[massiv[1]]; //10-19
  	if ((number % 10) ==0) {
      		var number_string = two_number_dec_to_words[massiv[0]-2]; //20-90
      		return number_string;
    	}
	return two_number_dec_to_words[massiv[0] -2] 				//составные, например 35
                       + " " + digits_to_words[massiv[1]];
}

function withHundred (massiv, number) {
	var dec_number = number % 100;
	if (dec_number == 0) return digits_to_words[massiv[0]] + " hundred";  //100-900
	var dec_number_to_digits = splitToDigits(dec_number);
	var output_string = getRazryad(dec_number_to_digits, number);
	return digits_to_words[massiv[0]] + " hundred " + output_string;
}
