function validateNumber() {
  const errorMessageBlock = document.getElementById('error-message')
  try {
    const inputValue = document.getElementById('number-input').value
    if (!inputValue) {
      throw "This field is required"
    }
    if (isNaN(inputValue)) {
      throw "The value is not a number"
    }
    if (inputValue < 1) {
      throw "The value must greater than or equal to 1"
    }
    if (inputValue > 10) {
      throw "The value must"
    }

    errorMessageBlock.innerHTML = ''
    alert('The value is valid')
  } catch (error) {
    errorMessageBlock.innerHTML = error
  }
}

function hello() {
  const name = 'Duy Mai'
  document.getElementById('hello').innerHTML = `Hello, my name is ${name}`
}

function showResult() {
  document.getElementById('result').innerHTML = document.getElementById('message').value
}

function calculateSum() {
  const a = document.getElementById('a').value
  const b = document.getElementById('b').value
  const sum = parseInt(a) + parseInt(b)
  document.getElementById('sum-result').innerHTML = !isNaN(sum) ? sum : 'Error'
}

function validateSignUp(){
  const username = document.getElementById('username').value
  const pwd = document.getElementById('password').value
  const rePwd = document.getElementById('confirm-password').value

  if (!username) {
    alert('You must enter username')
    return false
  }
  if (!pwd) {
    alert('You must enter password')
    return false
  }
  if (rePwd !== pwd) {
    alert('Confirm password is not correct')
    return false
  }

  return true
}