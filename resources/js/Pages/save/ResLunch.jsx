import React from "react";
import { useRef, useState } from "react";
import { Inertia } from "@inertiajs/inertia";

const textForm = {
    fontFamily: "Poppins, cursive",
    color: "#ffffff",
    fontSize: 20,
};

const flex = {
    display: "flex",
    justifyContent: "center",
};

const ResLunch = (props) => {
    const nbrPeopleRef = useRef();
    const nameInputRef = useRef();
    const phoneInputRef = useRef();
    const emailInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        // Envoi les saisies dans les variables
        const enteredPeople = nbrPeopleRef.current.value;
        const enteredName = nameInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const service = props.service;
        const selectedDate = props.selectedDate;
        const selectedTime = hour;
        const tableId = props.tableId;

        // Envoi des données au serveur
        const formData = {
            name: enteredName,
            phone: enteredPhone,
            email: enteredEmail,
            table_id: tableId,
            client_id: "",
            couverts: enteredPeople,
            service: "lunch",
            date: selectedDate,
            time: selectedTime,
            tableId: tableId,
        };

        //Renvoie vers la route post
        Inertia.post("/reservation", formData);

        // Reinitialisation des champs
        nbrPeopleRef.current.value = "";
        nameInputRef.current.value = "";
        phoneInputRef.current.value = "";
        emailInputRef.current.value = "";
    };
    const hours = [
        { value: "", text: "--Choose a hour--" },
        { value: "12:00", text: "12:00" },
        { value: "12:30", text: "12:30" },
        { value: "13:00", text: "13:00" },
        { value: "13:30", text: "13:30" },
        { value: "14:00", text: "14:00" },
        { value: "14:30", text: "14:30" },
    ];

    const [hour, setHour] = useState(hours[0].value);

    const handleChange = (event) => {
        event.preventDefault();
        console.log(event.target.value);
        setHour(event.target.value);

        console.log(hour);
    };

    return (
        <div>
            <div className="column" style={flex}>
                <form onSubmit={submitHandler}>
                    <p className="control has-icons-left" style={textForm}>
                        Arrival time:
                    </p>

                    <div className="select">
                        <select value={hour} onChange={handleChange}>
                            {hours.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                    </div>

                    <p className="control has-icons-left" style={textForm}>
                        Fill in the form:
                    </p>
                    <div className="field">
                        <p className="control has-icons-left">
                            <input
                                className="input"
                                type="text"
                                placeholder="Nbr people"
                                id="nbrpeople"
                                ref={nbrPeopleRef}
                                required
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-users"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control has-icons-left">
                            <input
                                className="input"
                                type="text"
                                placeholder="Name"
                                id="name"
                                ref={nameInputRef}
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
                                type="text"
                                placeholder="Phone"
                                id="phone"
                                ref={phoneInputRef}
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
                                type="email"
                                placeholder="Email"
                                id="email"
                                ref={emailInputRef}
                                required
                            />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </p>
                    </div>

                    <div className="field">
                        <p className="control">
                            <button
                                className="button is-success"
                                type={"submit"}
                                onClick={() => {}}
                            >
                                Confirm !
                            </button>
                        </p>
                    </div>
                </form>
            </div>
            <div className="column is-two-fifths" id="map" style={flex}></div>
        </div>
    );
};

export default ResLunch;