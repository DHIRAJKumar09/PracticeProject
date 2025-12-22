import React from "react";
import {Link} from "react-router-dom";
import '../Style/Navbar.css';

const Navbar=()=>{
    return(
        <nav>
            <Link to="/">Home</Link>
            <Link to="/login">login</Link>
            <Link to="/register">Register</Link>
        </nav>
    );
};
export default Navbar;
