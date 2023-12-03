const form = document.getElementById('loginForm')
		const emailInput = document.getElementById('username')
		const passwordInput = document.getElementById('password')
		const emailError = document.getElementById('emailError')
		const passwordError = document.getElementById('passwordError')

		// Функция для добавления класса тряски к инпуту
		function addShakeClass(inputElement) {
			inputElement.classList.add('shake-input')
			setTimeout(() => {
				inputElement.classList.remove('shake-input')
			}, 1000) // Удалить класс через 1 секунду
		}

		form.addEventListener('submit', function (event) {
			let isValid = true

			const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
			if (!emailPattern.test(emailInput.value)) {
				emailError.style.display = 'inline-block'
				addShakeClass(emailInput) // Добавляем класс тряски к инпуту
				isValid = false
			} else {
				emailError.style.display = 'none'
			}

			if (passwordInput.value.length < 8) {
				passwordError.style.display = 'inline-block'
				addShakeClass(passwordInput) // Добавляем класс тряски к инпуту
				isValid = false
			} else {
				passwordError.style.display = 'none'
			}

			if (!isValid) {
				event.preventDefault()
			}
		})


		emailInput.addEventListener('blur', function () {
			const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
			if (!emailPattern.test(emailInput.value)) {
				emailError.style.display = 'inline-block'
			} else {
				emailError.style.display = 'none'
			}
		})

		passwordInput.addEventListener('blur', function () {
			if (passwordInput.value.length < 8) {
				passwordError.style.display = 'inline-block'
			} else {
				passwordError.style.display = 'none'
			}
		});