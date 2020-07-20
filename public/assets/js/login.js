$(document).ready(function() {
    const loginForm = $("#loginForm");
    const usernameInput = $("#username");
    const passwordInput = $("#password");
  
    loginForm.on("submit", function(event) {
      event.preventDefault();
      const userData = {
        username: usernameInput.val().trim(),
        password: passwordInput.val().trim()
      };
  
      if (!userData.username || !userData.password) {
        return;
      }
  
      loginUser(userData.username, userData.password);
      usernameInput.val("");
      passwordInput.val("");
    });
  
    function loginUser(username, password) {
      $.post("/users/login", {
        username: username,
        password: password
      }).then(res => {
        localStorage.setItem('sessionToken', res.sessionToken);
        document.cookie = `sessionToken=${res.sessionToken}`;
        window.location.replace(`/memories`);
      }).catch(err => {
        const errorMsg = JSON.parse(err.responseText);
          if (errorMsg) {
            toastr.error("please enter in a valid credentials")
          }
        })
    }
});
  