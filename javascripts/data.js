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

