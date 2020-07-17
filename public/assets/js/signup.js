$(document).ready(function() {
    const signupForm = $("#signupForm");
    const firstNameInput = $("#firstName");
    const lastNameInput = $("#lastName");
    const newEmailInput = $("#newEmail")
    const newUsernameInput = $("#newUsername");
    const newPasswordInput = $("#newPassword");
    const confirmPasswordInput = $("#confirmPassword");
  
    signupForm.on("submit", function(event) {
      event.preventDefault();
      const userData = {
        firstName: firstNameInput.val().trim(),
        lastName: lastNameInput.val().trim(),
        email: newEmailInput.val().trim(),
        username: newUsernameInput.val().trim(),
        password: newPasswordInput.val().trim(),
        confirmPassword: confirmPasswordInput.val().trim()
      };
      if (!userData.firstName || !userData.lastName || !userData.email || !userData.username || !userData.password) {
        return;
      };
      if (userData.password !== userData.confirmPassword) {
        return;
      };
      console.log(userData);
      // signUpUser(userData);
      newEmailInput.val("");
      newPasswordInput.val("");
    });

    function signUpUser(newUser) {
      $.post("/api/signup", newUser)
        .then(function(data) {
          window.location.replace("/memories");
        })
        .catch(handleLoginErr);
    };
  
    function handleLoginErr(err) {
      $("").text(err.responseJSON);
      $("").fadeIn(500);
    }
  });
  