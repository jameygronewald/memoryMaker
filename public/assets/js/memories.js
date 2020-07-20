$(document).ready(() => {
    const logoutButton = $('#logoutButton');
    $(logoutButton).on('click', function(event) {
        event.preventDefault();
        localStorage.clear();
        document.cookie = 'sessionToken=; expires=Thu, 1203 Aug 2016 00:00:00 UTC; path=/;'
        window.location.href = '/';
    })
    const createButton = $('#createButton');
    $(createButton).on('click', function(event) {
        event.preventDefault();
        window.location.href = '/newMemory';
    })
    const viewButton = $('.viewButton');
    $(viewButton).on('click', function(event) {
        event.preventDefault();
        const memoryId = $(this).attr('data-id');
        window.location.href = `/memories/id/${memoryId}`;
    })
})