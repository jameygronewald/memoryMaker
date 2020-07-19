$(document).ready(function() {
    $.get('/api/memories')
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err)
    })
});