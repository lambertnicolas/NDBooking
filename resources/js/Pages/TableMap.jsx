import React from "react";
import "./TableMap.css";
import Swal from "sweetalert2";
import { useState } from "react";
import { createRoot } from "react-dom/client";

const textForm = {
    fontFamily: "Poppins, cursive",
    color: "#ffffff",
    fontSize: 20,
};
const notification = {
    fontFamily: "Poppins, cursive",
    color: "#ffffff",
    minWidth: "23rem"
};

function reserved() {
    Swal.fire("Reserved !");
}

const TableMap = (props) => {
    const bookedTables = props.bookedTables;
    const tables = props.tables;
    const service = props.service;

    const date = new Date(props.selectedDate)
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
    const availability = year + "-" + month + "-" + day + "-" + service

    bookedTables.map((res) => {
        tables[res.table_id - 1].free = "n";
    });

    const [tableNum, setTableNum] = useState("");
    const select = (val, tSize) => {
        const container = document.getElementById("form");
        const root = createRoot(container);
        setTableNum(val.toString());
        if (service === "lunch") {
            window.location.href = newDate
        }
        else if (service === "diner") {
            window.location.href = newDate
        }
    };

    return (
        <div className="column">
            <div className="notification is-dark" style={{fontFamily: "Poppins, cursive",
    color: "#ffffff",
    minWidth: "23rem",
    maxWidth: "23rem",
    margin: "auto"}} >
                Table map for {availability}
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
                                    const tSize = table.capacity;
                                    select(tN, tSize);
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
            <div id="form"></div>
        </div>
    );
};

export default TableMap;
