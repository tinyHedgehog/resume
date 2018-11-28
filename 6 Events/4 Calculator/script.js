var buttons = document.getElementsByClassName('buttons');
for(var i = 0; i < buttons.length; i++){
	buttons[i].addEventListener('click', calculator);
}

var memory = 0;
var value2ult = 0;
var operation = false;
var opertionLast;

function calculator() {
	var display = document.getElementById('input');
	var calculate = opertionLast == 'pls' || opertionLast == 'min' || opertionLast == 'mul' || opertionLast == 'div';

	if(event.target.id.match(/\d/)){
		if(Number(display.value) == 0 || operation == true){
			display.value = event.target.id;
			operation = false;
		}
		else{
			display.value += event.target.id;
		}
	}
	else{
		operation = true;
		switch(event.target.id){
			//clear
			case 'clear':
				value2ult = 0;
				display.value = 0;
				break;
			//operations
			case 'pls':
				if(calculate){
					value2ult += Number(display.value);
					display.value = value2ult;
				}else{
					value2ult = Number(display.value);
				}
				break;
			case 'min':
				if(calculate){
					value2ult -= Number(display.value);
					display.value = value2ult;
				}else{
					value2ult = Number(display.value);
				}
				break;
			case 'mul':
				if(calculate){
					value2ult *= Number(display.value);
					display.value = value2ult;
				}else{
					value2ult = Number(display.value);
				}
				break;
			case 'div':
				if(calculate){
					value2ult /= Number(display.value);
					display.value = value2ult;
				}else{
					value2ult = Number(display.value);
				}
				break;
			//memory
			case 'M+':
				memory += Number(display.value);
				break;
			case 'M-':
				memory -= Number(display.value);
				break;
			case 'MR':
				display.value = Number(memory);
				break;
			case 'MC':
				memory = 0;
				break;
			//equal
			case 'doit':
				switch(opertionLast){
					case 'pls':
						value2ult += Number(display.value);
						display.value = value2ult;
						break;
					case 'min':
						value2ult -= Number(display.value);
						display.value = value2ult;
						break;
					case 'mul':
						value2ult *= Number(display.value);
						display.value = value2ult;
						break;
					case 'div':
						value2ult /= Number(display.value);
						display.value = value2ult;
						break;
					case 'MR':
						display.value = Number(memory);
						break;

				}
			break;
		}
		if(event.target.id != 'MR'){
			opertionLast = event.target.id;
		}
	}
}