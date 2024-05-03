$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    var poolId = urlParams.get('pool_id');

    if (poolId) {
        $.get(`../scripts/get_pool_details.php?pool_id=${poolId}`, function(data) {
            if (data.error) {
                $('#pool-details').html(`<p>Error: ${data.error}</p>`);
            } else {
                $('#pool-details').html(`
                    <h2>${data.pool_name}</h2>
                    <p>${data.description}</p>
                    <p>Status: ${data.active ? 'Active' : 'Archived'}</p>
                `);
            }
        }).fail(function() {
            $('#pool-details').html('<p>Error loading pool details.</p>');
        });
    } else {
        $('#pool-details').html('<p>No pool selected.</p>');
    }
});