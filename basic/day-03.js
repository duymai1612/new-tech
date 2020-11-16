function validateEmailAddress(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validate() {
  var emailAddress = $("#email").val();
  if (validateEmailAddress(emailAddress)) {
    $("#validate-email-result").text(emailAddress + " is valid: )");
    $('#validate-email-result').css("color", "green");
  } else {
    $("#validate-email-result").text(emailAddress + " is not correct, please retry: (");
    $('#validate-email-result').css("color", "red");
  }
  return false;
}

document.getElementById("validate").addEventListener("click", validate);