<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReservationControllerStoreRequest;
use App\Models\Client;
use App\Models\Reservation;
use App\Models\Table;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

// TODO : https://inertiajs.com/csrf-protection
class ReservationController extends Controller
{
    /**
     * @return \Illuminate\Http\Response
     */
    //Affichage par défault : le plan de la salle correspond au prochain service en fonction de l'heure actuelle
    public function index()
    {
        //Définition de la date du jour et l'heure actuelle
        // TODO Modifier l'heure en fonction de la timezone à définir dans le panel admin ??
        date_default_timezone_set('Europe/Paris');
        $date = date('Y-m-d');
        $time = date('H:i:s');
        //Si l'heure actuelle est inférieure à 13h30, on affiche les réservations du service de midi
        if ($time < '13:30:00') {
            $service = 'lunch';
        //Si l'heure actuelle est supérieure à 20h00, on affiche les réservations du lendemain midi
        } elseif ($time > '20:00:00') {
            $service = 'lunch';
            $date = date('Y-m-d', strtotime($date . ' +1 day'));
        //Sinon, entre 13h30 et 20h00, on affiche les réservations du service du soir
        } else {
            $service = 'dinner';
        }

        $reservations = DB::table('reservations')
            ->join('clients', 'clients.id', '=', 'reservations.client_id')
            ->join('tables', 'tables.id', '=', 'reservations.table_id')
            ->select('reservations.*', 'clients.phone as phone', 'clients.name', 'tables.table_name as table', 'tables.capacity')
            ->where('reservations.date', $date)
            ->where('reservations.service', $service)
            ->get();
        return inertia::render('Reservation', ['reservations' => $reservations]);
    }

    /**
     * @param \App\Http\Requests\ReservationControllerStoreRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
    // TODO : Afficher les erreurs de validation : https://laravel.com/docs/9.x/validation

//        $date = $request->date;
//        $service = $request->service;
//
//        $client = Client::create(
//            $request->validate([
//                'name' => ['required', 'max:50'],
//                'phone' => ['required', 'max:50'],
//                'email' => ['required', 'max:50', 'email'],
//            ])
//        );
//
//        $client->reservation()->create(
//            $request->validate([
//                'table_id' => ['required', 'max:10'],
//                'couverts' => ['required', 'max:2'],
//                'service' => ['required', 'max:50'],
//                'date' => ['required', 'max:50'],
//                'time' => ['required', 'max:8'],
//            ])
//        );

        // TODO : faire la redirection. Elle fonctionnait avec le code commenté en dessous. Afficher un message de confirmation de la réservation
//        return redirect()->action(
//            [ReservationController::class, 'show'], ['date' => $date, 'service' => $service]
//        );

        //Doc inertia :
//        return Redirect::route('reservation.show', ['date' => $date, 'service' => $service]);

        //Formatage des dates reçues
        $time_input = strtotime($request->time);
        $date_input = strtotime($request->date);
        $reservation_date = date('Y-m-d', $date_input);
        $reservation_time = date('H:i:s', $time_input);

        //Insertion de la réservation dans la base de données
        $client = Client::create([
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
        ]);

        $client->reservation()->create([
            'couverts' => $request->couverts,
            'date' => $reservation_date,
            'service' => $request->service,
            'table_id' => $request->table_id,
            'time' => $reservation_time,
        ]);

        return redirect()->action(
            [ReservationController::class, 'show'], ['date' => $reservation_date, 'service' => $request->service]
        );




    }

    public function show($date, $service)
    {
        $reservations = DB::table('reservations')
            ->join('clients', 'clients.id', '=', 'reservations.client_id')
            ->join('tables', 'tables.id', '=', 'reservations.table_id')
            ->select('reservations.*', 'clients.phone as phone', 'clients.name', 'tables.table_name as table', 'tables.capacity')
            ->where('reservations.date', $date)
            ->where('reservations.service', $service)
            ->get();
        return inertia::render('Services', ['reservations' => $reservations]);
    }

    public function edit($id)
    {
        $reservations = DB::table('reservations')
            ->join('clients', 'clients.id', '=', 'reservations.client_id')
            ->join('tables', 'tables.id', '=', 'reservations.table_id')
            ->select('reservations.*', 'clients.phone as phone', 'clients.email as email', 'clients.name as name', 'tables.table_name as table', 'tables.capacity')
            ->where('reservations.id', $id)
            ->get();
        return inertia::render('BookingUpdate', ['reservations' => $reservations]);
    }

    //Suppression d'une réservation
    public function destroy($id)
    {
        echo"destroy";
        $reservation = Reservation::find($id);
        $reservation->delete();
        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $reservation = Reservation::find($id);
        $reservation->update($request->all());
        return redirect()->action(
            [ReservationController::class, 'show'], ['date' => $request->date, 'service' => $request->service]
        );
    }

    public function availability($date, $service)
    {
//        return Inertia::render('TableView', [
//            'tables' => Table::all()->map(function ($table) {
//                return [
//                    'id' => $table->id,
//                    'name' => $table->name,
//                    'capacity' => $table->capacity,
//                ];
//            }),
//        ]);


        //$test = str($date);
        $reservations = DB::table('reservations')
            ->join('clients', 'clients.id', '=', 'reservations.client_id')
            ->join('tables', 'tables.id', '=', 'reservations.table_id')
            ->select('reservations.*', 'clients.phone as phone', 'clients.name', 'tables.id as booked', 'tables.table_name as table', 'tables.capacity')
            ->whereDate('reservations.date', '=', $date)
            ->where('reservations.service', $service)
            ->get();

        $tables = DB::table('tables')->get();

        return inertia::render('TableView', ['reservations' => $reservations, 'tables' => $tables]);
    }
}


