import React from "react";
import ResDinner from "./ResDinner";
import { createRoot } from "react-dom/client";
import "./TableMap.css";

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

const reservations = [
    { id: 1, name: "John", pNumber: 2, tNumber: 5, hour: "18:30" },
    { id: 2, name: "Alex", pNumber: 2, tNumber: 2, hour: "18:30" },
    { id: 3, name: "Michel", pNumber: 2, tNumber: 7, hour: "18:30" },
    { id: 4, name: "Lucas", pNumber: 2, tNumber: 3, hour: "18:30" },
    { id: 5, name: "Otis", pNumber: 2, tNumber: 9, hour: "18:30" },
];

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

const TableMapDinner = (props) => {
    const resDinner = (val) => {
        const container = document.getElementById("form");
        const root = createRoot(container);

        root.render(
            <ResDinner
                service={props.service}
                selectedDate={props.selectedDate}
                table={val}
            />
        );
    };

    const target = () => {
        {
            reservations.map((res) => {
                let getDiv = document.querySelector(".t" + res.tNumber);
                getDiv.className = "tr" + res.tNumber;
            });
        }
    };

    return (
        <div className="is-two-fifths">
            <p className="control has-icons-left" style={textForm}>
                Select a table:
            </p>

            {/*  <div className="contain" style={{ backgroundColor: 'white' }}>
                <div className='t1' ></div>
                <div className='t2' ></div>
                <div className='t3' ></div>
                <div className='t4' ></div>
                <div className='t5' ></div>
                <div className='t6' ></div>
                <div className='t7' ></div>
                <div className='t8' ></div>
                <div className='t9' ></div>
                <div className='t10' ></div>
                <div className='t11' ></div>
                <div className='t12' ></div>
                <div className='t13'></div>
                <div className='t14'></div>
                <div className='t15'></div>
                <div className='t16'></div>
                <div className='t17'></div>
                <div className='t18'></div>
                <div className='t19'></div>
                <div className='t20'></div>
                <div className='t21'></div>
                <div className='t22'></div>
                <div className='t23'></div>
                <div className='t24'></div>
                <div className='t25'></div>
                
            </div> */}
            <div style={mapTable}>
                {tables.map((table) => {
                    if (table.free === "y") {
                        return (
                            <div
                                key={table.id}
                                className={"t" + table.id.toString()}
                                onClick={function () {
                                    const tN = table.id;
                                    resDinner(tN);
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

export default TableMapDinner;

{
    /* <div style={mapTable}>
                {tables.map((table) => {

                    if (table.free === "y") {
                        return (
                            <div key={table.id} className={'t' + table.id.toString()} onClick={function () { const tN = table.id; resDinner(tN) }}>
                            </div>
                        );
                    } else {
                        return (
                            <div key={table.id} className={'tr' + table.id.toString()} onClick={reserved} >
                            </div>
                        );
                    }
                })}
            </div> */
}
