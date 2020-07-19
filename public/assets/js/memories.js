$(document).ready(() => {
    const viewButton = $('.viewButton');
    $(viewButton).on('click', function(event) {
        event.preventDefault();
        memoryId = $(this).attr('data-id');
        console.log(memoryId);
    })
})