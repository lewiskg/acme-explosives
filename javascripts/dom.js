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