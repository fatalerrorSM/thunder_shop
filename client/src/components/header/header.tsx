import * as React from "react";

import "./header.css";

interface IHeader extends React.Props<any> {
  cart_length: number;
  onClickOpenCart: any;
}

export default class Header extends React.Component<IHeader> {
  render() {
    const { cart_length } = this.props;
    return (
      <div className="uk-container">
        <nav className="uk-background-default" uk-navbar="true">
          <div className="uk-navbar-left">
            <ul className="uk-navbar-nav">
              <li className="">
                <a href="#">
                  <span uk-icon="home" />Home
                </a>
              </li>
              <li>
                <a href="#">Products</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
              <li />
            </ul>
          </div>
          <div className="uk-navbar-center">
            <span className="uk-navbar-item uk-logo">
              Thunder <span uk-icon="bolt" /> Shop
            </span>
          </div>
          <div className="uk-navbar-right">
            <ul className="uk-navbar-nav">
              <li className="uk-navbar-item">
                <a onClick={() => this.props.onClickOpenCart()}>
                  <span uk-icon="cart" /> Cart{" "}
                  <span className="uk-badge">{cart_length}</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
