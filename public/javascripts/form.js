const submitButton = document.querySelector('#submit-btn')

submitButton.addEventListener('click', function onSubmitButtonClicked (event) {
  document.querySelector('#form').classList.add('was-validated')
})

const form = document.querySelector('#form')
form.addEventListener('submit', function onFormSubmitted (event) {
  form.querySelectorAll('input').forEach((element) => {
    if (!element.checkValidity()) {
      const feedback = element.parentElement.querySelector('.invalid-feedback')
      feedback.textContent = element.validationMessage
    }
  })
})
