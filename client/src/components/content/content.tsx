import * as React from "react";
import Categories from "../categories";
import ItemsBG from "../items-by-genre";
import ItemPage from "../item-page";
import Cart from "../cart";

import "./content.css";

interface IContent extends React.Props<any> {
  sCategories?: any;
  sItemsByGenre?: any;
  sItemPage?: any;
  sCart?: any;
  viewCategories?: boolean;
  viewItemsByGenre?: boolean;
  viewItemPage?: boolean;
  viewCartPage?: boolean;
  onClickBackToCategories?: any;
  onClickToCart?: any;
  onClickCategory?: any;
  onClickOpenCart?: any;
  onItemClick?: any;
  onClickAddToCart?: any;
  cart?: any;
  onClickDeleteFromCart?: any;
}

export default class Content extends React.Component<IContent> {
  render() {
    // What to render
    const categories = this.props.viewCategories ? (
      <Categories
        sCategories={this.props.sCategories}
        onClickCategory={this.props.onClickCategory}
      />
    ) : null;
    const itemsByGenre = this.props.viewItemsByGenre ? (
      <ItemsBG
        cart={this.props.cart}
        onClickDeleteFromCart={this.props.onClickDeleteFromCart}
        sItemsByGenre={this.props.sItemsByGenre}
        onClickAddToCart={this.props.onClickAddToCart}
        onItemClick={this.props.onItemClick}
      />
    ) : null;
    const itemPage = this.props.viewItemPage ? (
      <ItemPage
        cart={this.props.cart}
        sItemPage={this.props.sItemPage}
        onClickAddToCart={this.props.onClickAddToCart}
        onClickDeleteFromCart={this.props.onClickDeleteFromCart}
        onClickOpenCart={this.props.onClickOpenCart}
        onClickBackToCategories={this.props.onClickBackToCategories}
      />
    ) : null;
    const cartPage = this.props.viewCartPage ? (
      <Cart cart={this.props.cart} sCart={this.props.sCart} />
    ) : null;
    // Common
    const header = this.props.viewCategories ? (
      <p className="choose">Choose your genre</p>
    ) : null;
    const back =
      !this.props.viewCategories && !this.props.viewItemPage ? (
        <a
          className="back"
          onClick={() => this.props.onClickBackToCategories()}
        >
          <span uk-icon="icon: arrow-left; ratio: 1.5" />Back to categories
        </a>
      ) : null;
    const toCart =
      !this.props.viewCategories &&
      !this.props.viewItemPage &&
      !this.props.viewCartPage ? (
        <a
          className="front"
          onClick={() => {
            this.props.onClickOpenCart();
          }}
        >
          To cart <span uk-icon="icon: arrow-right; ratio: 1.5" />
        </a>
      ) : null;

    return (
      <div className="uk-container">
        <hr />
        {header}
        {categories}
        {itemsByGenre}
        {itemPage}
        {cartPage}
        {back} {toCart}
      </div>
    );
  }
}
