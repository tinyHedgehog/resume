var Product = function(title, category, price,	date, amount, img){
	this.id = Product.prototype.id++;
	this.title = title;
	this.category = category;
	this.price = price;
	this.date = date;
	this.amount = amount;
	this.img = img;
}
Product.prototype.id = 0;

var Store = function(name, address, markup){
	this.name = name;
	this.address = address;
	this.markup = markup;
	this.income = 0;
	this.products = [];
	Market.addStore(this);
}
Store.prototype.addProduct = function(prod){
	this.products.push(prod);
}
Store.prototype.sellProduct = function(id, amount) {
	this.products.forEach(el => (el.id == id) ? this.income += amount * el.price : '');
	this.reduceProductAmount(id, amount);
	alert(`${amount} product(s) sold`);
}
Store.prototype.reduceProductAmount = function(id, amount){
	this.products.forEach(el => (el.id == id) ? el.amount -= amount : '');
}

var Market = {
	storesList: [],
	loadStores: function(){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "data/stores.json", true);
		xhr.onload = function(){
			var data = JSON.parse(this.responseText);
			for(var i in data){
				var store = new Store(data[i].name, data[i].address, data[i].markup);
			}

			document.onload = (function(){
				showStores(Market.storesList);
				Market.showStats();				
			})();
		}
		xhr.send(null);
	},
	addStore: function(store){
		this.storesList.push(store);
	},
	showStats(){
		var button = createStatsButton();
		button.addEventListener('click', function(){
			showStoresStats();
		});
	}
}

Market.loadStores();

function createStatsButton() {
	var topBar = document.getElementById('market');

	var button = document.createElement('a');
	button.id = 'showStats';
	button.innerText = "Stores statistics";

	topBar.appendChild(button);
	return button;
}

function showStoresStats() {
	var content = document.getElementById('content');
	content.innerHTML = '';

	Market.storesList.forEach(function(store){
		console.log(store.icon);
		content.innerHTML += `<div class="stats"><img src="img/store_icon/${store.name}.png"/><h4>${store.name}</h4>
								<h5>Income: ${store.income}$</h5>
								<h5>Clear income: ${(store.income * parseInt(store.markup) / 100).toFixed(2)}$</h5>
								<h6 style="border-top: 1px solid black;">Address: ${store.address}</h6></div>`;
	});
}

function showStores(stores) {
	const sidebar = document.getElementById('sidebar');
	sidebar.innerHTML = '<h3>Stores</h3>';

	var storesList = document.createElement('ul');
	storesList.addEventListener('click', addProductsFromBase);

	for(var i in stores){
		var store = document.createElement('li');
		store.innerText = stores[i].name;
		store.classList.add('stores');
		storesList.appendChild(store);
	}

	sidebar.appendChild(storesList);
}

function addProductsFromBase() {
	var currStore = Market.storesList.filter(el => el.name == event.target.innerText)[0];

	var xhr = new XMLHttpRequest();
	xhr.open("GET", `data/goods/${currStore.name.toLowerCase().match(/[a-z]+/g).join('_')}_goods.json`, true);
	xhr.onload = function(){
		var goods = JSON.parse(this.responseText);

		for(var i in goods)
			currStore.addProduct(new Product(goods[i].title,
												goods[i].category,
												goods[i].price,
												goods[i].date,
												Math.round(Math.random()*50),
												goods[i].img));

		document.getElementById('sidebar').innerHTML = `<h3>${currStore.name}</h3>`;

		showStoreCategories(currStore);
	}
	xhr.send(null);
}

function showStoreCategories(store) {
	document.getElementById('content').innerHTML = '';

	var categories = [];
	store.products.forEach(el => (categories.every(x => x != el.category)) ? categories.push(el.category) : '');

	var categoriesList = createCategoriesList(categories);
	document.getElementById('sidebar').appendChild(categoriesList);

	categoriesList.addEventListener('click', function(){
		showProducts(store, event.target.innerText);
	});

	addGetbackButton(categoriesList);
}

function createCategoriesList(categories) {
	var categoriesList = document.createElement('ul');
	categoriesList.id = 'categories';

	for(var i in categories){
		var category = document.createElement('li');
		category.innerText = categories[i];
		category.classList.add('stores');
		categoriesList.appendChild(category);
	}
	categoriesList.classList.add('showCats');

	return categoriesList;
}

function addGetbackButton(categoriesList) {
	var getBack = document.createElement('li');
	getBack.innerText = 'Back to stores';
	getBack.id = 'getBack';

	getBack.addEventListener('click', function(){
		document.getElementById('categories').classList.add('hideCats');
		var timer = setTimeout(function(){
			showStores(Market.storesList);
		}, 550);
	});

	categoriesList.appendChild(getBack);
}

function showProducts(store, category) {
	var data = store.products.filter(el => el.category == category);

	if(document.getElementById('production'))
		document.getElementById('production').remove();

	var itemsList = document.createElement('ul');
	itemsList.id = 'production';

	for(var i in data){
		var item = createItem(data[i], store);
		itemsList.appendChild(item);
	}
	document.getElementById('content').innerHTML = '';
	document.getElementById('content').appendChild(itemsList);
}

function createItem(product, store){
	var item = document.createElement('li');
	item.classList.add('item');
	item.addEventListener('click', function(){
		if(!event.target.classList.contains('buttons'))
			return;

		var prodId = event.target.id.split('_')[0];
		var amount = +document.getElementById(event.target.id.split('_')[0] + '_input').value;

		if(amount > store.products.filter(el => el.id == prodId)[0].amount || isNaN(amount)){
			alert("Wrong amount of goods");
			return;
		}

		if(event.target.id.split('_')[1] == 'sellProduct')
			store.sellProduct(prodId, amount);
		else if(event.target.id.split('_')[1] == 'reduceAmount')
			store.reduceProductAmount(prodId, amount);

		refreshAmount(prodId + '_amount', amount);
	});
	
	var img = document.createElement('img');
	img.setAttribute('src', product.img)

	var title = document.createElement('h4');
	title.innerText = store.name.split(' ')[0] + ' ' + product.title;
	title.classList.add('title');

	var input = document.createElement('input');
	input.id = product.id + '_input';
	input.type = 'number';
	input.max = product.amount;
	input.min = 1;
	input.value = 1;

	var sellProduct = document.createElement('p');
	sellProduct.id = `${product.id}_sellProduct`;
	sellProduct.innerText = 'Sell';
	sellProduct.classList.add('buttons');

	var reduceAmount = document.createElement('p');
	reduceAmount.id = `${product.id}_reduceAmount`;
	reduceAmount.innerText = 'Remove';
	reduceAmount.classList.add('buttons');

	var price = document.createElement('h4');
	price.innerText =product.price + '$';
	price.classList.add('price');

	var amount = document.createElement('h6');
	amount.id = product.id + '_amount';
	amount.innerText = product.amount + " in stock";

	item.appendChild(img);
	item.appendChild(title);
	item.appendChild(input);
	item.appendChild(sellProduct);
	item.appendChild(reduceAmount);
	item.appendChild(price);
	item.appendChild(amount);

	return item;
}

function refreshAmount(id, amount){
	var curramount = parseInt(document.getElementById(id).innerText);
	document.getElementById(id).innerText = curramount - amount + ' left';
}

