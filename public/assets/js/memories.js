$(document).ready(() => {
    const createButton = $('#createButton');
    $(createButton).on('click', function(event) {
        event.preventDefault();
        window.location.href = '/memories/newMemory';
    });
    const viewButton = $('.viewButton');
    $(viewButton).on('click', function(event) {
        event.preventDefault();
        const memoryId = $(this).attr('data-id');
        window.location.href = `/memories/id/${memoryId}`;
    });
});