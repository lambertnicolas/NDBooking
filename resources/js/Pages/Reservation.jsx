import React, {useState} from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import {Inertia} from "@inertiajs/inertia";

export default function Reservation(props) {

    return (
        <>
            <Head title="Reservation" />
                <div>
                    <h1>Reservation</h1>
                    {props.reservations.map((reservation) =>
                        <>
                        <p>{reservation.id}  -  {reservation.couverts} personnes</p>
                        <p>{reservation.date}  à  {reservation.time}</p>
                        <p>Service : {reservation.service}</p>
                        <p>Réservation : {reservation.name} : {reservation.phone}</p>
                        <p>Table : {reservation.table} : {reservation.capacity} couverts</p>
                            <Link href={`/reservation/${reservation.id}`} method="delete">delete</Link>
                            <Link href={`/reservation/${reservation.id}`} method="delete" as="button" type="button">delete 2</Link>
                        <hr />
                            <br />
                        </>
                    )}
                </div>
        </>
    );
}
