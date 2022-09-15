import React from "react";
import ResLunch from "./ResLunch";
import { createRoot } from "react-dom/client";
import "./TableMapLunch.css";

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

const tables = [
    { id: 1, name: "ocean", size: "2", free: "y" },
    { id: 2, name: "forest", size: "2", free: "y" },
    { id: 3, name: "mountain", size: "2", free: "n" },
    { id: 4, name: "rock", size: "4", free: "y" },
    { id: 5, name: "hill", size: "8", free: "n" },
    { id: 6, name: "lake", size: "6", free: "y" },
    { id: 7, name: "niagara", size: "6", free: "n" },
    { id: 8, name: "leaf", size: "2", free: "n" },
    { id: 9, name: "everest", size: "4", free: "n" },
    { id: 10, name: "nico", size: "2", free: "n" },
    { id: 11, name: "duc", size: "2", free: "y" },
];

function reserved() {
    alert("Reserved !");
}

const TableMapLunch = (props) => {
    const resLunch = (val) => {
        const container = document.getElementById("form");
        const root = createRoot(container);

        root.render(
            <ResLunch
                service={props.service}
                selectedDate={props.selectedDate}
                table={val}
            />
        );
    };

    return (
        <div className=" is-two-fifths">
            <p className="control has-icons-left" style={textForm}>
                Select a table:
            </p>
            <div style={mapTable}>
                {tables.map((table) => {
                    if (table.free === "y") {
                        return (
                            <div
                                key={table.id}
                                className={"t" + table.id.toString()}
                                onClick={function () {
                                    const tN = table.id;
                                    resLunch(tN);
                                }}
                            ></div>
                        );
                    } else {
                        return (
                            <div
                                key={table.id}
                                className={"tr" + table.id.toString()}
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

export default TableMapLunch;
