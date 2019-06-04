import * as React from "react";
import CartItem from "../cart-item";

interface ItemCart{
  _id : string;
  name: string;
  price : string;
  discount : number;
}

interface ICart extends React.Props<any> {
  cart: any;
  sCart : any;
}

export default class Cart extends React.Component<ICart> {
  createCartList = (res : any) => {
    return res.map((itemCart : ItemCart) => {
      console.log(itemCart._id);
      return (
        <div key={itemCart._id}>
          <CartItem _id={itemCart._id} name={itemCart.name}/>
        </div>
      )
    })
  };

  render() {
    const cartList = this.createCartList(this.props.sCart);
    return (
      <div>
        <h1>CartCart</h1>
        {cartList}
      </div>
    );
  }
}
