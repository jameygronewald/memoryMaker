$(document).ready(function () {
  const signUpBtn = $("#sign-up");
  const loginBtn = $("#login");

  signUpBtn.on("click", (res, err) => {
    if (err) throw err;
    window.location.href = "signUp";
  });

  loginBtn.on("click", (res, err) => {
    if (err) throw err;
    window.location.href = "login";
  });
});
