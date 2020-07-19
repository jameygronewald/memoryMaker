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
        return;
      };
      if (userData.password !== confirmPasswordInput.val().trim()) {
        toastr.error("password not equal")
        return;
      };
      console.log(userData);
      signUpUser(userData);
      firstNameInput.val('');
      lastNameInput.val('');
      newEmailInput.val('');
      newUsernameInput.val('');
      newPasswordInput.val('');
      confirmPasswordInput.val('');
    });

    function signUpUser(newUser) {
      $.post('/users', newUser)
        .then(() => {
          console.log('Added new user!')
          window.location.replace('/memories');
        })
        .catch(err => {
          console.log(err)
          const errorMsg = JSON.parse(err.responseText)
          console.log(errorMsg)
          errorMsg.error.forEach(e => {
            if(e.path == "username") {
              toastr.error("username must have minimum 5 chars")
            }else if(e.path == "password") {
              toastr.error("password must have minimum 8 chars")
            }else if(e.path == "users.username") {
              toastr.error("username already exists")
            }
          })
        });
    };
  
    // function handleLoginErr(err) {
    //   $('').text(err.responseJSON);
    //   $('').fadeIn(500);
    // }
}); 