var money = {
	USD: {USD: 1, EUR: 1.14, RUB: 65.68, BYN: 2.11},
	EUR: {USD: 0.88, EUR:1, RUB: 74.86, BYN: 2.40},
	RUB: {USD: 0.015, EUR: 0.013, RUB: 1, BYN: 0.032},
	BYN: {USD: 0.47, EUR: 0.42, RUB: 31.12, BYN: 1}
};

var value1 = document.getElementById('value1');
value1.addEventListener('input', convertation);
var currency1 = document.getElementById('currency1');
currency1.addEventListener('input', convertation);
var currency2 = document.getElementById('currency2');
currency2.addEventListener('input', convertation);
var value2 = document.getElementById('value2');
value2.addEventListener('input', convertation);

function convertation() {
	switch(event.target.id){
		case 'value1':
			value2.value = (Number(value1.value) * money[currency2.value][currency1.value]).toFixed(2);
			break;
		case 'value2':
			value1.value = (Number(value2.value) * money[currency2.value][currency1.value]).toFixed(2);
			break;
		case 'currency1':
			value1.value = (Number(value2.value) * money[currency1.value][currency2.value]).toFixed(2);
			break;
		case 'currency2':
			value2.value = (Number(value1.value) * money[currency1.value][currency2.value]).toFixed(2);
			break;
	}
}