// main.js
$(document).ready(function() {
    $.get('../scripts/check_login.php', function(data) {  // Updated path
        console.log(data);
        var navbar = $('.navbar ul');
        if (data.isLoggedIn) {
            navbar.html(`
                <li class="navbar-left">Other Link 1</li>
                <li class="navbar-left">Other Link 2</li>
                <!-- More left-aligned links -->
                <div class="auth-links">
                    <li class="navbar-right"><a href="../scripts/logout.php" aria-label="Logout from NFL Confidence Pool">Logout</a></li>
                    <li class="navbar-right"><a>Hi, ${data.username}</a></li>
                </div>
            `);
        } else {
            navbar.html(`
                <li class="navbar-left">Other Link 1</li>
                <li class="navbar-left">Other Link 2</li>
                <!-- More left-aligned links -->
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

function checkIfLoggedIn() {
    return isset($_SESSION['user_id']);
}