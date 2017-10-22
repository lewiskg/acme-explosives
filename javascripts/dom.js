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
		domStrang +=  `<div class="${explosives.type.category} prodCard col-md-3 col-sm-3">`;
		domStrang +=      `<div class="card-product">`;
		domStrang +=        `<h3>${explosives.name}</h3>`;
		domStrang += 		`<p><span class="bold">Type:</span> ${explosives.type.name}</p>`;
		domStrang += 		`<p><span class="bold">Category:</span> <span class="explosives-category">${explosives.type.category}</span></p>`;
		domStrang +=        `<p><span class="bold">Description:</span> ${explosives.description}</p>`;
		domStrang +=      `</div>`;
		domStrang +=  `</div>`;
	printToDom(domStrang);
};

const printToDom = (strang) => {
	$("#fireworks").append(strang);
};

module.exports = {domString, printCategories}; 