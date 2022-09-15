<?php

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

// CLIENTS //

//Page d'accueil : affiche le plan des réservations pour le prochain service à venir
//Permet de réserver une table pour le jour et le service choisi
Route::get('/', [ReservationController::class, 'index']);

//Affichage de l'état des réservation pour une date et un service donné
Route::get('reservation/{date}/{service}', [ReservationController::class, 'show'])->where(['date', '[a-z]+'], ['service', '[a-z]+']);

//Stockage d'une réservation dans la base de données
Route::post('/reservation', [ReservationController::class, 'store']);



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
Route::get('/users', [UsersController::class, 'index']);



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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

//Route::get('/account', function () {
//    return Inertia::render('Account');
//})->middleware(['auth', 'verified'])->name('account');

require __DIR__.'/auth.php';
