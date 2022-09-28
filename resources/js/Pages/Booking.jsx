import { Inertia } from "@inertiajs/inertia";
import React, { useState, useRef } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import Swal from "sweetalert2";
import TableMap from "./TableMap";

export default function Booking() {
    const nameInputRef = useRef();
    const phoneInputRef = useRef();
    const emailInputRef = useRef();
    const table_idInputRef = useRef();

    const submitHandler = async (event) => {
        event.preventDefault();
        // Envoi les saisies dans les variables
        const enteredName = nameInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const enteredTable_id = table_idInputRef.current.value;
        // Affichage du contenu des variables dans la console
        const answer = Swal.fire("Thank you!", "Booking's done!", "success");
        if (await answer) {
            // Save it!
            console.log("Service: " + service);
            console.log("Date: " + selectedDate);
            console.log("Table number: " + enteredTable_id);
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
                table_id: enteredTable_id,
                client_id: "",
                couverts: nbrP,
                service: service,
                date: selectedDate,
                time: startTime,
            };

            //Renvoie vers la route post
            Inertia.post("/reservation", formData);
            //Retour à la page home apres la réservation

            /* const date = new Date(selectedDate)
            var day = date.getDate()
            var month = date.getMonth() + 1
            const year = date.getFullYear()
    
            if (day < 10) {
                day = '0' + day;
              }
              
              if (month < 10) {
                month = '0' + month;
              }
            const newDate = "/reservation/" + year + "-" + month + "-" + day + "/" + service
            window.location.href = newDate */
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
        { value: "", text: "--Choose a number of people--" },
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
    // Choix du service
    const serv = [
        { value: "", text: "--Choose a service--" },
        { value: "lunch", text: "lunch" },
        { value: "diner", text: "diner" },
    ];

    const [service, setService] = useState(serv[0].value);

    const handleChangeS = (event) => {
        event.preventDefault();
        //console.log(event.target.value)
        setService(event.target.value);
    };
    // Choix de la date
    const [selectedDate, setSelectedDate] = useState(new Date());
    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    };
    // Choix de l'heure
    const [startTime, setStartTime] = useState("");
    const filterPassedTime2 = (time) => {
        const currentDate = new Date();
        const selectedTime = new Date(time);

        return currentDate.getTime() < selectedTime.getTime();
    };
    let timeCheck;
    if (selectedDate.getDay() === new Date().getDay()) {
        timeCheck = (
            <ReactDatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                minTime={setHours(setMinutes(new Date(), 0), 12)}
                maxTime={setHours(setMinutes(new Date(), 0), 21)}
                filterTime={filterPassedTime}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="hh:mm"
                withPortal
                required
            />
        );
    } else {
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
    }
    return (
        <div className="container">
            <div className="columns" style={{ justifyContent: "center" }}>
                <div className="column" style={{ maxWidth: "20rem" }}>
                    <form onSubmit={submitHandler}>
                        <input
                            className="input"
                            id="name"
                            ref={nameInputRef}
                            placeholder="name"
                            required
                        />
                        <input
                            className="input"
                            id="phone"
                            ref={phoneInputRef}
                            placeholder="phone"
                            required
                        />
                        <input
                            className="input"
                            id="email"
                            ref={emailInputRef}
                            placeholder="email"
                            required
                        />
                        <input
                            className="input"
                            id="table_id"
                            ref={table_idInputRef}
                            placeholder="table number"
                            required
                        />
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
                        <div className="select">
                            <select
                                value={service}
                                onChange={handleChangeS}
                                required
                            >
                                {serv.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.text}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <ReactDatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            filterTime={filterPassedTime}
                            dateFormat="dd/MM/yyyy"
                            minDate={new Date()}
                            withPortal
                        />
                        <label className="label" htmlFor="time">
                            Time :
                        </label>
                        {timeCheck} <br />
                        <button className="button is-primary" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
