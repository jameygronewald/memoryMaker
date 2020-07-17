// this is a boiler plate and needs to be filled in based on information relavent to project two
$(document).ready(function() {
    const signupForm = $("#signupForm");
    const firstNameInput = $("#firstName");
    const lastNameInput = $("#lastName");
    const newEmailInput = $("#newEmailInput")
    const newUsernameInput = $("#newUsername");
    const newPasswordInput = $("#newPassword");
    const confirmPasswordInput = $("#confirmPassword");
  
    // When the signup button is clicked, we validate the email and password are not blank
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
      
      signUpUser(userData);
      emailInput.val("");
      passwordInput.val("");
    });
    
    function signUpUser(newUser) {
      $.post("/api/signup", newUser)
        .then(function(data) {
          window.location.replace("/members");
        })
        .catch(handleLoginErr);
    };
  
    function handleLoginErr(err) {
      $("").text(err.responseJSON);
      $("").fadeIn(500);
    }
  });
  