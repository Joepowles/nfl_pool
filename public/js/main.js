// main.js
$(document).ready(function() {
    $.get('../scripts/check_login.php', function(response) { 
        console.log(response);
        var navbar = $('.navbar ul');
        if (response.isLoggedIn) {
            navbar.html(`               // Logged in user navbar
                <li class="navbar-left">Pools</li>
                <li class="navbar-left">Rules</li>
                <div class="auth-links">
                    <li class="navbar-right"><a href="../scripts/logout.php" aria-label="Logout from NFL Confidence Pool">Logout</a></li>
                    <li class="navbar-right"><a href="dashboard.html">${response.username}</a></li>
                </div>
            `);
        } else {
            navbar.html(`               // Logged out user navbar
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


