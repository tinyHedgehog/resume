const Routes={
	"#table":{
		path:"table.html",
		handler:function(){
			var cells = document.getElementsByTagName('td');
			for(var i = 0; i < cells.length; i++){
				cells[i].setAttribute('width', '10px');
			 	cells[i].setAttribute('height', '10px');
				cells[i].addEventListener('mouseover', function(){
					event.target.style.background = 'pink';
					var timer = setTimeout(() => this.style.background = 'white', 3000);	
				});
			};
		}
	},
	"#countries":{
		path: "countries.html",
		handler:function(){
			var n = prompt('Number of countries');
			if(n > 10){
				alert('thats too many');
				return;
			}else{
				var trs = document.getElementsByClassName('country');
				for(var i = n; i < trs.length; i++){
					trs[i].style.display = "none";
				}
			}
		}
	},
	"#calculator":{
		path: "calculator.html",
		handler: function(){
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
		}
	},
	"#tesla":{
		path: "tesla.html"
	},
	"#elon":{
		path: "elon.html"
	}
}  //объект с маршрутами (если переходим поссылке открывается этот файл)

function refreshContainer(){
	const hash = location.hash; //открытый в данный момент 
	if( hash in Routes){
		const path = Routes[hash].path;
		const xhr = new XMLHttpRequest();
		xhr.open('GET', path, true);
		xhr.onload = function(){
			onPageLoaded(this.responseText, hash);
		}
		xhr.send(null)
	}
}

function onPageLoaded(text,hash){
	const div = document.getElementById('container');
	div.innerHTML = text;
	if(typeof Routes[hash].handler=="function"){  //проверяем есть ли в пути такие элементы
		Routes[hash].handler();
	}
}

window.onhashchange = refreshContainer; //вызывается когда меняется hash (после #)
refreshContainer();  //вызывется принудительно первый раз и загружает ранее открытый hash

var countries = [
	{
		country: "Germany",
		flag: "",
		code: "+49",
		population: 81.8
	},
	{
		country: "Poland",
		flag: "",
		code: "+48",
		population: 38.5
	},
	{
		country: "United Kingdom",
		flag: "",
		code: "+44",
		population: 63.4
	},
	{
		country: "Sweden",
		flag: "",
		code: "+46",
		population: 9.5
	},
	{
		country: "Netherlands",
		flag: "",
		code: "+31",
		population: 16.7
	},
	{
		country: "France",
		flag: "",
		code: "+33",
		population: 65.3
	},
	{
		country: "Finland",
		flag: "",
		code: "+358",
		population: 5.4
	},
	{
		country: "Switzerland",
		flag: "",
		code: "+41",
		population: 8.4
	},
	{
		country: "USA",
		flag: "",
		code: "+1",
		population: 325.7
	},
	{
		country: "Norway",
		flag: "",
		code: "+47",
		population: 5.3
	}
];