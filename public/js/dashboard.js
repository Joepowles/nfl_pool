$(document).ready(function() {
    // Fetch login status first
    $.get('../scripts/check_login.php', function(response) {
        // Now response contains the login status
        if (response.isLoggedIn) {
            // Fetch user pools if logged in
            $.get('../scripts/get_user_pools.php', { user_id: response.user_id }, function(poolsData) {
                var poolListContainer = $('#pool-list'); // Ensure this selector is correct, should be $('#pool-list')
                var activePoolsHtml = '<h3>Active Pools</h3><ul>';
                var archivedPoolsHtml = '<h3>Archived Pools</h3><ul>';

                poolsData.forEach(function(pool) {
                    var poolLink = `<a href='pool.html?pool_id=${pool.pool_id}'>${pool.pool_name}</a>`;
                    if (pool.active) {
                        activePoolsHtml += `<li>${poolLink}</li>`;
                    } else {
                        archivedPoolsHtml += `<li>${poolLink}</li>`;
                    }
                });

                activePoolsHtml += '</ul>';
                archivedPoolsHtml += '</ul>';

                // Check if there are any active pools
                if (activePoolsHtml === '<h3>Active Pools</h3><ul></ul>') {
                    activePoolsHtml = '<p>No active pools found.</p>';
                }

                // Check if there are any archived pools
                if (archivedPoolsHtml === '<h3>Archived Pools</h3><ul></ul>') {
                    archivedPoolsHtml = '<p>No archived pools found.</p>';
                }

                poolListContainer.html(activePoolsHtml + archivedPoolsHtml);
            }).fail(function() {
                $('#pool-list-container').html('<p>Error loading pools.</p>');
            });
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error fetching login status: ", textStatus, errorThrown);
    });
});