import React from "react";
import ResDinner from "./ResDinner";
import { createRoot } from "react-dom/client";
import "./TableMap.css";
import { useState } from "react";
import Swal from "sweetalert2";

const textForm = {
    fontFamily: "Poppins, cursive",
    color: "#ffffff",
    fontSize: 20,
};

const mapTable = {
    backgroundColor: "white",
    border: "5px solid black",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "30rem",
};

function reserved() {
    Swal.fire("Reserved !");
}

const TableMapDinner = (props) => {
    const bookedTables = props.bookedTables;
    const tables = props.tables;

    console.log(tables);
    console.log(bookedTables);

    bookedTables.map((res) => {
        tables[res.table_id - 1].free = "n";
    });

    const [tableNum, setTableNum] = useState("");
    const resDinner = (val, tSize) => {
        const container = document.getElementById("form");
        const root = createRoot(container);
        setTableNum(val.toString());
        root.render(
            <ResDinner
                service={props.service}
                selectedDate={props.selectedDate}
                table={val}
                TableSize={tSize}
            />
        );
    };

    return (
        <div className="column">
            <p className="control has-icons-left" style={textForm}>
                Table selected: {tableNum}{" "}
            </p>
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
                                onClick={function () {
                                    const tN = table.id;
                                    const tSize = table.capacity;
                                    resDinner(tN, tSize);
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
export default TableMapDinner;
