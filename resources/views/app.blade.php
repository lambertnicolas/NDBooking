<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;1,100&display=swap" rel="stylesheet">
    <script src="https://kit.fontawesome.com/de0135f311.js" crossorigin="anonymous"></script>
    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
</head>
<body class="font-sans antialiased">
<nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="/">
            DevBar
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
            <a class="navbar-item" href="/">
                Reservation
            </a>
            <a class="navbar-item" href="/account">
                Account
            </a>
            <a class="navbar-item" href="/booking">
                Booking
            </a>
            <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">
                    More
                </a>
                <div class="navbar-dropdown">
                    <a class="navbar-item" href="/users">
                        Users
                    </a>
                    <a class="navbar-item" href="/services">
                        Services
                    </a>
                    <a class="navbar-item" href="/listen">
                        Listen
                    </a>
                    <a class="navbar-item" href="/events">
                        Events
                    </a>
                    <a class="navbar-item" href="/table_view/2202-09-09/dinner">
                        Tables availability
                    </a>
                    <hr class="navbar-divider">
                    <a class="navbar-item" href="/dashboard">
                        DashBoard
                    </a>
                </div>
            </div>
        </div>

        <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    <a class="button is-primary" href="/register">
                        <strong>Sign up</strong>
                    </a>
                    <a class="button is-light" href="/login">
                        Log in
                    </a>
                </div>
            </div>
        </div>
    </div>
</nav>
@inertia
</body>
</html>
