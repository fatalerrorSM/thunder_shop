import * as React from "react";

import "./cart-item.css";

interface ICartItem extends React.Props<any> {
  _id: string;
  name: string;
  price: string;
  discount: number;
  onClickDeleteFromCart: any;
}

export default class CartItem extends React.Component<ICartItem> {
  render() {
    const discount_price = this.props.discount ? (
      <span className="price">({this.props.price})</span>
    ) : null;
    const price =
      parseFloat(this.props.price) -
      (parseFloat(this.props.price) * this.props.discount) / 100;

    return (
      <div className="uk-grid-small" uk-grid="true">
        <div className="uk-width-expand" uk-leader="fill: .">
          {this.props.name}
        </div>
        <div>
          {price}$ {discount_price}
        </div>
        <hr className="divider uk-divider-vertical" />
        <div>
          <button
            className="delete-button uk-button uk-button-default"
            onClick={() => this.props.onClickDeleteFromCart(this.props._id)}
          >
            <span uk-icon="icon: minus-circle; ratio: 1" />
          </button>
        </div>
      </div>
    );
  }
}
