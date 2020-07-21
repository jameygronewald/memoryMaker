$(document).ready(() => {
    const logoutButton = $('#logoutButton');
    $(logoutButton).on('click', function(event) {
        event.preventDefault();
        localStorage.clear();
        document.cookie = 'sessionToken=; expires=Thu, 20 Aug 2016 00:00:00 UTC; path=/;'
        window.location.href = '/';
    });
});