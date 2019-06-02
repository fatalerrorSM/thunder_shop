import * as React from "react";

import "./item-page.css";

interface IItemPage extends React.Props<any> {
  sItemPage: any;
  onClickBackToCategories: any;
}

export default class ItemPage extends React.Component<IItemPage> {
  render() {
    const discount = this.props.sItemPage.discount ? (
      <span className="discount">{this.props.sItemPage.discount}%</span>
    ) : null;
    const discount_price = this.props.sItemPage.discount ? (
      <span className="price">({this.props.sItemPage.price})</span>
    ) : null;
    const price =
      parseFloat(this.props.sItemPage.price) -
      (parseFloat(this.props.sItemPage.price) *
        parseFloat(this.props.sItemPage.discount)) /
        100;
    const backToCategories = (
      <a
        className="back-to-categories"
        onClick={() => this.props.onClickBackToCategories()}
      >
        <span uk-icon="icon: arrow-left; ratio: 1.5" />
        Back to categories
      </a>
    );
    const toCart = (
      <a className="to-cart">
        To cart
        <span uk-icon="icon: arrow-right; ratio: 1.5" />
      </a>
    );

    return (
      <div className="uk-container">
        <div className="product-main">
          <div className="product-header">
            <div className="product-name">{this.props.sItemPage.name}</div>
          </div>
          <div className="right-side">
            <img src={this.props.sItemPage.image} alt="" />
          </div>
          <div className="left-side">
            <div className="product-price">
              {price}$<span>{discount_price}</span>
              <span>{discount}</span>
            </div>
            <div className="product-release-date">
              Release Date: {this.props.sItemPage.release_date}
            </div>
            <div className="product-activation">
              Type-Activation: {this.props.sItemPage.activation}
            </div>
            <div className="product-pulisher">
              Game publisher: {this.props.sItemPage.publisher}
            </div>
            <div className="product-language">
              Game language: {this.props.sItemPage.language}
            </div>
            <div className="product-age-rating">
              Age rating: {this.props.sItemPage.age_rating}
            </div>
            <div className="product-os">
              Operation System: {this.props.sItemPage.OS}
            </div>
            <div className="add-to-cart">
              <button className="uk-button uk-button-default">
                <span uk-icon="icon: plus;" /> add to cart
              </button>
            </div>
          </div>

          <div className="product-description">
            <hr className="uk-divider-icon" />
            Description: {this.props.sItemPage.description}
          </div>
          <div className="product-specs">
            <div className="min">
              <ul>
                Minimal Specification:
                <li>
                  Operation System:{" "}
                  {this.props.sItemPage.specification.minimal.os}
                </li>
                <li>
                  Processor(CPU):{" "}
                  {this.props.sItemPage.specification.minimal.processor}
                </li>
                <li>RAM: {this.props.sItemPage.specification.minimal.RAM}</li>
                <li>GPU: {this.props.sItemPage.specification.minimal.GPU}</li>
                <li>
                  Disk space:{" "}
                  {this.props.sItemPage.specification.minimal.disk_space}
                </li>
              </ul>
            </div>
            <hr className="uk-divider-vertical" />
            <div className="max">
              <ul>
                Maximal Specification:
                <li>
                  Operation System:{" "}
                  {this.props.sItemPage.specification.maximal.os}
                </li>
                <li>
                  Processor(CPU):{" "}
                  {this.props.sItemPage.specification.maximal.processor}
                </li>
                <li>RAM: {this.props.sItemPage.specification.maximal.RAM}</li>
                <li>GPU: {this.props.sItemPage.specification.maximal.GPU}</li>
                <li>
                  Disk space:{" "}
                  {this.props.sItemPage.specification.maximal.disk_space}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="panel">
            {backToCategories} {toCart}
        </div>
      </div>
    );
  }
}
