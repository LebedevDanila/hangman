class Hangman {

	constructor(){
	this.wordEl = document.querySelector('#word');
	this.figureParts = document.querySelectorAll('.figure-part');
	
	this.attempts = 6;
	this.hits = 0;
	this.misses = 0;

	this.words = ['cat', 'milk', 'mixer'];
	this.selectedWord = null;
	this.pickedLetters = null;

	/* initialization of the project */
	this.init();

	}

	init = () => {
		window.addEventListener('keydown', this.press);

		/* start the game */
		this.start();
	}

	press = (e) => {
		if (e.keyCode >= 65 && e.keyCode <= 90) {
			if(this.pickedLetters.includes(e.key)) {
				alert('Такая буква уже есть!');
				return false;
			}

			if(this.selectedWord.includes(e.key)) {
				if(this.hits === this.selectedWord.length-1) {
					alert('Вы выиграли! Игра окончена.');
					/* start new game*/
					setTimeout(() => this.start(), 1500);
				}

				let indexLetter = this.selectedWord.split('').findIndex(el => el === e.key);
				this.pickedLetters[indexLetter] = this.selectedWord[indexLetter];

				this.hits++;

				this.output();
			} else {
				/* draw the hangman*/
				this.figureParts[this.misses].style.display = 'block';

				if(this.misses === this.attempts-1) {
					alert('Вы проиграли! Игра окончена.')
					/* start new game*/
					setTimeout(() => this.start(), 1500);
				}

				this.misses++;
			}
		}
	}

	output = () => {
		this.wordEl.innerHTML = '';

		this.pickedLetters.forEach(letter => {
			this.wordEl.innerHTML += `<span class="letter">${letter ? letter : ''}</span>`;
		});
	}

	start = () => {
		this.figureParts.forEach(part => part.style.display = 'none');
		this.hits = 0;
		this.misses = 0;
		this.selectedWord = this.words[Math.floor(Math.random() * this.words.length)];
		this.pickedLetters = new Array(this.selectedWord.length).fill('');
		this.output();
	}
}

new Hangman();