import React,{ useState } from 'react';
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";


export default function Navbar(props) {
  const [mystyle,setMystyle] = useState({
    color:'white',
    backgroundColor:'orange'
  })

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid" style={mystyle}>
          <a className="navbar-brand" href="/" style={mystyle}>{props.title}</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">


              <li className="nav-item">
                <Link className="nav-link" style={mystyle} to="/">Home</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" style={mystyle} to="/about">{props.aboutt}</Link>
              </li>

            </ul>
            
          </div>
        </div>
      </nav>
  );
}

 