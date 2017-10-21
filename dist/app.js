(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const dom = require("./dom");

let explosives = [];
let CategoryArray = [];
let TypeArray = [];
let ProductArray = [];

let categoriesJSON = () => {
	return new Promise(function(resolve, reject) {
		$.ajax('./db/categories.json').done(function(data1){
			resolve(data1.categories);
		}).fail(function(error1){
			reject(error1);
		});
	});
};

let typesJSON = () => {
	return new Promise(function(resolve, reject) {
		$.ajax('./db/types.json').done(function(data2){
			resolve(data2.types);
		}).fail(function(error2){
			reject(error2);
		});
	});
};

let productsJSON = () => {
	return new Promise(function(resolve, reject) {
		$.ajax('./db/products.json').done(function(data3){
			resolve(data3.products);
		}).fail(function(error3){
			reject(error3);
		});
	});
}; 

let explosivesGetter = () => {
	Promise.all([categoriesJSON(), typesJSON(), productsJSON()]).then(function(results) { 
			CategoryArray 	= results[0];
			TypeArray 		= results[1];
			ProductArray 	= results[2];

			TypeArray.forEach(function(typ) {
				let categoryId = typ.category;
				let categoryName = CategoryArray[categoryId].name;
				typ.category = categoryName;
			});

			ProductArray.forEach(function(prod){
				let prodKey = Object.keys(prod);
				let prodType = prod[prodKey].type;
				prod[prodKey].type = TypeArray[prodType];
			});

		makeExplosives(ProductArray);

	}).catch(function(error){
		console.log("error from Promise.all", error);
	});
};

let makeExplosives = (explosivesArray) => {
	explosivesArray.forEach(function(prod){
		let prodKey = Object.keys(prod);
		let product = prod[prodKey];
		dom.domString(product);
	});
};

let getCategories = () => {
	categoriesJSON().then(function(categoryObjects){
		dom.printCategories(categoryObjects);
	});
};

const initializer = () => {
	getCategories();
	explosivesGetter();
};

module.exports = {initializer:initializer, getCategories:getCategories};


},{"./dom":2}],2:[function(require,module,exports){
"use strict";

const evts = require('./events');

const printCategories = (category) => {
	let strang =  '<select id="dropdown-menu">';
		strang += '<option value="all">All</option>';
	category.forEach(function(cat) {
		strang += `<option value="${cat.name}">${cat.name}</option>`;
	});
	strang += '</select>';
	$('#selector').append(strang);
	evts.addListener();
};

const domString = (explosives) => {
	let domStrang = "";
		domStrang +=  `<div class="${explosives.type.category} prodCard col-sm-3 col-md-3">`;
		domStrang +=      `<div class="card-product">`;
		domStrang +=        `<h3>${explosives.name}</h3>`;
		domStrang += 		`<p>${explosives.type.name}</p>`;
		domStrang += 		`<p>${explosives.type.category}</p>`;
		domStrang +=        `<p>${explosives.description}</p>`;
		domStrang +=        `<p>${explosives.name}</p>`;
		domStrang +=      `</div>`;
		domStrang +=  `</div>`;
	printToDom(domStrang);
};

const printToDom = (strang) => {
	$("#fireworks").append(strang);
};

module.exports = {domString, printCategories}; 
},{"./events":3}],3:[function(require,module,exports){
"use strict";

const showClass = (arrayOfElements) => {
	for (let i=0; i<arrayOfElements.length;i++) {
		arrayOfElements[i].classList.remove('hidden');
	}
};

const hideClass = (arrayOfElements) => {
	for (let i=0; i<arrayOfElements.length;i++) {
		arrayOfElements[i].classList.add('hidden');
	}
};

const hideDivs = (categoryType) => {
	let fireworksArray = document.getElementsByClassName('Fireworks');
	let demolitionArray = document.getElementsByClassName('Demolition');

	if (categoryType === 'Fireworks') {
		showClass(fireworksArray);
		hideClass(demolitionArray);
	} else if (categoryType === 'Demolition'){
		showClass(demolitionArray);
		hideClass(fireworksArray);
	} else {
		showClass(fireworksArray);
		showClass(demolitionArray);
	}
};

const addListener =() => {
	$('#dropdown-menu').on('change',function(e){
		hideDivs(this.value);
	});
};




module.exports = {addListener}; 

},{}],4:[function(require,module,exports){
"use strict";

const data = require('./data');

$(document).ready(function() {
	data.initializer();
});
},{"./data":1}]},{},[4]);
