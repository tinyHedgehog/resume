var str = "jeka1197@gmail.com,   negfreak@gmail.com  , ldm155@mail.ru  , hello, +6351683543  , ld@yandex.ru,  ld15@yandex.ru , ldmv15@yandex.ru, ";
var reg = /[a-zA-z0-9\.\_\-]+(@[a-zA-z\.\_\-]+)\.[a-z]{2,10}/;

var mails = str.split(",")
.map(s => s.trim())
.filter(s => s.match(reg) != null);

console.log(mails);

var operators = [];

mails.forEach(el => (operators.every(x => x.name != el.split("@")[1])) ?
	operators.push({name: el.split("@")[1], count: 1}) 
	: operators.map(x =>  x.name == el.split("@")[1] ? x.count++ : ''));

operators.sort((a,b) => b.count - a.count)
.forEach(el => {console.log(`operator: ${el.name}, adresses count: ${el.count}`), el.adresses = []});

mails.forEach(el => operators.map(x => x.name == el.split("@")[1] ? x.adresses.push(el.split("@")[0]) : ''));

for(var j = 0; j < operators.length; j++){
	operators[j].avgLength = 0;
	for(var i = 0; i < operators[j].adresses.length; i++ ){
		operators[j].avgLength += operators[j].adresses[i].length;
	}
	operators[j].avgLength /= operators[j].count;
}

console.log(operators)
for(var j = 0; j < operators.length; j++){
	for(var i = 0; i < operators[j].adresses.length; i++ ){
		operators[j].maxLength = Math.max(...operators[j].adresses.map(adress => adress.length))
		operators[j].minLength = Math.min(...operators[j].adresses.map(adress => adress.length))
	}
	
}
console.log(operators)

var result = {};
operators.forEach(operator => {
	operator.adresses.join("").split('').forEach(symbol => {
		result[symbol] === undefined ? result[symbol] = 1 : result[symbol] += 1
	})
})

console.log(result);