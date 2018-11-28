function loadCategory(path){
	var goods = new XMLHttpRequest();
	goods.open("GET", path, true) 		
	goods.onload = function (str) {
		const data = this.responseText;

		const items = JSON.parse(data);  

		showSubcategories(items);
	}
	goods.send(null);
}

function loadSubCategory(path){
	var goods = new XMLHttpRequest();
	goods.open("GET", path, true) 		
	goods.onload = function (str) {
		const data = this.responseText;

		const items = JSON.parse(data);  

		showArticles(items);
	}
	goods.send(null);
}

function loadCategories(){	
	var xhr = new XMLHttpRequest();
	xhr.open("GET", "categories.json", true);
	xhr.onload = function(){
		onCategoriesloaded(JSON.parse(this.responseText));
	}
	xhr.send(null);
}

function onCategoriesloaded(categories){ 
	document.querySelector('nav').innerHTML = categories.map(cat => `<a class="cat" href="${cat.path}"> ${cat.title}</a>`).join('');
	document.querySelector('nav').addEventListener('click', function(e){
		if(e.target.nodeName.toLowerCase() == 'a' && e.target.parentNode.nodeName.toLowerCase() == 'nav'){
			loadCategory(e.target.getAttribute('href'));
			e.preventDefault();
		}
	})
	document.querySelector('ul').addEventListener('click', function(e){
		if(e.target.nodeName.toLowerCase() == 'a' && e.target.parentNode.nodeName.toLowerCase() == 'ul'){
			loadSubCategory(e.target.getAttribute('href'));
			e.preventDefault();
		}
	})
}

function openDescription(path, elem){
	const xhr = new XMLHttpRequest();
	xhr.open("GET", path, true);
	xhr.onload = function(){
		elem.innerHTML = this.responseText;
	}
	xhr.send(null);
}

function showSubcategories(items){
	document.getElementById('subCat').innerHTML = '';
	document.querySelector('ul').innerHTML = items.map(subCat => `<a class="subCat" href="${subCat.path}"> ${subCat.title}</a>`).join('');
}

function showArticles(items){
	document.getElementById('list').innerHTML = '';
	items.forEach(function(item){
		var div = document.createElement('div');
		div.innerHTML = `<h2>${item.title}</h2>`;
		div.setAttribute('class', 'big');

		var img = document.createElement('img');
		img.setAttribute('src', `img/${item.img}`);

		div.appendChild(img);

		var divShortText = document.createElement('div');
		divShortText.setAttribute('data-path', `shortArt/${item.descriptionFile}`);
		divShortText.setAttribute('class', 'shortArt');
		divShortText.innerHTML = openDescription(divShortText.getAttribute("data-path"),divShortText);
		
		var divFullText = document.createElement('div');
			divFullText.innerHTML = `<button class="open-description" data-path="fullArt/${item.descriptionFile}">Learn more</button>
			<div id="fullArt" class="fullArt" hidden></div>`;
			var btn = divFullText.querySelector(".open-description");
			btn.addEventListener('click', function(){
				openDescription(this.getAttribute("data-path"),this.nextElementSibling);
				this.nextElementSibling.hidden = !this.nextElementSibling.hidden;
			})

		var rating = document.createElement('span');
		rating.setAttribute('class', 'rating');
		rating.innerHTML = "Rating: ☆☆☆☆☆";

		var views = document.createElement('span');
		views.setAttribute('class', 'views');
		views.innerHTML = `<img src="eye.png" id="eye"> ${item.views}`;
		
		div.appendChild(divShortText);
		div.appendChild(divFullText);
		div.appendChild(rating);
		div.appendChild(views);

		var section = document.getElementById('list')
		section.appendChild(div);	
		
		
	});
}

loadCategories()