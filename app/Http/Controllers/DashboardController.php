<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //Définition de la date du jour et l'heure actuelle
        // TODO Modifier l'heure en fonction de la timezone du restaurant
        date_default_timezone_set('Europe/Paris');
        $date = date('Y-m-d');
        $time = date('H:i:s');
        //Si l'heure actuelle est inférieure à 13h30, on affiche les réservations du service de midi
        if ($time < '14:00:00'):
            $service = 'lunch';
            $slot1start = '12:00:00';
            $slot1end = '12:59:00';
            $slot2start = '13:00:00';
            $slot2end = '13:59:00';
            $slot3start = '14:00:00';
            $slot3end = '15:00:00';
            $slots = [ 'first' => '12h - 13h', 'second' => '13h - 14h', 'third' => '14h - 15h'];
        //Sinon, entre 13h30 et 20h00, on affiche les réservations du service du soir
        else :
            $service = 'diner';
            $slot1start = '18:00:00';
            $slot1end = '18:59:00';
            $slot2start = '19:00:00';
            $slot2end = '19:59:00';
            $slot3start = '20:00:00';
            $slot3end = '20:30:00';
            $slots = [ 'first' => '18h - 19h', 'second' => '19h - 20h', 'third' => '20h - 21h'];
        endif;
        //On récupère les tables du restaurant qui sont réservées pour le slot 1
        $slot1 = DB::table('reservations')
            ->join('clients', 'clients.id', '=', 'reservations.client_id')
            ->join('tables', 'tables.id', '=', 'reservations.table_id')
            ->select(
                'reservations.id as res_id',
                'reservations.date',
                'reservations.service',
                'reservations.table_id',
                'reservations.time',
                'reservations.couverts',
                'clients.name as client_name',
                'clients.phone as client_phone',
                'clients.email as client_email',
                'tables.id')
            ->where('reservations.date', $date)
            ->where('reservations.service', $service)
            ->whereBetween('reservations.time', [$slot1start, $slot1end])
            ->orderBy('reservations.time', 'asc')
            ->get();
        //On récupère les tables du restaurant qui sont réservées pour le slot 2
        $slot2 = DB::table('reservations')
            ->join('clients', 'clients.id', '=', 'reservations.client_id')
            ->join('tables', 'tables.id', '=', 'reservations.table_id')
            ->select(
                'reservations.id as res_id',
                'reservations.date',
                'reservations.service',
                'reservations.table_id',
                'reservations.time',
                'reservations.couverts',
                'clients.name as client_name',
                'clients.phone as client_phone',
                'clients.email as client_email',
                'tables.id')
            ->where('reservations.date', $date)
            ->where('reservations.service', $service)
            ->whereBetween('reservations.time', [$slot2start, $slot2end])
            ->orderBy('reservations.time', 'asc')
            ->get();
        //On récupère les tables du restaurant qui sont réservées pour le slot 3
        $slot3 = DB::table('reservations')
            ->join('clients', 'clients.id', '=', 'reservations.client_id')
            ->join('tables', 'tables.id', '=', 'reservations.table_id')
            ->select(
                'reservations.id as res_id',
                'reservations.date',
                'reservations.service',
                'reservations.table_id',
                'reservations.time',
                'reservations.couverts',
                'clients.name as client_name',
                'clients.phone as client_phone',
                'clients.email as client_email',
                'tables.id')
            ->where('reservations.date', $date)
            ->where('reservations.service', $service)
            ->whereBetween('reservations.time', [$slot3start, $slot3end])
            ->orderBy('reservations.time', 'asc')
            ->get();
        //On récupère les tables du restaurant qui sont réservées pour le slot 3
        $reservations = DB::table('reservations')
            ->join('clients', 'clients.id', '=', 'reservations.client_id')
            ->join('tables', 'tables.id', '=', 'reservations.table_id')
            ->select(
                'reservations.date',
                'reservations.service',
                'reservations.table_id',
                'reservations.time',
                'reservations.couverts',
                'clients.name as client_name',
                'clients.phone as client_phone',
                'clients.email as client_email',
                'tables.id')
            ->where('reservations.date', $date)
            ->where('reservations.service', $service)
            ->get();
        //On récupère toutes les tables du restaurant
        $tables = DB::select('select id, table_name, free, capacity from tables');
        return inertia::render('Dashboard', ['slot1' => $slot1 , 'slot2' => $slot2, 'slot3' => $slot3, 'tables' => $tables, 'reservations' => $reservations, 'slots' => $slots, 'service' => $service]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($date, $service)
    {
        //Si l'heure actuelle est inférieure à 13h30, on affiche les réservations du service de midi
        if ($service == 'lunch'):
            $slot1start = '12:00:00';
            $slot1end = '12:59:00';
            $slot2start = '13:00:00';
            $slot2end = '13:59:00';
            $slot3start = '14:00:00';
            $slot3end = '15:00:00';
            $slots = [ 'first' => '12h - 13h', 'second' => '13h - 14h', 'third' => '14h - 15h'];
        //Sinon, entre 13h30 et 20h00, on affiche les réservations du service du soir
        else :
            $slot1start = '18:00:00';
            $slot1end = '18:59:00';
            $slot2start = '19:00:00';
            $slot2end = '19:59:00';
            $slot3start = '20:00:00';
            $slot3end = '20:30:00';
            $slots = [ 'first' => '18h - 19h', 'second' => '19h - 20h', 'third' => '20h - 21h'];
        endif;
        //On récupère les tables du restaurant qui sont réservées pour le slot 1
        $slot1 = DB::table('reservations')
            ->join('clients', 'clients.id', '=', 'reservations.client_id')
            ->join('tables', 'tables.id', '=', 'reservations.table_id')
            ->select(
                'reservations.id as res_id',
                'reservations.date',
                'reservations.service',
                'reservations.table_id',
                'reservations.time',
                'reservations.couverts',
                'clients.name as client_name',
                'clients.phone as client_phone',
                'clients.email as client_email',
                'tables.id')
            ->where('reservations.date', $date)
            ->where('reservations.service', $service)
            ->whereBetween('reservations.time', [$slot1start, $slot1end])
            ->orderBy('reservations.time', 'asc')
            ->get();
        //On récupère les tables du restaurant qui sont réservées pour le slot 2
        $slot2 = DB::table('reservations')
            ->join('clients', 'clients.id', '=', 'reservations.client_id')
            ->join('tables', 'tables.id', '=', 'reservations.table_id')
            ->select(
                'reservations.id as res_id',
                'reservations.date',
                'reservations.service',
                'reservations.table_id',
                'reservations.time',
                'reservations.couverts',
                'clients.name as client_name',
                'clients.phone as client_phone',
                'clients.email as client_email',
                'tables.id')
            ->where('reservations.date', $date)
            ->where('reservations.service', $service)
            ->whereBetween('reservations.time', [$slot2start, $slot2end])
            ->orderBy('reservations.time', 'asc')
            ->get();
        //On récupère les tables du restaurant qui sont réservées pour le slot 3
        $slot3 = DB::table('reservations')
            ->join('clients', 'clients.id', '=', 'reservations.client_id')
            ->join('tables', 'tables.id', '=', 'reservations.table_id')
            ->select(
                'reservations.id as res_id',
                'reservations.date',
                'reservations.service',
                'reservations.table_id',
                'reservations.time',
                'reservations.couverts',
                'clients.name as client_name',
                'clients.phone as client_phone',
                'clients.email as client_email',
                'tables.id')
            ->where('reservations.date', $date)
            ->where('reservations.service', $service)
            ->whereBetween('reservations.time', [$slot3start, $slot3end])
            ->orderBy('reservations.time', 'asc')
            ->get();
        //On récupère les tables du restaurant qui sont réservées pour le slot 3
        $reservations = DB::table('reservations')
            ->join('clients', 'clients.id', '=', 'reservations.client_id')
            ->join('tables', 'tables.id', '=', 'reservations.table_id')
            ->select(
                'reservations.date',
                'reservations.service',
                'reservations.table_id',
                'reservations.time',
                'reservations.couverts',
                'clients.name as client_name',
                'clients.phone as client_phone',
                'clients.email as client_email',
                'tables.id')
            ->where('reservations.date', $date)
            ->where('reservations.service', $service)
            ->get();

        $date_url = strtotime($date);
        $reservation_date = date('Y-m-d', $date_url);
        //On récupère toutes les tables du restaurant
        $tables = DB::select('select id, table_name, free, capacity from tables');
        return inertia::render('Dashboard', ['service' => $service , 'selectDates' => $date , 'dateString' => $reservation_date , 'slot1' => $slot1 , 'slot2' => $slot2, 'slot3' => $slot3, 'tables' => $tables, 'reservations' => $reservations, 'slots' => $slots]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
