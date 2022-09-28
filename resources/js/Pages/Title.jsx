import React from 'react';

const title = {
    fontFamily: "Dancing Script, cursive",
    color: "#ffffff",
    fontSize: "3rem",
    justifyContent: "center"
}
const textForm = {
    fontFamily: "Poppins, cursive",
    color: "#ffffff",
    fontSize: "1.5rem"
}
// Name of the restaurant
const restoName = "Casa de BeCode"

const Title = () => {
    return (
        <>
            <section className='hero is-small is-success'>
                <div className='hero-body'>
                    <p className='title has-text-centered' style={textForm}>Welcome to the booking page of</p>
                </div>
            </section><br />
            <p className='subtitle has-text-centered' style={title}>{restoName}</p>            
        </>
    );
};

export default Title;
