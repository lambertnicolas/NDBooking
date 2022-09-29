import Authenticated from "../Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import React, { useState, useRef } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./TableMap.css";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";
import Booking from "./Booking";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";

const textForm = {
    fontFamily: "Poppins, cursive",
    color: "#ffffff",
    fontSize: 20,
};
const notification = {
    fontFamily: "Poppins, cursive",
    color: "#ffffff",
    minWidth: "23rem",
};
const contain = {
    justifyContent: "center",
};
const button = {
    minWidth: "15rem",
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
    const [service, setService] = useState(props.service);
    var serv = service;
    const [selectedDate, setSelectedDate] = useState();
    console.log(props.selectDates);

    const setLunch = (event) => {
        event.preventDefault();

        setService("lunch");
        serv = "lunch";

        const date = new Date(selectedDate);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        const year = date.getFullYear();

        if (day < 10) {
            day = "0" + day;
        }

        if (month < 10) {
            month = "0" + month;
        }
        const newDate =
            "/dashboard/" + year + "-" + month + "-" + day + "/" + serv;
        window.location.href = newDate;
    };

    const setDiner = (event) => {
        event.preventDefault();

        setService("diner");
        serv = "diner";

        const date = new Date(selectedDate);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        const year = date.getFullYear();

        if (day < 10) {
            day = "0" + day;
        }

        if (month < 10) {
            month = "0" + month;
        }
        const newDate =
            "/dashboard/" + year + "-" + month + "-" + day + "/" + serv;
        window.location.href = newDate;
    };

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

    var slot1Total = 0;
    for (let cptr = 0; cptr < slot1.length; cptr++) {
        slot1Total += slot1[cptr].couverts;
    }
    console.log(slot1Total);

    var slot2Total = 0;
    for (let cptr = 0; cptr < slot2.length; cptr++) {
        slot2Total += slot2[cptr].couverts;
    }
    console.log(slot2Total);

    var slot3Total = 0;
    for (let cptr = 0; cptr < slot3.length; cptr++) {
        slot3Total += slot3[cptr].couverts;
    }
    console.log(slot3Total);

    reservations.map((res) => {
        tables[res.table_id - 1].free = "n";
    });

    function remove(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not see this reservation again!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.visit("/delete", {
                    method: "delete",
                    data: {
                        id: id,
                    },
                });
                Swal.fire(
                    "Deleted!",
                    "Reservation has been deleted.",
                    "success"
                );
            }
        });
    }
    const nameInputRef = useRef();
    const phoneInputRef = useRef();
    const emailInputRef = useRef();
    //const table_idInputRef = useRef();

    const submitHandler = async (event) => {
        event.preventDefault();
        // Envoi les saisies dans les variables
        const enteredName = nameInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        /* tableNum = table_idInputRef.current.value; */
        // Affichage du contenu des variables dans la console
        const answer = Swal.fire("Thank you!", "Booking's done!", "success");
        if (await answer) {
            // Save it!
            console.log("Service: " + service);
            console.log("Date: " + props.selectDates);
            console.log("Table number: " + tableNum);
            console.log("Hour: " + startTime);
            console.log("Number of people: " + nbrP);
            console.log("Name: " + enteredName);
            console.log("Phone: " + enteredPhone);
            console.log("Email: " + enteredEmail);
            // Envoi des données au serveur
            const formData = {
                name: enteredName,
                phone: enteredPhone,
                email: enteredEmail,
                table_id: tableNum,
                client_id: "",
                couverts: nbrP,
                service: service,
                date: props.selectDates,
                time: startTime,
            };

            //Renvoie vers la route post
            Inertia.post("/reservation", formData);
            //Retour à la page home apres la réservation

            const date = new Date(props.selectDates)
            var day = date.getDate()
            var month = date.getMonth() + 1
            const year = date.getFullYear()
    
            if (day < 10) {
                day = '0' + day;
              }
              
              if (month < 10) {
                month = '0' + month;
              }
              const newDate =
              "/dashboard/" + year + "-" + month + "-" + day + "/" + serv;
          window.location.href = newDate;
        } else {
            // Do nothing!
            console.log("Things was not saved to the database.");
        }
        // Reinitialisation des champs
        // nbrPeopleRef.current.value = ""
        nameInputRef.current.value = "";
        phoneInputRef.current.value = "";
        emailInputRef.current.value = "";
        table_idInputRef.current.value = "";
    };
    
    // Choix du nompre de couverts
    const nbrPs = [
        { value: "", text: "Choose a number of people" },
        { value: 2, text: "2" },
        { value: 3, text: "3" },
        { value: 4, text: "4" },
        { value: 5, text: "5" },
        { value: 6, text: "6" },
    ];

    const [nbrP, setNbrP] = useState(nbrPs[0].value);

    const handleChangeP = (event) => {
        event.preventDefault();
        //console.log(event.target.value)
        setNbrP(event.target.value);
    };
    const [tableNum, setTableNum] = useState("");

    const handleChangeT = (tN, tSize) => {
        //console.log(event.target.value)
        setTableNum(tN);        
    };    
  /*  if(nbrP > tSize) {
        Swal.fire('Max ' + tSize + ' persons for this table !')
        setNbrP (nbrPs[0].value)
    }else if (nbrP < (tSize -1) && nbrP != '') {
        Swal.fire('Min ' + (tSize -1) + ' persons for this table !')
        setNbrP (nbrPs[0].value)
    } */

    // Choix de l'heure
    const [startTime, setStartTime] = useState("");
    const filterPassedTime2 = (time) => {
        const currentDate = new Date();
        const selectedTime = new Date(time);

        return currentDate.getTime() < selectedTime.getTime();
    };
    let timeCheck;

    timeCheck = (
        <ReactDatePicker
            selected={startTime}
            onChange={(date) => setStartTime(date)}
            minTime={setHours(setMinutes(new Date(), 0), 12)}
            maxTime={setHours(setMinutes(new Date(), 0), 21)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="hh:mm"
            withPortal
            required
        />
    );

    return (
        <div className="container">
            <div className="columns" style={contain}>
                <div className="column" style={{ maxWidth: "23rem", margin: "auto" }}>
                <div className="notification is-dark" style={{fontFamily: "Poppins, cursive",
    color: "#ffffff",
    maxWidth: "23rem",
    margin: "auto"}}>
                        Choose date and service
                    </div>
                    <div className="field">
                        <p className="control has-icons-left" style={textForm}>
                            Select a date:
                        </p>
                        <ReactDatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="dd/MM/yyyy"
                            withPortal
                        />
                        <br />
                        <p className="control has-icons-left" style={textForm}>
                            Select a service:
                        </p>
                        <div id="test"></div>
                        <button
                            className="button is-primary "
                            type="button"
                            onClick={setLunch}
                        >
                            Lunch
                        </button>
                        &nbsp;&nbsp;
                        <button
                            className="button is-link "
                            type="button"
                            onClick={setDiner}
                        >
                            Diner
                        </button>
                    </div>
                    <article className="message">
                        <div className="message-header">
                            <p>Live booking</p>
                        </div>
                        <div className="message-body">
                            <form onSubmit={submitHandler}>
                            <div className="field">
                        <p className="control has-icons-left">
                        <input
                                    className="input"
                                    id="name"
                                    ref={nameInputRef}
                                    placeholder="name"
                                    required
                                />
                            <span className="icon is-small is-left">
                                <i className="fas fa-user"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control has-icons-left">
                        <input
                                    className="input"
                                    id="phone"
                                    ref={phoneInputRef}
                                    placeholder="phone"
                                    required
                                />
                            <span className="icon is-small is-left">
                                <i className="fas fa-phone"></i>
                            </span>
                        </p>
                    </div>           
                    <div className="field">
                        <p className="control has-icons-left">
                        <input
                                    className="input"
                                    id="email"
                                    ref={emailInputRef}
                                    placeholder="email"
                                    required
                                />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </p>
                    </div>            
                    <div className="field">
                        <p className="control has-icons-left">
                        <input
                                    className="input"
                                    id="table_id"
                                    value={tableNum}
                                    onChange={handleChangeT}
                                    /* ref={table_idInputRef} */
                                    placeholder="choose a table from map"
                                    required
                                />
                            <span className="icon is-small is-left">
                                <i className="fas fa-hashtag"></i>
                            </span>
                        </p>
                    </div>                  
                                
                                <div className="select">
                                    <select
                                        value={nbrP}
                                        onChange={handleChangeP}
                                        required
                                    >
                                        {nbrPs.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.text}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <label className="label" htmlFor="time">
                                    Time :
                                </label>
                                {timeCheck} <br />
                                <button
                                    className="button is-primary"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </article>
                </div>
                <div className="column">
                    <div className="notification is-dark" style={notification}>
                        Booking list for {props.dateString} {props.service}
                    </div>
                    <article
                        className={`message ${
                            slot1Total >= 10 ? "is-danger" : "is-success"
                        }`}
                        style={{ minWidth: "23rem" }}
                    >
                        <div className="message-header">
                            <div>{slots.first} service</div>
                            <p>Name/Cvts/Table/Time</p>
                        </div>
                        <div
                            className="message-body"
                            id="sl1"
                            style={{ textAlign: "end" }}
                        >
                            {slot1.map((val) => {
                                if (slot1 === []) {
                                    return <div>No reservation</div>;
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
                                            <button
                                                className="button is-small is-danger"
                                                onClick={function () {
                                                    remove(val.res_id);
                                                }}
                                            >
                                                X
                                            </button>
                                            <br />
                                        </p>
                                    );
                                }
                            })}
                        </div>
                    </article>
                    <article
                        className={`message ${
                            slot2Total >= 10 ? "is-danger" : "is-success"
                        }`}
                        style={{ minWidth: "23rem" }}
                    >
                        <div className="message-header">
                            <div>{slots.second} service</div>
                            <p>Name/Cvts/Table/Time</p>
                        </div>
                        <div
                            className="message-body"
                            id="sl2"
                            style={{ textAlign: "end" }}
                        >
                            {slot2.map((val) => {
                                if (slot2 === []) {
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
                                            <button
                                                className="button is-small is-danger"
                                                onClick={function () {
                                                    remove(val.res_id);
                                                }}
                                            >
                                                X
                                            </button>
                                            <br />
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </article>
                    <article
                        className={`message ${
                            slot3Total >= 10 ? "is-danger" : "is-success"
                        }`}
                        style={{ minWidth: "23rem" }}
                    >
                        <div className="message-header">
                            <div>{slots.third} service</div>
                            <p>Name/Cvts/Table/Time</p>
                        </div>
                        <div
                            className="message-body"
                            id="sl3"
                            style={{ textAlign: "end" }}
                        >
                            {slot3.map((val) => {
                                if (val === "") {
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
                                            <button
                                                className="button is-small is-danger"
                                                onClick={function () {
                                                    remove(val.res_id);
                                                }}
                                            >
                                                X
                                            </button>
                                            <br />
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </article>
                </div>
                <div className="column" >
                <div className="notification is-dark" style={{fontFamily: "Poppins, cursive",
    color: "#ffffff",
    minWidth: "23rem",
    maxWidth: "23rem",
    margin: "auto"}}>
                        Table map for {props.dateString} {props.service}
                    </div>
                    <div className="contain" style={{maxWidth: "23rem" , maxHeight: "23rem", margin: "auto" }}>
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
                                        onClick={function () {
                                            const tN = table.id;
                                            var tSize = table.capacity;
                                            handleChangeT(tN, tSize);
                                            /* select(tN, tSize); */
                                        }}
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
