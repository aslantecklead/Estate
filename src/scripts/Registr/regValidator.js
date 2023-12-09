const form = document.querySelector('.needs-validation');
const inputs = form.querySelectorAll('.glass-input');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const creditCardInputs = document.querySelectorAll('.form-check-input[name="paymentMethod"]');
const emailError = document.querySelector('#email + .invalid-feedback');
const passwordError = document.querySelector('#password + .invalid-feedback');
const ccNameError = document.querySelector('#cc-name + .invalid-feedback');
const ccNumberError = document.querySelector('#cc-number + .invalid-feedback');
const ccExpirationError = document.querySelector('#cc-expiration + .invalid-feedback');
const ccCvvError = document.querySelector('#cc-cvv + .invalid-feedback');

function addShakeClass(inputElement) {
  inputElement.classList.add('shake-input');
  setTimeout(() => {
    inputElement.classList.remove('shake-input');
  }, 1000);
}

function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
}

function validateCreditCardNumber(cardNumber) {
  // Add validation logic for credit card number
  return cardNumber.length >= 12; // Example validation, adjust according to credit card standards
}

function validateExpirationDate(expirationDate) {
  // Add validation logic for expiration date
  return expirationDate.length === 5; // Example validation for MM/YY format, adjust as needed
}

function validateCvv(cvv) {
  // Add validation logic for CVV
  return cvv.length === 3; // Example validation for a 3-digit CVV, modify according to requirements
}

function displayError(errorElement, display) {
  if (display) {
    errorElement.style.display = 'inline-block';
  } else {
    errorElement.style.display = 'none';
  }
}

form.addEventListener('submit', function (event) {
  let isValid = true;

  if (!validateEmail(emailInput.value)) {
    displayError(emailError, true);
    addShakeClass(emailInput);
    isValid = false;
  } else {
    displayError(emailError, false);
  }

  if (passwordInput.value.length < 8) {
    displayError(passwordError, true);
    addShakeClass(passwordInput);
    isValid = false;
  } else {
    displayError(passwordError, false);
  }

  if (!validateCreditCardNumber(document.getElementById('cc-number').value)) {
    displayError(ccNumberError, true);
    addShakeClass(document.getElementById('cc-number'));
    isValid = false;
  } else {
    displayError(ccNumberError, false);
  }

  if (!validateExpirationDate(document.getElementById('cc-expiration').value)) {
    displayError(ccExpirationError, true);
    addShakeClass(document.getElementById('cc-expiration'));
    isValid = false;
  } else {
    displayError(ccExpirationError, false);
  }

  if (!validateCvv(document.getElementById('cc-cvv').value)) {
    displayError(ccCvvError, true);
    addShakeClass(document.getElementById('cc-cvv'));
    isValid = false;
  } else {
    displayError(ccCvvError, false);
  }

  if (!isValid) {
    event.preventDefault();
  }
});

inputs.forEach(input => {
  input.addEventListener('blur', function () {
    if (input === emailInput && !validateEmail(emailInput.value)) {
      displayError(emailError, true);
    } else {
      displayError(emailError, false);
    }

    if (input === passwordInput && passwordInput.value.length < 8) {
      displayError(passwordError, true);
    } else {
      displayError(passwordError, false);
    }

    if (input === document.getElementById('cc-number') && !validateCreditCardNumber(document.getElementById('cc-number').value)) {
      displayError(ccNumberError, true);
    } else {
      displayError(ccNumberError, false);
    }

    if (input === document.getElementById('cc-expiration') && !validateExpirationDate(document.getElementById('cc-expiration').value)) {
      displayError(ccExpirationError, true);
    } else {
      displayError(ccExpirationError, false);
    }

    if (input === document.getElementById('cc-cvv') && !validateCvv(document.getElementById('cc-cvv').value)) {
      displayError(ccCvvError, true);
    } else {
      displayError(ccCvvError, false);
    }
  });
});

creditCardInputs.forEach(input => {
  input.addEventListener('change', function () {
    if (input.checked) {
      ccNameError.style.display = 'none';
      ccNumberError.style.display = 'none';
      ccExpirationError.style.display = 'none';
      ccCvvError.style.display = 'none';
    }
  });
});
