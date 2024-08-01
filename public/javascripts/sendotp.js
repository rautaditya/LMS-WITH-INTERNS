function openPopup() {
  const popup = document.getElementById("otpPopup");
  popup.style.display = "block";
}

function closePopup() {
  const popup = document.getElementById("otpPopup");
  popup.style.display = "none";
}

document.getElementById("openPopupButton").addEventListener("click", openPopup);
//


function sendOTP() {
  const email = document.getElementById("email").value;
  const otpform=document.querySelector(".otp-form");
  const otppage=document.querySelector(".otppage");
  otpform.style.display="none";
  otppage.style.display="block";


  fetch("http://localhost:3003/send-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => response.json())
    .then((data) => {
      const resultDiv = document.getElementById("result");
      if (data.message === "OTP sent successfully") {
        resultDiv.innerHTML = "<p>OTP sent successfully</p>";
        disableEmailInput();
      } else {
        resultDiv.innerHTML = "<p>Error: " + data.error + "</p>";
      }
    })
    .catch((error) => {
      console.error("Error sending OTP:", error);
    });
}

function verifyOTP() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const userOTP = document.getElementById("otp").value;

  fetch("http://localhost:3003/verify-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, phone, otp: userOTP }),
  })
    .then((response) => response.json())
    .then((data) => {
      const resultDiv = document.getElementById("result");
      if (data.success) {
        window.location.href = "/home";
      } else {
        resultDiv.innerHTML = "<p>Invalid OTP. Please try again.</p>";
      }
    })
    .catch((error) => {
      console.error("Error verifying OTP:", error);
    });
}

function disableEmailInput() {
  const emailInput = document.getElementById("email");
  const sendButton = document.getElementById("sendButton");

  emailInput.disabled = true;
  sendButton.style.display = "none";
}

function clearResultAndEnableInput() {
  const resultDiv = document.getElementById("result");
  const emailInput = document.getElementById("email");
  const sendButton = document.getElementById("sendButton");

  resultDiv.innerHTML = "";
  emailInput.disabled = false;
  emailInput.value = "";
  sendButton.style.display = "inline-block";
}
function validateForm() {
  var name = document.getElementById("name").value;
  var password = document.getElementById("password").value;
  var phone = document.getElementById("phone").value;
  var email = document.getElementById("email").value;

  if (name == "" || password == "" || phone == "" || email == "") {
      alert("Please fill all fields");
      return false;
  }
  return true;
}
//when student is not logged in that time user clieck on enrooll that tiem open the login form

// the below code fragment can be found in:
