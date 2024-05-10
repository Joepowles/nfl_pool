$(document).ready(function() {
    var urlParams = new URLSearchParams(window.location.search);
    var poolId = urlParams.get('pool_id');

    if (poolId) {
        $.get(`../scripts/get_pool_details.php?pool_id=${poolId}`, function(data) {
            console.log("Pool data received:", data); // Debugging line
            if (data.error) {
                $('#pool-details').html(`<p>Error: ${data.error}</p>`);
            } else {
                // Log each field to check their existence and values
                console.log("pool_name exists:", data.pool_name !== undefined && data.pool_name !== null);
                console.log("description exists:", data.description !== undefined && data.description !== null);
                console.log("active exists:", data.active !== undefined && data.active !== null);

                // Check if all data fields are present and not null
                if(data.pool_name && data.description && data.active != null) {
                    var isActive = Boolean(data.active); // Converts `1` to `true` and `0` to `false`
                    var poolDetailsHTML = `
                        <h2>${data.pool_name}</h2>
                        <p>${data.description}</p>
                        <p>Status: ${isActive ? 'Active' : 'Archived'}</p>
                    `;
                    if (data.active === 1) {
                        poolDetailsHTML += `<a href="submit.html?pool_id=${poolId}" class="submit-link">Submit Picks</a>`;
                    }
                    $('#pool-details').html(poolDetailsHTML);
                } else {
                    console.log("Missing data fields:", data);
                    $('#pool-details').html('<p>Missing data in response.</p>');
                }
            }
        }, "json") // Ensure jQuery treats the response as JSON
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log("AJAX call failed: ", textStatus, errorThrown); // Debugging line
            $('#pool-details').html(`<p>Error loading pool details. Status: ${textStatus}, Error: ${errorThrown}</p>`);
        });
    } else {
        $('#pool-details').html('<p>No pool selected.</p>');
    }
});