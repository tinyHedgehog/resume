var Tetris = {

	init: function(){

		this.getGameMode();
		this.getDifficultyLevel();

		this.createField(10, 20);
		this.startPointX = this.field.rows[0].cells.length / 2 - 1;
		this.currPositionX = this.startPointX;

		var partNumber = Math.round(Math.random() * (this.elements.length - 1));
		this.currElement = this.elements[partNumber];
		this.drawElement(this.currElement, this.startPointX, this.startPointY);
		
		//sidebar
		this.setLinesCounter(0);
		this.nextElement = this.elements[Math.round(Math.random() * (this.elements.length - 1))];
		this.drawNextElement();


		this.play();
	},

	fourPieces:[[[1,1],[1,1]],							//O
				[[1,1,1,1]],							//I
				[[1,1,1],[0,0,1]],						//L
				[[1,1,1],[1,0,0]],						//l
				[[0,1,1],[1,1,0]],						//S
				[[1,1,0],[0,1,1]],						//s
				[[1,1,1],[0,1,0]]						//T
	],

	fivePieces:[[[0,1],[1,1],[1,1]],					//P
				[[1,0],[1,1],[1,1]],					//p
				[[1,1,1],[0,1,0],[0,1,0]],				//T
				[[0,1,0],[1,1,1],[0,1,0]],				//X
				[[1,1,1,1,1]],							//I
				[[1,1,1,1],[0,0,0,1]],					//L
				[[1,1,1,1],[1,0,0,0]],					//l
				[[0,0,1],[0,1,1],[1,1,0]],				//W
				[[1,0,0],[1,1,0],[0,1,1]],				//w
				[[1,0],[1,1],[0,1],[0,1]],				//N
				[[0,1],[1,1],[1,0],[1,0]],				//n
				[[0,0,1],[0,0,1],[1,1,1]],				//V
				[[1,0,0],[1,0,0],[1,1,1]],				//v
				[[0,1,1],[0,1,0],[1,1,0]],				//Z
				[[1,1,0],[0,1,0],[0,1,1]],				//z
				[[0,1,0],[1,1,0],[0,1,0],[0,1,0]],		//Y
				[[0,1,0],[0,1,1],[0,1,0],[0,1,0]],		//y
				[[1,0,1],[1,1,1]],						//U
				[[1,1,0],[0,1,1],[0,1,0]],				//F
				[[0,1,1],[1,1,0],[0,1,0]]				//f				
	],

	speed: 0,
	linesCounter: 0,

	field: 0,
	fieldArr: [],
	currElement: 0,
	nextElement: 0,

	elements: 0,

	startPointX: 0,
	startPointY: 0,
	currPositionX: 0,
	currPositionY: 0

	,play: function(){
		var timer = setInterval(function() {

			if (Tetris.currPositionY + Tetris.currElement.length != 20 && !Tetris.fallen()){

				document.body.addEventListener('keydown', Tetris.movement);

				Tetris.deleteElement(Tetris.currElement, Tetris.currPositionX, Tetris.currPositionY);
				Tetris.currPositionY++;
				Tetris.drawElement(Tetris.currElement, Tetris.currPositionX, Tetris.currPositionY);

			}
			else{
				if(Tetris.field.rows[Tetris.startPointY+1].cells[Tetris.startPointX+1].classList.contains('colored')){
					clearInterval(timer);
					if(confirm('GAME OVER\nwanna play more'))
						location.reload();
				}

				document.body.removeEventListener('keydown', Tetris.movement);
				
				Tetris.checkFilledLines();
				
				Tetris.currElement = Tetris.nextElement;
				Tetris.nextElement = Tetris.elements[Math.round(Math.random()*(Tetris.elements.length-1))];
				Tetris.drawNextElement();

				Tetris.currPositionX = Tetris.startPointX;
				Tetris.currPositionY = 0;
			}

		}, 1000 - this.speed);
	}

	,getGameMode: function(){
		var gameMode = prompt('enter game mode\n"1" - 4pieced elements\n"2" - 5pieced elements');

		if(gameMode == 1)
			this.elements = this.fourPieces.slice();

		else if(gameMode == 2)
			this.elements = this.fivePieces.slice();

		else{
			alert('wrong level');
			location.reload();
		}	
	}

	,getDifficultyLevel: function(){
		var level = prompt('enter level (1-9)');

		if(level < 10 && level >= 1){
			document.getElementById('level').innerText = level;
			this.speed = Number(level) * 100;
		}
		else{
			alert('wrong level');
			location.reload();
		}
	}

	,setLinesCounter: function(lines){
		document.getElementById('lines').innerText = lines;
		Tetris.linesCounter = lines;
	}

	,drawNextElement: function(){
		if(document.getElementById('nextTable'))
			document.getElementById('nextTable').remove()

		var nextElementTable = document.createElement('table');
		nextElementTable.id = 'nextTable';
		document.getElementById('next').appendChild(nextElementTable);

		for(var i = 0; i < Tetris.nextElement.length; i++){
			var row = document.createElement('tr');
			nextElementTable.appendChild(row);
			for(var j = 0; j < Tetris.nextElement[i].length; j++){
				var cell = document.createElement('td');
				cell.id = 'nextElementCell';
				if(Tetris.nextElement[i][j] == 1)
					cell.classList.add('colored');
				row.appendChild(cell);
			}
		}
	}

	,createField: function(fieldWidth, fieldHeight) {
		var gameArea = document.createElement('table');
		gameArea.border = '1px';

		document.getElementById('container1').insertBefore(gameArea, document.getElementsByClassName('sideBar')[0]);

		for (var i = 0; i < fieldHeight; i++) {
			var row = document.createElement('tr')
			gameArea.appendChild(row);

			this.fieldArr.push(new Array(fieldWidth).fill(0));

			for (var j = 0; j < fieldWidth; j++) {
				var cell = document.createElement('td');
				cell.classList.add('field');
				row.appendChild(cell);
			}
		}
		this.field = gameArea;
	}

	,drawElement: function(element, x, y) {
		for (var i = 0; i < element.length; i++)
			for (var j = 0; j < element[i].length; j++)
				if (element[i][j] == 1)
					this.field.rows[y + i].cells[x + j].classList.add('colored');
	}

	,deleteElement: function(element, x, y) {
		for (var i = 0; i < element.length; i++)
			for (var j = 0; j < element[i].length; j++)
				if (element[i][j] == 1)
					this.field.rows[y + i].cells[x + j].classList.remove('colored');
	}



	,movement: function(){

		Tetris.deleteElement(Tetris.currElement, Tetris.currPositionX, Tetris.currPositionY);

		//left
		if (event.keyCode == 37)
			(!Tetris.impossibleLeftMovement()) ? Tetris.currPositionX-- : '';

		//right
		else if(event.keyCode == 39)
			(!Tetris.impossibleRightMovement()) ? Tetris.currPositionX++ : '';

		//rotation
		else if (event.keyCode == 38) {

			if(Tetris.rotationIsPossible()){
				var newShape = [];

				for(var i = 0; i < Tetris.currElement[0].length; i++){
					newShape.push([Tetris.currElement[0][i]]);
					for(var j = 1; j < Tetris.currElement.length; j++)
						newShape[i].push(Tetris.currElement[j][i]);
				}
				newShape.reverse();

				Tetris.currElement = newShape;
			}
		}

		Tetris.drawElement(Tetris.currElement, Tetris.currPositionX, Tetris.currPositionY);
	}

	,impossibleLeftMovement: function(){
		var leftLine = [];

		for(var i = 0; i < Tetris.currElement.length; i++)	
			for(var j = 0; j < Tetris.currElement[i].length; j++)
				if(Tetris.currElement[i][j] == 1 && !leftLine.some(el => el[0] == i))
					leftLine.push([i,j]);

		return leftLine.some(el => (
			(Tetris.field.rows[Tetris.currPositionY + el[0]].cells[Tetris.currPositionX + el[1] - 1])?
			Tetris.field.rows[Tetris.currPositionY + el[0]].cells[Tetris.currPositionX + el[1] - 1].classList.contains('colored')
			: true));
	}

	,impossibleRightMovement: function(){
		var rightLine = [];

		for(var i = 0; i < Tetris.currElement.length; i++)	
			for(var j = Tetris.currElement[i].length - 1; j >= 0; j--)
				if(Tetris.currElement[i][j] == 1 && !rightLine.some(el => el[0] == i))
					rightLine.push([i,j]);

		return rightLine.some(el => (
			(Tetris.field.rows[Tetris.currPositionY + el[0]].cells[Tetris.currPositionX + el[1] + 1])?
			Tetris.field.rows[Tetris.currPositionY + el[0]].cells[Tetris.currPositionX + el[1] + 1].classList.contains('colored')
			: true));
	}

	,rotationIsPossible: function(){
		var newElemHeight = Tetris.currElement[0].length;
		var newElemWidth = Tetris.currElement.length;

		var fieldWidth = Tetris.field.rows[0].cells.length;
		var fieldHeight = Tetris.field.rows.length

		//near the bottom
		if(Tetris.currPositionY + newElemHeight > fieldHeight)
			return false;

		//near the filled cells
		for(var i = Tetris.currPositionY; i < Tetris.currPositionY + newElemHeight; i++){
			for(var j = Tetris.currPositionX; j < Tetris.currPositionX + newElemWidth; j++){
				if(Tetris.field.rows[i].cells[j]){
					if(Tetris.field.rows[i].cells[j].classList.contains('colored')){
						Tetris.drawElement(Tetris.currElement, Tetris.currPositionX, Tetris.currPositionY);
						return false;
					}
				}
			}
		}

		//between the right wall and filled cells
		if(Tetris.currPositionX + newElemWidth > fieldWidth){

			for(var i = Tetris.currPositionY; i < Tetris.currPositionY + newElemHeight; i++){
				for(var j = newElemWidth + (fieldWidth - Tetris.currPositionX); j < fieldWidth; j++){

					if(Tetris.field.rows[i].cells[j].classList.contains('colored')){
						Tetris.drawElement(Tetris.currElement, Tetris.currPositionX, Tetris.currPositionY);
						return false;
					}
				}
			}
			Tetris.currPositionX -= newElemWidth - (fieldWidth - Tetris.currPositionX);
		}
		return true;		
	}

	,fallen: function(){
		var bottomLine = [];

		for(var i = Tetris.currElement.length - 1; i >= 0; i--){			
			for(var j = 0; j < Tetris.currElement[i].length; j++){
				if(Tetris.currElement[i][j] == 1 && !bottomLine.some(el => el[1] == j)){
					bottomLine.push([i,j]);
				}
			}
		}
		return bottomLine.some(el => (
			(Tetris.field.rows[Tetris.currPositionY + el[0] + 1] != undefined)?
			Tetris.field.rows[Tetris.currPositionY + el[0] + 1].cells[Tetris.currPositionX + el[1]].classList.contains('colored')
			: false));
	}

	,checkFilledLines: function(){
		for(var i = 0; i < Tetris.field.rows.length; i++)
			for(var j = 0; j < Tetris.field.rows[i].cells.length; j++)
				if(Tetris.field.rows[i].cells[j].classList.contains('colored'))
					Tetris.fieldArr[i][j] = 1;

		if(Tetris.fieldArr.some(el => el.every(x => x == 1))){

			var toDel = Tetris.fieldArr.reduce((a, b, i) => (b.every(x => x == 1)) ? a += String(i)+' ' : a, '');
			toDel = toDel.split(' ');
			toDel.pop()

			for(var i = 0; i < toDel.length; i++){
				Tetris.setLinesCounter(++Tetris.linesCounter);
				Tetris.fieldArr.splice(Number(toDel[i]), 1);
				Tetris.fieldArr.unshift(new Array(Tetris.field.rows[0].cells.length).fill(0));
			}

			Tetris.redrawField();
		}
	}

	,redrawField: function(){
		for(var i = 0; i < Tetris.field.rows.length; i++)
			for(var j = 0; j < Tetris.field.rows[i].cells.length; j++){
				if(Tetris.fieldArr[i][j] == 1)
					Tetris.field.rows[i].cells[j].classList.add('colored');
				else
					Tetris.field.rows[i].cells[j].classList.remove('colored');
			}
	}
}



Tetris.init();