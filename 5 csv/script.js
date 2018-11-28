var csv ="nameRus,nameEn,language,population,area,capital,time,avgIncome,\nРоссия,Russiajhgkjhgjkhgjkhgkjhgkjg,russian,146.88,17.125,Moscow,+3,750,\nСША,USA,english,325.7,9.834,Washington,-5,2700,\nГермания,Germany,deutsch,82.67,0.375,Berlin,+1,1700,\nВеликобритания,Great Britain,english,130,1,London,+0,2100,\nКитай,China,chinese,2000,8,Beijing,+8,600";
//Польша,Poland,polish,60,0.300,Warsaw,+1,1500,
var arr = csv.split("\n")
			 .map(el => el.split(','));

var countries = [];
for(var i = 1; i < arr.length; i++){
	countries.push({})
 	for(var k in arr[i]){
		countries[i-1][arr[0][k]] = arr[i][k];
	}
}

console.log(countries);

countries.sort((a,b) => a.population/a.area - b.population/b.area);
var maxDensity = countries[countries.length - 1];
var minDensity = countries[0];
console.log(`${maxDensity.nameEn} has max density, ${minDensity.nameEn} has min density`);

countries.sort((a,b) => a.avgIncome/a.population - b.avgIncome/b.population);
var maxVVP = countries[countries.length - 1];
var minVVP = countries[0];
console.log(`${maxVVP.nameEn} with max VVP: ${(maxVVP.avgIncome/maxVVP.population).toFixed(2)}, and ${minVVP.nameEn} with min VVP: ${minVVP.avgIncome/minVVP.population}`);

countries.sort((a,b) => a.avgIncome - b.avgIncome);

if(countries.length % 2 == 0){
	var medianHigh = countries[(countries.length-1) / 2].avgIncome;
	var medianLow = countries[(countries.length) / 2].avgIncome;
	var median = (medianHigh/medianLow)/2;
	var medianUp = countries[(countries.length) / 2].avgIncome;
	var medianDown = countries[(countries.length+1) / 2].avgIncome;
}else{
	var median = countries[(countries.length-1) / 2].avgIncome;
	var medianUp = countries[Math.ceil(countries.length / 2)].avgIncome;
	var medianDown = countries[Math.floor((countries.length-2) / 2)].avgIncome;
	console.log(`${median} median value, ${medianUp} nearest to median, ${medianDown} nearest to median`)
}

var date = new Date();
var hours = date.getUTCHours();
var minutes = date.getMinutes()
var seconds = date.getSeconds();

function getRand(a, b) {
	var x = Math.random();
	return(Math.floor((b-a)*x)+a);
}
var arr2 = [];
for(var i = 0; i < 3; i++){
	arr2.push(countries[getRand(0, countries.length - 1)]);
}

console.log(`City ${arr2[0].capital} and time ${hours + Number(arr2[0].time)}:${minutes}:${seconds}\nCity ${arr2[1].capital} and time ${hours + Number(arr2[1].time)}:${minutes}:${seconds}\nCity ${arr2[2].capital} and time ${hours + Number(arr2[2].time)}:${minutes}:${seconds}\n`);

var languages = [];
for(var i = 0; i < countries.length; i++){
	languages.push(countries[i].language);
}
var result = {};
var countryLangs = [];
var population = 0;

languages.forEach(lang => {
	var population = 0;
	var countryArr = [];
	countries.forEach(country => {
		if(lang == country.language) {
			population += Number(country.population)
			countryArr.push(country.nameEn)
		}
	})
	result[lang] = {
		population: population,
		countries: countryArr
	}
})

console.log("Language stats:");
console.log(result);

for(var i = 0; i < countries.length; i++){
	if(countries[i].nameEn.length > countries[i].nameRus.length + 1){
		console.log(countries[i].nameEn + " has it's english name longer then russian name");
	}
}