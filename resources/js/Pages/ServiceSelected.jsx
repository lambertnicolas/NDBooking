import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createRoot } from "react-dom/client";
import TableMapLunch from "./TableMapLunch";
import TableMapDinner from "./TableMapDinner";
import { Link } from '@inertiajs/inertia-react';
import Swal from "sweetalert2";
import TableMap from "./TableMap";
import TableMap2 from "./TableMap2";

const textForm = {
    fontFamily: "Poppins, cursive",
    color: "#ffffff",
    fontSize: 20,
};
const contain = {
    justifyContent: "center",
};
const notification = {
    fontFamily: "Poppins, cursive",
    color: "#ffffff"
};

const flex = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
};

const Services = (props) => {
    var myDate = new Date(props.date)
    // On récupère la liste des tables et la liste des tables réservées
    const booked = props.reservations;
    const tables = props.tables;
    const [service, setService] = useState(props.service)
    var serv = service
    const [selectedDate, setSelectedDate] = useState(new Date)
    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

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
            const newDate = "/reservation/" + year + "-" + month + "-" + day + "/" + serv

        return currentDate.getTime() < selectedDate.getTime();
    };

    const setLunch = (event) => {
        event.preventDefault()

        if ((new Date().getHours() > 13) && (selectedDate.getDay() === new Date().getDay())) {
            Swal.fire('Too late for lunch !')

        } else {
            setService("lunch")
            serv = "lunch"
            const container = document.getElementById('map')
            const root = createRoot(container);

            root.render(
                <TableMapLunch bookedTables={booked} tables={tables} service={serv} selectedDate={myDate} resLunch={function () {
                    throw new Error('Function not implemented.');
                }} />
            );
        }
    }

    const setDinner = (event) => {
        event.preventDefault()

        if ((new Date().getHours() > 19) && (selectedDate.getDay() === new Date().getDay())) {
            Swal.fire('Too late for Diner !')

        } else {
            setService("diner")
            serv = "diner"
            const container = document.getElementById('map')
            const root = createRoot(container);

            root.render(
                <TableMapDinner bookedTables={booked} tables={tables} service={serv} selectedDate={myDate} resDinner={function (){
                    throw new Error('Function not implemented.');
                }} />
            );
        }
    }

    return (
        <div className='container'>
            <div className="columns" style={contain}>
                <div className="column" style={flex}>
                    {/* <div className="field">
                        <p className="control has-icons-left" style={textForm}>Select a date:</p>
                        <ReactDatePicker
                            selected={selectedDate} onChange={date => setSelectedDate(date)}
                            filterTime={filterPassedTime}
                            dateFormat='dd/MM/yyyy'
                            minDate={new Date()}
                            // filterDate={date => date.getDay() !== 1 && date.getDay() !== 2}
                            // timeClassName={handleColor}
                            // placeholderText="Click here"
                            withPortal
                        /><br />
                        <p className="control has-icons-left" style={textForm}>Select a service:</p>
                        <div id="test"></div>
                        <button className="button is-primary " type="button" onClick={setLunch}>Lunch</button>&nbsp;&nbsp;
                        <button className="button is-link " type="button" onClick={setDinner}>Diner</button>
                    </div> */}
                </div>
                <div id='map' style={flex}>
                    <TableMap2 bookedTables={booked} tables={tables} service={serv} selectedDate={myDate} />
                </div>
            </div>
        </div>
    );
};

export default Services;
