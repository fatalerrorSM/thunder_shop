import * as React from "react";
import Item from "../item";

interface IItems extends React.Props<any> {
  sItemsByGenre: any;
  onItemClick?: any;
  onClickAddToCart: any;
  cart: any;
  onClickDeleteFromCart: any;
}

interface IItem {
  id: string;
  name: string;
  price: string;
  discount: string;
  image: string;
}

export default class ItemsBG extends React.Component<IItems> {
  createItems = (res: any) => {
    return res.map((item: IItem) => {
      return (
        <div key={item.id}>
          <Item
            name={item.name}
            cart={this.props.cart}
            id={item.id}
            price={item.price}
            onClickDeleteFromCart={this.props.onClickDeleteFromCart}
            onItemClick={this.props.onItemClick}
            onClickAddToCart={this.props.onClickAddToCart}
            discount={item.discount}
            image={item.image}
          />
        </div>
      );
    });
  };

  render() {
    const itemsBG = this.createItems(this.props.sItemsByGenre);

    return (
      <div
        className="uk-text-center uk-child-width-1-3 uk-grid-match"
        uk-grid="true"
      >
        {itemsBG}
      </div>
    );
  }
}
