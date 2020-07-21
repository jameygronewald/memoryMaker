$(document).ready(function() {
    const signupForm = $('#signupForm');
    const firstNameInput = $('#firstName');
    const lastNameInput = $('#lastName');
    const newEmailInput = $('#newEmail')
    const newUsernameInput = $('#newUsername');
    const newPasswordInput = $('#newPassword');
    const confirmPasswordInput = $('#confirmPassword');
  
    signupForm.on('submit', function(event) {
      event.preventDefault();
      const userData = {
        username: newUsernameInput.val().trim(),
        email: newEmailInput.val().trim(),
        password: newPasswordInput.val().trim(),
        firstName: firstNameInput.val().trim(),
        lastName: lastNameInput.val().trim()
      };
      if (!userData.firstName || !userData.lastName || !userData.email || !userData.username || !userData.password) {
        toastr.error("Fields cannot be empty.");
        return;
      };
      if (userData.password !== confirmPasswordInput.val().trim()) {
        toastr.error("Password confirmation must match.")
        return;
      };
      signUpUser(userData);
      firstNameInput.val('');
      lastNameInput.val('');
      newEmailInput.val('');
      newUsernameInput.val('');
      newPasswordInput.val('');
      confirmPasswordInput.val('');
    });

    function signUpUser(newUser) {
      $.post('/users/signup', newUser)
        .then(res => {
          localStorage.setItem('sessionToken', res.sessionToken);
          document.cookie = `sessionToken=${res.sessionToken}`;
          toastr.success("Account creation successful");
          setTimeout(() => window.location.replace('/memories'), 2000);
        })
        .catch(err => {
          if(err.responseJSON === "Validation error: Validation len on username failed") {
            toastr.error("Username must have at least 5 characters.")
          }else if(err.responseJSON === "Validation error: Validation len on password failed") {
            toastr.error("Password must have at least 8 characters.")
          }else if(err.responseJSON === "Validation error") {
            toastr.error("Username already exists or your email address already is associated with an account. Try another username or email.")
          }else if(err.responseJSON === "Validation error: Validation isEmail on email failed") {
            toastr.error("Email must be a valid email address.")
          }else {
            toastr.error("Unable to create account. Try again.")
          }
        })
    };
}); 