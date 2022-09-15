import React from 'react';

const footer = {
    padding: "10px",
    fontFamily: "Poppins, cursive",
    color: "#ffffff",
    textDecoration: "none",
    /* fontSize: 20 */
}

const Footer = () => {
    return (
        <footer>
            <div className="content has-text-centered has-background-success" style={ footer }>
                <p>
                    &copy;<b>&nbsp;Italian restaurant booking app</b> by <a href="www.google.com">ND booking</a>. The booking app solution.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
