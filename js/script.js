'use strict';

// Основні елементи DOM
const encryptBtn = document.querySelector('.btn-1'),
	  decryptBtn = document.querySelector('.btn-2'),
	  keywordField = document.querySelector('#keyword'),
	  encryptField = document.querySelector('#encrypt'),
	  decryptField = document.querySelector('#decrypt');

// Модальне вікно з DOM

const modalWindowWrapper = document.querySelector('#modal_windows'),
	  modalWindow = document.querySelector('#copy_success'),
	  text = document.querySelector('#copy_success_text');

// Доступні мовні пакети
const languages = {
	ua: ['а', 'б', 'в', 'г', 'ґ', 'д', 'е', 'є', 'ж', 'з', 'и',
		 'і', 'ї', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с',
		 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ю', 'я',
		 'А', 'Б', 'В', 'Г', 'Ґ', 'Д', 'Е', 'Є', 'Ж', 'З', 'И',
		 'І', 'Ї', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С',
		 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ю', 'Я'],
	ru: ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й',
		 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф',
		 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я',
		 'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й',
		 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф',
		 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ы', 'Э', 'Ю', 'Я'],
	en: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
		 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
		 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
		 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
		 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
} 

// Активна мова
let alphabet = languages.ru;

// Функція для вибору мови
function chooseLanguage(lang) {
	alphabet = languages[lang.toLowerCase()];

	if (lang === 'RU') {
		encryptBtn.innerHTML = 'ЗАШИФРОВАТЬ';
		decryptBtn.innerHTML = 'ДЕШИФРОВАТЬ';
		keywordField.placeholder = "Введите ключевое слово";
		encryptField.placeholder = "Шифр";
		decryptField.placeholder = "Текст";
	} else if (lang === 'UA') {
		encryptBtn.innerHTML = 'ЗАШИФРОВАТИ';
		decryptBtn.innerHTML = 'ДЕШИФРОВАТИ';
		keywordField.placeholder = "Введіть ключове слово";
		encryptField.placeholder = "Шифр";
		decryptField.placeholder = "Текст";
	} else {
		encryptBtn.innerHTML = 'ENCRYPT';
		decryptBtn.innerHTML = 'DECRYPT';
		keywordField.placeholder = "Enter keyword";
		encryptField.placeholder = "Cipher";
		decryptField.placeholder = "Text";
	}

	return alphabet;
}

// Слухач подій для отримання події перемикання мови та нового значення
document.querySelector('select').addEventListener('click', (e) => {
	document.querySelectorAll('.textFields').forEach( el => el.value = '' );
	chooseLanguage(e.target.value);
	return;
});

// Функція копіювання у буфер обміну
function copyToBuffer() {
	const elem = event.target;
	if (elem.value != '') {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(elem.value);
		} else {
			elem.select();
			document.execCommand("copy");
		}
		alphabet === languages.ru ? showModalWindow('Зашифрованный текст') :
			alphabet === languages.ua ? showModalWindow('Зашифрований текст') :
				showModalWindow('Encrypted text');
	}
	return elem;
}

// Функція, яка виводить модальне віконце
function showModalWindow(fieldName) {
	alphabet === languages.ru ? text.innerHTML = `Текст поля «${fieldName}» скопирован!` :
		alphabet === languages.ua ? text.innerHTML = `Текст поля «${fieldName}» скопійовано!` :
			text.innerHTML = `The text of the field «${fieldName}» has been copied!`;

	modalWindowWrapper.classList.add("modal_windows_OPEN");
	modalWindow.classList.add("copy_success_OPEN");

	setTimeout(closeModalWindow, 2000);
	return;
}

// Функція, яка закриває модальне вікно
function closeModalWindow() {
	modalWindowWrapper.classList.remove("modal_windows_OPEN");
	modalWindow.classList.remove("copy_success_OPEN");
	return;
}

// Функція шифрування
function encryptFunc() {

	let keyword = keywordField.value.split('');
	keyword = keyword.map( (value, index) => alphabet.indexOf(value.toLowerCase()));

	let userArray = decryptField.value.split('');
	let result = [];
	let counter = 0;

	for (let i = 0; i <= userArray.length - 1; i++) {
		if (userArray[i] == ' ' || userArray[i] == '.' || userArray[i] == ',' || userArray[i] == '!' ||
			userArray[i] == '...' || userArray[i] == ':' || userArray[i] == '-' || userArray[i] == '–' ||
			userArray[i] == '—') {
			result.push(userArray[i]);
			continue;
		}
		if(counter > keyword.length - 1) {
			counter = 0;
		}
		let newIndex = alphabet.indexOf(userArray[i]) + keyword[counter++];
		
		while(newIndex >= alphabet.length) {
			newIndex -= alphabet.length;
		}
		result.push(alphabet[newIndex]);
	}

	encryptField.value = result.join('');
	return result;
}

// Функція дешифрування
function decryptFunc() {

	let keyword = keywordField.value.split('');
	keyword = keyword.map( (value, index) => alphabet.indexOf(value.toLowerCase()));

	let userArray = encryptField.value.split('');
	let result = [];
	let counter = 0;

	for (let i = 0; i <= userArray.length - 1; i++) {
		if (userArray[i] == ' ' || userArray[i] == '.' || userArray[i] == ',') {
			result.push(userArray[i]);
			continue;
		}
		let newIndex;
		if(counter > keyword.length - 1) {
			counter = 0;
		}

		newIndex = alphabet.indexOf(userArray[i]) - keyword[counter];
		if (newIndex < 0) {
			newIndex = alphabet.length - Math.abs(newIndex);
		}
		result.push(alphabet[newIndex]);

		counter++;

	}

	decryptField.value = result.join('');
	return result;

}