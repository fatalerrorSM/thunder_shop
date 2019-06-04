import * as React from "react";
import "./item.css";

interface IItems extends React.Props<any> {
  id: any;
  cart: any;
  name: string;
  price: string;
  discount: string;
  image: string;
  onClickAddToCart: any;
  onItemClick: any;
  onClickDeleteFromCart: any;
}

export default class Item extends React.Component<IItems> {
  render() {
    const discount = this.props.discount ? (
      <span className="discount">{this.props.discount}%</span>
    ) : null;
    const discount_price = this.props.discount ? (
      <span className="price">({this.props.price})</span>
    ) : null;
    const price =
      parseFloat(this.props.price) -
      (parseFloat(this.props.price) * parseFloat(this.props.discount)) / 100;

    const inCart =
      this.props.cart.itemId !== undefined &&
      this.props.cart.itemId.indexOf(this.props.id) === -1
        ? false
        : true;
    const addToCart = !inCart ? (
      <a
        type="button"
        onClick={() => {
          this.props.onClickAddToCart(this.props.id);
        }}
        className="add uk-button uk-button-text"
      >
        Add to cart
      </a>
    ) : null;
    const deleteFromCart = inCart ? (
      <a
        type="button"
        className="add uk-button uk-button-text"
        onClick={() => this.props.onClickDeleteFromCart(this.props.id)}
      >
        Delete from cart
      </a>
    ) : null;
    return (
      <div>
        <div className="uk-card uk-card-default uk-card-hover">
          <div className="uk-card-header">
            <div className="item-name">{this.props.name}</div>
          </div>
          <div className="uk-card-body">
            <img src={this.props.image} alt="" />
          </div>
          <div className="uk-card-footer">
            <div className="price-panel">
              <span className="real-price">Price: {price}$</span>{" "}
              {discount_price}
              {discount}
            </div>
            <hr />
            <div className="controll-panel">
              {" "}
              <a
                onClick={() => this.props.onItemClick(this.props.id)}
                className="details uk-button uk-button-text"
              >
                Read more
              </a>
              {addToCart} {deleteFromCart}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
