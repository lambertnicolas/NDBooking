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
    Route::post('/reservations', 'store')->name('reservations.store');
    Route::get('/reservations/create', 'create')->name('reservations.create');
    //Affichage de l'état des réservation pour une date et un service donné
    Route::get('/reservation/{date}/{service}', 'show')->where(['date', '[a-z]+'], ['service', '[a-z]+'])->name('reservations.show');
    Route::put('/reservations/{reservation}',  'update')->name('reservations.update');
    Route::patch('/reservations/{reservation}', 'update')->name('reservations.update');
    Route::delete('/delete', 'destroy')->name('reservations.destroy');
    Route::get('/reservations/{reservation}/edit', 'edit')->name('reservations.edit');
});


// DashBoard
Route::controller(DashboardController::class)->group(function () {
    //Dashboard accueil : affiche le plan des réservations pour le prochain service à venir
    Route::get('/dashboard', 'index')->middleware(['auth', 'verified'])->name('dashboard');
    Route::get('/dashboard/{date}/{service}', 'show')->where(['date', '[a-z]+'], ['service', '[a-z]+'])->middleware(['auth', 'verified'])->name('dashboard.show');

});


//Mise à jour du profil utilisateur
Route::get('/account', [UsersController::class, 'edit'])->middleware(['auth', 'verified'])->name('account');
Route::post('/account', [UsersController::class, 'update'])->middleware(['auth', 'verified'])->name('account');

// SUPER ADMIN //
//Affichage de la liste des utilisateurs/restaurants
Route::get('/users', [UsersController::class, 'index'])->middleware(['auth', 'verified'])->name('users');


require __DIR__.'/auth.php';
