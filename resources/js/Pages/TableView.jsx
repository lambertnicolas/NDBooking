import React, {useState} from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import {Inertia} from "@inertiajs/inertia";

export default function Reservation(props) {
console.log(props);
    return (
        <>
            <Head title="Reservation" />
            <div>
                {props.reservations.map((reservation) =>
                    <>
                        <p>Table id : {reservation.booked}</p>
                        <p>Nom : {reservation.table}</p>
                        <p>Couverts : {reservation.capacity}</p>
                        <hr />
                    </>
                )}
            </div>
            <br />
            <div>
                {props.tables.map((table) =>
                    <>
                        <p>Table id : {table.id}</p>
                        <p>Nom : {table.table_name}</p>
                        <p>Couverts : {table.capacity}</p>
                        <hr />
                    </>
                )}
            </div>
        </>
    );
}
