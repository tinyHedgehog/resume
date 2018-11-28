const regExps = {
	name: /^[a-z\-\s\_]{3,20}$/i,
	phone: /\+375[\s\-]?\d{2}[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/,
	email: /[a-zA-z0-9\.\_\-]+(@[a-zA-z\.\_\-]+)\.[a-z]{2,10}$/i,
	site: /^[a-z0-9\_\-]{1,50}\.[a-z]{2,5}$/
};


var Name = document.getElementById('name');
Name.addEventListener('input', validation);
var phone = document.getElementById('phone');
phone.addEventListener('input', validation);
var email = document.getElementById('email');
email.addEventListener('input', validation);
var site = document.getElementById('site');
site.addEventListener('input', validation);
var age = document.getElementById('age');
age.addEventListener('input', validation);

var validations = document.getElementsByTagName('span');

function validation(e) {
	switch(e.target.id){
		case 'name':		
			if(Name.value.match(regExps.name)){
				validations[0].innerText = ' accepted';
			}else{
				validations[0].innerText = '';
			}
			break;
		case 'phone':			
			if(phone.value.match(regExps.phone)){
				validations[1].innerText = ' accepted';
			}else{
				validations[1].innerText = '';
			}
			break;
		case 'email':			
			if(email.value.match(regExps.email)){
				validations[2].innerText = ' accepted';
			}else{
				validations[2].innerText = '';
			}
			break;
		case 'site':			
			if(site.value.match(regExps.site)){
				validations[3].innerText = ' accepted';
			}else{
				validations[3].innerText = '';
			}
			break;
		case 'age':			
			if(age.value >= 14 && age.value <=90){
				validations[4].innerText = ' accepted';
			}else{
				validations[4].innerText = '';
			}
			break;
	}
}