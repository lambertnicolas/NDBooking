import Authenticated from "../Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./TableMap.css";
import Swal from "sweetalert2";
import {Inertia} from "@inertiajs/inertia";

const textForm = {
    fontFamily: "Poppins, cursive",
    color: "#ffffff",
    fontSize: 20,
};
const contain = {
    justifyContent: "center",
    maxHeight: "20rem"
};

const flex = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
};

function reserved() {
    Swal.fire("Reserved !");
}

export default function Dashboard(props) {
    //Récupération des 3 plages horaires pour le service du midi jusque 15h00
    //Après 15h00, on récupère les plages horaires pour le service du soir
    const slot1 = props.slot1;
    const slot2 = props.slot2;
    const slot3 = props.slot3;
    const slots = props.slots;
    const reservations = props.reservations;
    const tables = props.tables;
    console.log("slot 1 : ", slot1);
    console.log("slot 2 : ", slot2);
    console.log("slot 3 : ", slot3);
    console.log("slots : ", slots);
    console.log("Toutes les tables : ", tables);
    console.log("Tables réservées : ", reservations);

    var slot1Total = 0
    for(let cptr = 0; cptr < slot1.length; cptr++){
        slot1Total += slot1[cptr].couverts
    }
    console.log(slot1Total)
   
    var slot2Total = 0
    for(let cptr = 0; cptr < slot2.length; cptr++){
        slot2Total += slot2[cptr].couverts
    }
    console.log(slot2Total)

    var slot3Total = 0
    for(let cptr = 0; cptr < slot3.length; cptr++){
        slot3Total += slot3[cptr].couverts
    }
    console.log(slot3Total)

    reservations.map((res) => {
        tables[res.table_id - 1].free = "n";
    });

    function remove(id) {
        Inertia.visit('/delete', {
            method: 'delete',
            data: {
                id: id,
            },
        })
    }


    return (
        <div className="container">
            <div className="columns" style={contain}>
                <div className="column" style={flex}></div>
                <div className="column" style={flex}>
                <p style={textForm}>{props.selectedDate}{props.service}</p>
                    <article className={`message ${slot1Total>=10 ? 'is-danger': 'is-success'}`}>
                        <div className="message-header">
                            <div>{slots.first} service</div><p>Name/Cvts/Table/Time</p>
                        </div>
                        <div className="message-body" id="sl1" style={{textAlign:'end'}} >
                            {slot1.map((val) => {
                                if (slot1.length === 0) {
                                    return (
                                        <div>No reservation</div>)
                                } else {
                                    return (
                                        <p
                                            key={val.id}
                                            style={{ minWidth: "20rem" }}
                                        >
                                            {val.client_name} /&nbsp;
                                            {val.couverts} /&nbsp;
                                            {val.table_id} /&nbsp;
                                            {val.time} &nbsp;
                                            <button className="button is-small is-danger" onClick={function () {remove(val.res_id)} } >X</button>
                                            <br />
                                        </p>
                                    );
                                }
                            })}
                        </div>
                    </article>
                    <article className={`message ${slot2Total>=10 ? 'is-danger': 'is-success'}`}>
                        <div className="message-header">
                            <div>{slots.second} service</div><p>Name/Cvts/Table/Time</p>
                        </div>
                        <div className="message-body" id="sl2" style={{textAlign:'end'}}>
                            {slot2.map((val) => {
                                if (slot2.length === 0) {
                                    return <div>No reservation</div>;
                                } else {
                                    return (
                                        <div
                                            key={val.id}
                                            style={{ minWidth: "20rem" }}
                                        >

                                            {val.client_name} /&nbsp;
                                            {val.couverts} /&nbsp;
                                            {val.table_id} /&nbsp;
                                            {val.time} &nbsp;
                                            <button className="button is-small is-danger" onClick={function () {remove(val.res_id)} } >X</button>
                                            <br />
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </article>
                    <article className={`message ${slot3Total>=10 ? 'is-danger': 'is-success'}`}>
                        <div className="message-header">
                            <div>{slots.third} service</div><p>Name/Cvts/Table/Time</p>
                        </div>
                        <div className="message-body" id="sl3" style={{textAlign:'end'}}>
                            {slot3.map((val) => {
                                if (slot3.length === 0) {
                                    return <div>No reservation</div>;
                                } else {
                                    return (
                                        <div
                                            key={val.id}
                                            style={{ minWidth: "20rem" }}
                                        >
                                            {val.client_name} /&nbsp;
                                            {val.couverts} /&nbsp;
                                            {val.table_id} /&nbsp;
                                            {val.time} &nbsp;
                                            <button className="button is-small is-danger" onClick={function () {remove(val.res_id)} } >X</button>
                                            <br />
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </article>
                </div>
                <div className="column" style={flex}>
                    <div className="contain">
                        <div className="t12"></div>
                        <div className="t16"></div>
                        <div className="t17"></div>
                        <div className="t18"></div>
                        <div className="t22"></div>
                        {tables.map((table) => {
                            if (table.free === "y") {
                                return (
                                    <div
                                        key={table.id}
                                        className={"t" + table.id}
                                        /* onClick={function () {
                                            const tN = table.id;
                                            const tSize = table.capacity;
                                            select(tN, tSize);
                                        }} */
                                    ></div>
                                );
                            } else {
                                return (
                                    <div
                                        key={table.id}
                                        className={"tr" + table.id}
                                        onClick={reserved}
                                    ></div>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

{
    /* <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <Head title="Dashboard" />

        Liste des réservations ici

        </Authenticated> */
}
