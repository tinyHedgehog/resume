//---------------------------------------------------------------decoder-------

const encr = document.getElementById('encrypt');
const decr = document.getElementById('decrypt');
const decrypted = document.getElementById('decrypted');
const encrypted = document.getElementById('encrypted');

var encryption = function () {
	var output = [];
	for(var i = 0; i < decrypted.value.length; i++){
		if(i % 3 == 0){
			output.push(String.fromCharCode(decrypted.value[i].charCodeAt() + 15));
		}
		else if(i % 3 == 1){
			output.push(String.fromCharCode(decrypted.value[i].charCodeAt() + 162));
		}
		else if(i % 3 == 2){
			output.push(String.fromCharCode(decrypted.value[i].charCodeAt() + 1903));
		}
	}
	encrypted.value = output.join("");
}

encr.addEventListener('click', encryption);

var decryption = function () {
	var input = [];
	var undone = [];
	for(var i = 0; i < encrypted.value.length; i++){
		if(i % 3 == 0){
			input.push(String.fromCharCode(encrypted.value[i].charCodeAt() - 15));
		}
		else if(i % 3 == 1){
			input.push(String.fromCharCode(encrypted.value[i].charCodeAt() - 162));
		}
		else if(i % 3 == 2){
			input.push(String.fromCharCode(encrypted.value[i].charCodeAt() - 1903));
		}
	}
	decrypted.value = input.join("");
}

decr.addEventListener('click', decryption);

