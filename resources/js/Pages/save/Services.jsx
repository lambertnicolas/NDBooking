import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { createRoot } from "react-dom/client";
import TableMapLunch from "./TableMapLunch";
import TableMapDinner from "./TableMapDinner";
//import ResLunch from './ResLunch';

const textForm = {
    fontFamily: "Poppins, cursive",
    color: "#ffffff",
    fontSize: 20,
};
const contain = {
    justifyContent: "center",
};

const flex = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
};

const Services = () => {
    const [selectedDate, setSelectedDate] = useState(
        setHours(setMinutes(new Date(), 0), 11)
    );
    /* let handleColor = (time: any) => {
        return time.getHours() > 12 ? "text-success" : "text-error";
    } */
    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    };

    const [service, setService] = useState(null);

    const setLunch = (event) => {
        event.preventDefault();

        const container = document.getElementById("map");
        const root = createRoot(container);

        root.render(
            <TableMapLunch
                service={service}
                selectedDate={selectedDate}
                resLunch={function () {
                    throw new Error("Function not implemented.");
                }}
            />
        );
        setService("lunch");
    };

    const setDinner = (event) => {
        event.preventDefault();

        const container = document.getElementById("map");
        const root = createRoot(container);

        root.render(
            <TableMapDinner
                service={service}
                selectedDate={selectedDate}
                resDinner={function () {
                    throw new Error("Function not implemented.");
                }}
            />
        );
        setService("dinner");
    };

    return (
        <div className="container">
            <div className="columns" style={contain}>
                <div className="column is-one-quarter" style={flex}>
                    <div className="field">
                        <p className="control has-icons-left" style={textForm}>
                            Select a date:
                        </p>
                        <ReactDatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            filterTime={filterPassedTime}
                            dateFormat="dd/MM/yyyy"
                            minDate={new Date()}
                            filterDate={(date) =>
                                date.getDay() !== 1 && date.getDay() !== 2
                            }
                            /* timeClassName={handleColor} */
                            placeholderText="Click here"
                            withPortal
                        />
                        <br />
                        <p className="control has-icons-left" style={textForm}>
                            Select a service:
                        </p>
                        <button
                            className="button is-primary is-rounded"
                            type="button"
                            onClick={setLunch}
                        >
                            Lunch
                        </button>
                        &nbsp;&nbsp;
                        <button
                            className="button is-link is-rounded"
                            type="button"
                            onClick={setDinner}
                        >
                            Dinner
                        </button>
                    </div>
                </div>
                <div id="map" style={flex}></div>
            </div>
        </div>
    );
};

export default Services;

/*
excludeTimes={[
                                   setHours(setMinutes(new Date(), 30), 5),
setHours(setMinutes(new Date(), 0), 6),
setHours(setMinutes(new Date(), 30), 6),
setHours(setMinutes(new Date(), 0), 7),
setHours(setMinutes(new Date(), 30), 7),
setHours(setMinutes(new Date(), 0), 8),
setHours(setMinutes(new Date(), 30), 8),
setHours(setMinutes(new Date(), 0), 9),
setHours(setMinutes(new Date(), 30), 9),
setHours(setMinutes(new Date(), 0), 10),
setHours(setMinutes(new Date(), 30), 10),
setHours(setMinutes(new Date(), 0), 11),
setHours(setMinutes(new Date(), 30), 11),
setHours(setMinutes(new Date(), 30), 15),
setHours(setMinutes(new Date(), 0), 16),
setHours(setMinutes(new Date(), 30), 16),
setHours(setMinutes(new Date(), 0), 17),
setHours(setMinutes(new Date(), 30), 17),
setHours(setMinutes(new Date(), 0), 18),
setHours(setMinutes(new Date(), 30), 18),
setHours(setMinutes(new Date(), 0), 19),
setHours(setMinutes(new Date(), 30), 19),
setHours(setMinutes(new Date(), 0), 20),
setHours(setMinutes(new Date(), 30), 20),
setHours(setMinutes(new Date(), 0), 21),
setHours(setMinutes(new Date(), 30), 21),
setHours(setMinutes(new Date(), 0), 22),
setHours(setMinutes(new Date(), 30), 22),
setHours(setMinutes(new Date(), 0), 23),
setHours(setMinutes(new Date(), 30), 23),
                                    setHours(setMinutes(new Date(), 0), 0),
                                ]}

 */
