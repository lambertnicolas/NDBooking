import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createRoot } from "react-dom/client";
import TableMapLunch from "./TableMapLunch";
import TableMapDinner from "./TableMapDinner";

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
    const [selectedDate, setSelectedDate] = useState(new Date());
    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);

        return currentDate.getTime() < selectedDate.getTime();
    };

    const setLunch = (event) => {
        event.preventDefault();

        if (
            new Date().getHours() > 14 &&
            selectedDate.getDay() === new Date().getDay()
        ) {
            alert("Too late for lunch !");
        } else {
            const serv = "lunch";
            const container = document.getElementById("map");
            const root = createRoot(container);

            root.render(
                <TableMapLunch
                    service={serv}
                    selectedDate={selectedDate}
                    resLunch={function () {
                        throw new Error("Function not implemented.");
                    }}
                />
            );
        }
    };

    const setDinner = (event) => {
        event.preventDefault();

        if (
            new Date().getHours() > 20 &&
            selectedDate.getDay() === new Date().getDay()
        ) {
            alert("Too late for Dinner !");
        } else {
            const serv = "dinner";
            const container = document.getElementById("map");
            const root = createRoot(container);

            root.render(
                <TableMapDinner
                    service={serv}
                    selectedDate={selectedDate}
                    resDinner={function () {
                        throw new Error("Function not implemented.");
                    }}
                />
            );
        }
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
                            // filterDate={date => date.getDay() !== 1 && date.getDay() !== 2}
                            // timeClassName={handleColor}
                            // placeholderText="Click here"
                            withPortal
                        />
                        <br />
                        <p className="control has-icons-left" style={textForm}>
                            Select a service:
                        </p>
                        <div id="test"></div>
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
                            Diner
                        </button>
                    </div>
                </div>
                <div id="map" style={flex}></div>
            </div>
        </div>
    );
};

export default Services;
