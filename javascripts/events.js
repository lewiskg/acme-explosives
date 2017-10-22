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