<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UsersController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Reservations //
Route::controller(ReservationController::class)->group(function () {
    //Page d'accueil : affiche le plan des réservations pour le prochain service à venir
    //Permet de réserver une table pour le jour et le service choisi
    Route::get('/', 'index')->name('reservations.index');
    //Stockage d'une réservation dans la base de données
    //Route::post('/reservations', 'store')->name('reservations.store');
    Route::get('/reservations/create', 'create')->name('reservations.create');
    //Affichage de l'état des réservation pour une date et un service donné
    Route::get('/reservation/{date}/{service}', 'show')->where(['date', '[a-z]+'], ['service', '[a-z]+'])->name('reservations.show');
    Route::put('/reservations/{reservation}',  'update')->name('reservations.update');
    Route::patch('/reservations/{reservation}', 'update')->name('reservations.update');
    Route::delete('/delete', 'destroy')->name('reservations.destroy');
    Route::get('/reservations/{reservation}/edit', 'edit')->name('reservations.edit');
});

Route::post('/reservation', [ReservationController::class, 'store']);

Route::get('/pending/{date}/{service}/{table_id}', function ($date, $service, $table_id) {
    event(new \App\Events\TableClick($table_id, $date, $service));
});

// DashBoard
Route::controller(DashboardController::class)->group(function () {
    //Dashboard accueil : affiche le plan des réservations pour le prochain service à venir
    Route::get('/dashboard', 'index')->middleware(['auth', 'verified'])->name('dashboard');
    Route::get('/dashboard/{date}/{service}', 'show')->where(['date', '[a-z]+'], ['service', '[a-z]+'])->name('dashboard.show');

});

//Route::get('reservation/{date}/{service}', [ReservationController::class, 'show'])->where(['date', '[a-z]+'], ['service', '[a-z]+']);




// RESTAURATEUR //
//Mise à jour d'une réservation
Route::get('/booking/{id}', [ReservationController::class, 'edit']);
Route::post('/reservation_update/{id}', [ReservationController::class, 'update']);

//Suppression d'une réservation
Route::delete('reservation/{id}', [ReservationController::class, 'destroy']);

//Mise à jour du profil utilisateur
Route::get('/account', [UsersController::class, 'edit'])->middleware(['auth', 'verified'])->name('account');
Route::post('/account', [UsersController::class, 'update'])->middleware(['auth', 'verified'])->name('account');

// SUPER ADMIN //
//Affichage de la liste des utilisateurs/restaurants
Route::get('/users', [UsersController::class, 'index'])->middleware(['auth', 'verified'])->name('users');



// DEVELOPMENT //
Route::inertia('/booking', 'Booking');
Route::get('/reservation', [ReservationController::class, 'index']);
//Route::get('/table_view', [ReservationController::class, 'availability']);
Route::get('/table_view/{date}/{service}', [ReservationController::class, 'availability'])->where(['date', '[a-z]+'], ['service', '[a-z]+']);
Route::get('/reservation_test', [ReservationController::class, 'create']);
//Route::inertia('/reservation', [ReservationController::class, 'show']);
Route::inertia('/create_client', 'CreateClient');
Route::inertia('/client_list', 'ClientList');
Route::inertia('/formd', 'ResFormDinner');
Route::inertia('/restform', 'ResFormLunch');
Route::inertia('/services', 'Services');

//Route::get('/', function () {
//    return Inertia::render('Services', [
//        'canLogin' => Route::has('login'),
//        'canRegister' => Route::has('register'),
//        'reservation' => Route::has('Reservation'),
//        'laravelVersion' => Application::VERSION,
//        'phpVersion' => PHP_VERSION,
//    ]);
//});

//Route::get('/dashboard', function () {
//    return Inertia::render('Dashboard');
//})->middleware(['auth', 'verified'])->name('dashboard');

//Route::get('/account', function () {
//    return Inertia::render('Account');
//})->middleware(['auth', 'verified'])->name('account');

Route::get('/events', function () {
    event(new \App\Events\MessageNotification('Hello World'));
});

Route::inertia('/listen', 'Listen');
Route::inertia('/listento', 'ListenChannel');
//Route::get('/listen', function () {
//    return Inertia::render('Listen');
//});

require __DIR__.'/auth.php';
