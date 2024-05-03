// main.js
$(document).ready(function() {
    $.get('../scripts/check_login.php', function(response) { 
        console.log(response);
        var navbar = $('.navbar ul');
        if (response.isLoggedIn) {
            navbar.html(`
                <li class="navbar-left">Pools</li>
                <li class="navbar-left">Rules</li>
                <div class="auth-links">
                    <li class="navbar-right"><a href="../scripts/logout.php" aria-label="Logout from NFL Confidence Pool">Logout</a></li>
                    <li class="navbar-right"><a href="dashboard.html">${response.username}</a></li>
                </div>
            `);
        } else {
            navbar.html(`
                <li class="navbar-left"><a href="index.html">Home</a></li>
                <div class="auth-links">
                    <li class="navbar-right"><a href="register.html" aria-label="Register for NFL Confidence Pool">Register</a></li>
                    <li class="navbar-right"><a href="login.html" aria-label="Login to NFL Confidence Pool">Login</a></li>
                </div>
            `);
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error("Error fetching login status: ", textStatus, errorThrown);
    });
});

$(document).ready(function() {              // Fill the footer with the current year
    var currentYear = new Date().getFullYear();
    $('footer p').text(`© 2010 - ${currentYear} Next Level Win`);
});

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
