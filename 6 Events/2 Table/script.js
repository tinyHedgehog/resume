var n = prompt("enter N for table NxN");

var table = document.createElement('table');
table.border = '1px';
table.setAttribute('align', 'center');
document.body.appendChild(table);

for(var i = 0; i < n; i++){
	var row = document.createElement('tr');
	table.appendChild(row);
	for(var j = 0; j < n; j++){
		var cell = document.createElement('td');
		cell.setAttribute('width', '10px');
		cell.setAttribute('height', '10px');
		cell.setAttribute('class','cells');
		cell.addEventListener('mouseover', handler);
		row.appendChild(cell);
	}
}

function handler() {
		event.target.style.background = 'pink';
		var timer = setTimeout(() => this.style.background = 'white', 3000);
}