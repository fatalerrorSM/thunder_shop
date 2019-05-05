import * as React from "react";

import "./header.css";

export default class Header extends React.Component {
  render() {
    return (
    <div className="uk-container">
        
        <nav className="uk-navbar-container" uk-navbar="true">
            <div className="uk-navbar-left">
                <ul className="uk-navbar-nav">
                    <li className="">
                        <a href="#">
                        <span uk-icon="home">
                        </span>Home</a>
                    </li>
                    <li>
                        <a href="#">Products</a>
                    </li>
                    <li><a href="#">About us</a></li>
                    <li>
                        
                    </li>
                </ul>
            </div>
            <div className="uk-navbar-center">
                <span className="uk-navbar-item uk-logo">Thunder <span uk-icon="bolt"/> Shop</span>
            </div>
            <div className="uk-navbar-right">
                <ul className="uk-navbar-nav">
                    <li className="uk-navbar-item">
                        <a href="#"><span uk-icon="cart"/> Cart <span className="uk-badge">4</span></a>
                    </li>
                    <li className="">
                        <a href="#"><span className="fas fa-sign-out-alt"/>Sign In</a>
                    </li>
                    <li className="">
                        <a href="#"><span className="fas fa-sign-out-alt"/>Sign Up</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    );
  }
}
