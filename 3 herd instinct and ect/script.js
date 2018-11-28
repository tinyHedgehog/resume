//---------------------------------countDown------------

var countDownTitle = document.createElement("p");

countDownTitle.innerText = "Time left to do something usefull";
document.body.appendChild(countDownTitle);

var countDown = document.createElement("p");
countDown.setAttribute("id", "timer");
document.body.appendChild(countDown);

var end = new Date();
end.setHours(-3,0,0,0);
end.setDate(end.getDate()+1);
countDown.innerText = new Date(end - new Date()).toLocaleTimeString();

var timer = setInterval(function(){
	countDown.innerText = new Date(end - new Date()).toLocaleTimeString();
},1000);

//---------------------------------herdInstinct------------

var people = ['Olivia','Oliver','Amelia','Harry','Isla','Jack',
'Emily','George','Ava','Noah','Lily','Charlie','Mia','Jacob',
'Sophia','Alfie','Isabella','Freddie','Grace','Oscar'];
var cities = ['New York', 'Los Angeles', 'Chicago', 'Houston',
'Philadelphia','Phoenix','San Antonio','San Diego'];
var goods = ['an Aston Martin','an iPhone','a new child','some bisquits',
'a new life','a great pair of socks'];



function getRand(a,b){
	return Math.round((b - a) * Math.random() + a);
}

var herdState = true;

var herdTimer = setTimeout(function Tim(){
	if(herdState){
		var herdInst = document.createElement('p');
		herdInst.setAttribute('id', 'herdInst');
		herdInst.innerText = `${people[getRand(0,people.length-1)]} from ${cities[getRand(0,cities.length-1)]} is an owner of\n ${goods[getRand(0,goods.length-1)]} from now!`;
		document.body.appendChild(herdInst);
		var icon = document.createElement('img');
		icon.setAttribute('src', 'img/icon.jpg');
		icon.setAttribute('id', 'iconAmazon');
		herdInst.appendChild(icon);
		herdState = false;
		setTimeout(Tim, 5000);
	}
	else{
		document.getElementById('herdInst').remove();
		herdState = true;
		setTimeout(Tim, getRand(10000, 15000))
	}
}, getRand(3000,5000));

//---------------------------------multiplyTable------------

var button = document.createElement("button");
button.innerText = 'Generate table';
button.setAttribute('onclick', 'multiplyTable()');
button.setAttribute('style', 'margin: 30px');
document.body.appendChild(button);

function multiplyTable() {
	clear();

	var n = prompt('Enter N of elemets');

	var tableTitle = document.createElement('p');
	tableTitle.innerText = 'Multiply Table';
	tableTitle.setAttribute('class', 'multiply');
	document.body.appendChild(tableTitle);

	var table = document.createElement('table');
	table.border = '1px';
	table.align = 'center';
	table.setAttribute('class', 'multiply');
	document.body.appendChild(table);

	var tbody = document.createElement('tbody');
	table.appendChild(tbody);

	for(var i = 1; i <= n; i++){
		tbody.appendChild(document.createElement('tr'));
		for(var j = 1; j <= n; j++){
			var cell = tbody.lastElementChild.appendChild(document.createElement('td'));
			(i == j) ? cell.setAttribute('bgcolor', 'red') : '';
			cell.align = 'center';
			(i == j && i == 1) ? cell.innerText = '*' : cell.innerText = `${i * j}`
		}
	}
}

//---------------------------------countries------------

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

var buttonCountries = document.createElement('button');
buttonCountries.innerText = 'Countries';
buttonCountries.setAttribute('onclick', 'countriesShow()')
buttonCountries.setAttribute('style', 'margin: 30px');
document.body.appendChild(buttonCountries);

function countriesShow() {

	
	var n = prompt('Number of countries');
	if(n > 10){
		alert('thats too many');
		return;
	}

	clear();

	var countriesTitle = document.createElement('p');
	countriesTitle.innerText = "Pleasant countries to live in: ";
	countriesTitle.setAttribute('class', 'countries');
	document.body.appendChild(countriesTitle);

	var table = document.createElement('table');
	table.align = 'center';
	table.border = '1px';
	table.setAttribute('class', 'countries');
	document.body.appendChild(table);

	var header = document.createElement('thead');
	table.appendChild(header);

	var row = document.createElement('tr');
	header.appendChild(row);

	for(var i = 0; i < 4; i++){
		var cell = row.appendChild(document.createElement('td'));
		cell.innerText = Object.keys(countries[0])[i];
	}

	var tBody = document.createElement('tbody');
	table.appendChild(tBody);

	for(var i = 0; i < n; i++){
		var bodyRow = tBody.appendChild(document.createElement('tr'));
		var countryCell = bodyRow.appendChild(document.createElement('td'));
		countryCell.innerText = countries[i].country;

		var flagCell = bodyRow.appendChild(document.createElement('td'));
		var flagImg = document.createElement('img');
		flagImg.setAttribute('src', `img/flags/${countries[i].country}.png`);
		flagImg.setAttribute('id', 'flag');
		flagCell.appendChild(flagImg);

		var codeCell = bodyRow.appendChild(document.createElement('td'));
		codeCell.innerText = countries[i].code;

		var populationCell = bodyRow.appendChild(document.createElement('td'));
		populationCell.innerText = countries[i].population + 'Mln';
	}

}

//---------------------------------cleaning------------

function clear() {
	if(document.querySelector('p.multiply'))
		document.querySelector('p.multiply').remove();
	if(document.querySelector('table.multiply'))
		document.querySelector('table.multiply').remove();

	if(document.querySelector('p.countries'))
		document.querySelector('p.countries').remove();
	if(document.querySelector('table.countries'))
		document.querySelector('table.countries').remove();
}

