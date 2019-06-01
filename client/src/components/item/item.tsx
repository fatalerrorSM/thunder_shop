import * as React from "react";
import "./item.css";

interface IItems extends React.Props<any> {
  name: string;
  price: string;
  discount: string;
  image: string;
}

export default class Item extends React.Component<IItems> {
  render() {
    console.log(this.props);
    const discount = this.props.discount ? (
      <span className="discount">{this.props.discount}%</span>
    ) : null;
    const discount_price = this.props.discount ? (
      <span className="price">({this.props.price})</span>
    ) : null;
    const price =
      parseFloat(this.props.price) -
      (parseFloat(this.props.price) * parseFloat(this.props.discount)) / 100;

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
              <span className="real-price">Price: {price}$</span> {discount_price}
              {discount}
            </div>
            <hr/>
            <div className="controll-panel">
              {" "}
              <a href="#" className="details uk-button uk-button-text">Read more</a>
              <a type="button" className="add uk-button uk-button-text">Add to cart</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
