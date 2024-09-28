const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

function validateLogin(event) {
  event.preventDefault();  // Prevent form from submitting

  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Check if the username and password match the required values
  if (username === "teacher" && password === "1") {
    window.location.href = "dashboard.html"; // Redirect to dashboard.html
  } else {
    alert("Invalid username or password"); // Show an error message
  }
}
