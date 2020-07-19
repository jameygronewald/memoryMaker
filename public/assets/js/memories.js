$(document).ready(() => {
    const logoutButton = $('#logoutButton');
    $(logoutButton).on('click', function(event) {
        event.preventDefault();
        localStorage.clear();
        window.location.href = '/';
    })
    const viewButton = $('.viewButton');
    $(viewButton).on('click', function(event) {
        event.preventDefault();
        const memoryId = $(this).attr('data-id');
        window.location.href = `/memories/id/${memoryId}`;
    })
})