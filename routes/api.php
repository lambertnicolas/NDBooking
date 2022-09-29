<?php

use App\Http\Controllers\TablesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route réservation
use App\Http\Controllers\ReservationController;
Route::get('reservation', [ReservationController::class, 'index'])->name('reservation.create');
Route::post('reservation', [ReservationController::class, 'store'])->name('reservation.store');
Route::get('reservation/{date}/{service}', [ReservationController::class, 'show'])->where(['date', '[a-z]+'], ['service', '[a-z]+']);

//Route::get('/tables', [TablesController::class,'index']);
//Route::post('/tables', [TablesController::class,'store'])->middleware('App\Http\Middleware\TablesMiddleware');
