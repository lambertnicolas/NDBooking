import React, {useState} from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import {Inertia} from "@inertiajs/inertia";

export default function Reservation(props) {
console.log(props);
    return (
        <div className='columns is-centered'>
            <Head title="Reservation" />
            <div className='column is-2'>
                {props.reservations.map((reservation) =>
                    <div className='box'>
                        <p>Table id : {reservation.booked}</p>
                        <p>Nom : {reservation.table}</p>
                        <p>Couverts : {reservation.capacity}</p>
                    </div>
                )}
            </div>
            <br />
            <div className='column is-2'>
                {props.tables.map((table) =>
                    <div className='box'>
                        <p>Table id : {table.id}</p>
                        <p>Nom : {table.table_name}</p>
                        <p>Couverts : {table.capacity}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
