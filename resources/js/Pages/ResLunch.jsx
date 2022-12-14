import React from "react";
import { useRef, useState } from "react";
import ReactDatePicker from "react-datepicker";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import {Inertia} from "@inertiajs/inertia";
import Swal from "sweetalert2";

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

    const submitHandler = async (event) => {
        event.preventDefault();
        // Envoi les saisies dans les variables
        const enteredName = nameInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;
        const enteredEmail = emailInputRef.current.value;
        const service = props.service;
        const selectedDate = props.selectedDate;
        // Affichage du contenu des variables dans la console
        const answer = Swal.fire("Thank you!", "Booking's done!", "success");
        if (await answer) {
            // Save it!
            console.log("Service: " + service);
            console.log("Date: " + selectedDate);
            console.log("Table number: " + props.table);
            console.log("Hour: " + startTime);
            console.log("Number of people: " + nbrP);
            console.log("Name: " + enteredName);
            console.log("Phone: " + enteredPhone);
            console.log("Email: " + enteredEmail);
            // Envoi des données au serveur
            const formData = {
                name: enteredName,
                phone : enteredPhone,
                email : enteredEmail,
                table_id : props.table,
                couverts : nbrP,
                service : service,
                date : selectedDate,
                time : startTime,
            };

            //Renvoie vers la route post
            Inertia.post('/reservation', formData)
            //Retour à la page home apres la réservation
            
            const date = new Date(selectedDate)
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
            window.location.href = newDate

        } else {
            // Do nothing!
            console.log("Things was not saved to the database.");
        }
        // Reinitialisation des champs
        // nbrPeopleRef.current.value = ""
        nameInputRef.current.value = "";
        phoneInputRef.current.value = "";
        emailInputRef.current.value = "";
    };

    const [startTime, setStartTime] = useState("");
    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedTime = new Date(time);

        return currentDate.getTime() < selectedTime.getTime();
    };

    const nbrPs = [
        { value: "", text: "--Choose a number of people--" },
        { value: 2, text: '2' },
        { value: 3, text: '3' },
        { value: 4, text: '4' },
        { value: 5, text: '5' },
        { value: 6, text: '6' }
    ];

    const [nbrP, setNbrP] = useState(nbrPs[0].value);
    const handleChangeP = (event) => {
        event.preventDefault();
        //console.log(event.target.value)
        setNbrP(event.target.value);
    };

    let timeCheck;
    if (props.selectedDate.getDay() === new Date().getDay()) {
        timeCheck = (
            <ReactDatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                minTime={setHours(setMinutes(new Date(), 0), 12)}
                maxTime={setHours(setMinutes(new Date(), 30), 14)}
                filterTime={filterPassedTime}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="hh:mm"
                withPortal
                required
            />
        )
    } else {
        timeCheck = (
            <ReactDatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                minTime={setHours(setMinutes(new Date(), 0), 12)}
                maxTime={setHours(setMinutes(new Date(), 30), 14)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="hh:mm"
                withPortal
                required
            />
        )
    }
    if(nbrP > props.TableSize) {
        Swal.fire('Max ' + props.TableSize + ' persons for this table !')
        setNbrP (nbrPs[0].value)
    }else if (nbrP < (props.TableSize -1) && nbrP != '') {
        Swal.fire('Min ' + (props.TableSize -1) + ' persons for this table !')
        setNbrP (nbrPs[0].value)
    }

    return (
        <div>
            <div className="column" style={flex}>
                <form onSubmit={submitHandler}>
                    <p className="control has-icons-left" style={textForm}>
                        Arrival time:
                    </p>
                    <div className="field">{timeCheck}</div>
                    <p className="control has-icons-left" style={textForm}>
                        Number of people:
                    </p>
                    <div className="select">
                        <select value={nbrP} onChange={handleChangeP} required>
                            {nbrPs.map((option) => (
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
