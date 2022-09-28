<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReservationControllerStoreRequest;
use App\Mail\Confirmation;
use App\Models\Client;
use App\Models\Reservation;
use App\Models\Table;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

// TODO : https://inertiajs.com/csrf-protection
class ReservationController extends Controller
{
    /**
     * @return \Inertia\Response
     */
    //Affichage par défault : le plan de la salle correspond au prochain service en fonction de l'heure actuelle
    public function index()
    {
            //Définition de la date du jour et l'heure actuelle
            //TODO Modifier l'heure en fonction de la timezone du restaurant
            date_default_timezone_set('Europe/Paris');
            $date = date('Y-m-d');
            $time = date('H:i:s');

            //Si l'heure actuelle est inférieure à 14h30, on affiche les réservations du service de midi
            if ($time < '14:30:00'):
                $service = 'lunch';
                //Si l'heure actuelle est supérieure à 20h00, on affiche les réservations du lendemain midi
                elseif ($time > '20:00:00') :
                    $service = 'lunch';
                    $date = date('Y-m-d', strtotime($date . ' +1 day'));
                //Sinon, entre 14h30 et 20h00, on affiche les réservations du service du soir
                else :
                $service = 'diner';
            endif;

            //On récupère les tables du restaurant qui sont réservées
            $reservations = DB::table('reservations')
                ->join('tables', 'tables.id', '=', 'reservations.table_id')
                ->select('reservations.date', 'reservations.service', 'reservations.table_id', 'tables.id')
                ->where('reservations.date', $date)
                ->where('reservations.service', $service)
                ->get();

            //On récupère toutes les tables du restaurant
            $tables = DB::select('select id, table_name, free, capacity from tables');

            //On retourne la vue avec les props nécessaires
            return inertia::render('Services', [
                'reservations' => $reservations ,
                'tables' => $tables,
                'date' => $date,
                'service' => $service]);
    }

    /**
     * @param \App\Http\Requests\ReservationControllerStoreRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        //TODO : Afficher les erreurs de validation : https://laravel.com/docs/9.x/validation
        //Formatage des dates reçues
        $time_input = strtotime($request->time);
        $date_input = strtotime($request->date);
        $reservation_date = date('Y-m-d', $date_input);
        $reservation_time = date('H:i:s', $time_input);
        //Vérifier si le client n'a pas déjà réservé à cette date et à ce service
        $client_reservation = Client::where('phone', $request->phone)
            ->join('reservations', 'reservations.client_id', '=', 'clients.id')
            ->where('reservations.date', $reservation_date)
            ->where('reservations.service', $request->service)
            ->first();
        //Si le client a déjà réservé à cette date et à ce service, on renvoie un message d'erreur
        if ($client_reservation) {
            session(['validation' => false]);
            session(['message' => 'You have already booked a table for this date and service']);
            return Redirect::back();
        }
        else {
            session(['validation' => true]);
            session(['message' => 'Booking successful. You will receive a confirmation email shortly']);

            //Insertion de la réservation dans la base de données
            //Création du client
            //TODO : validation des données. Problème : firstorcreate teste le numéro de téléphone existant, trouver comment écrire la requête
            //Si le client n'existe pas, on le crée
            $client = Client::firstOrCreate(
                [
                    'phone' => $request->phone,
                ],
                [
                    'name' => $request->name,
                    'phone' => $request->phone,
                    'email' => $request->email,
                ]
            );
//        $client = Client::firstOrCreate(
//            $request->validate([
//                'name' => ['required', 'max:50'],
//                'phone' => ['required', 'max:50'],
//                'email' => ['required', 'max:50', 'email'],
//            ])
//        );

            //Création de la réservation
            //TODO : validation des données. Problème : request->time doit être formaté en date. Voir code commenté ci-dessous
            $client->reservation()->create([
                'couverts' => $request->couverts,
                'date' => $reservation_date,
                'service' => $request->service,
                'table_id' => $request->table_id,
                'time' => $reservation_time,
            ]);

//        $client->reservation()->create(
//            $request->validate([
//                'table_id' => ['required', 'max:10'],
//                'couverts' => ['required', 'max:2'],
//                'service' => ['required', 'max:50'],
//                'date' => ['required', 'max:50'],
//                'time' => ['required', 'max:10'],
//            ])
//        );

            //Récupération des données utilisées pour l'envoi du mail de confirmation
            $email_date = date('d-m-Y', $date_input);
            $email_time = date('H:i', $time_input);
            $email_informations = [
                'name' => $request->name,
                'date' => $email_date,
                'time' => $email_time,
                'table_id' => $request->table_id,
                'couverts' => $request->couverts,
            ];
            //Envoi du mail de confirmation
            Mail::to($request->email)
                ->queue(new Confirmation($email_informations));
            //->queue(new Confirmation($request->except('_token')));
            //Endif
        }

        //Redirection vers la page contenant le plan de salle pour lequel on vient de faire une réservation
        return redirect()->action(
            [ReservationController::class, 'show'], ['date' => $reservation_date, 'service' => $request->service]
        );

    }

    public function show($date, $service)
    {
        //Récupérer les réservation pour la date et le service reçus en paramètres
        $reservations = DB::table('reservations')
            ->join('clients', 'clients.id', '=', 'reservations.client_id')
            ->join('tables', 'tables.id', '=', 'reservations.table_id')
            ->select('reservations.*', 'clients.phone as phone', 'clients.name', 'tables.table_name as table', 'tables.capacity')
            ->where('reservations.date', $date)
            ->where('reservations.service', $service)
            ->get();
        //Formatage de la date
        $date_url = strtotime($date);
        $reservation_date = date('Y-m-d', $date_url);
        //On récupère toutes les tables du restaurant
        $tables = DB::select('select id, table_name, free, capacity from tables');
        //Si un message doit être affiché, on le récupère
        $validation = session('validation');
        if (isset($validation)) {
            $message = session('message');
            $validation = session('validation');
            //On supprime la variable de session
            session()->pull('message');
            session()->pull('validation');
            //On retourne la vue avec les props nécessaires
            return inertia::render('ServiceSelected', ['reservations' => $reservations, 'tables' => $tables, 'date' => $reservation_date, 'service' => $service, 'validation' => $validation, 'message' => $message]);

        }
        else {
            //On retourne la vue avec les props nécessaires
            return inertia::render('ServiceSelected', ['reservations' => $reservations, 'tables' => $tables, 'date' => $reservation_date, 'service' => $service]);
        }
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

    public function destroy(Request $request)
    {
        //TODO : système de cascade pour la suppression des réservations et des clients
        $id = $request->id;
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


