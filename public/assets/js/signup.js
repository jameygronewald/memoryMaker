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
      $.post('/api/signup', newUser)
        .then(data => {
          window.location.replace('/memories');
        })
        .catch(console.log('error'));
    };
  
    // function handleLoginErr(err) {
    //   $('').text(err.responseJSON);
    //   $('').fadeIn(500);
    // }
  });
  