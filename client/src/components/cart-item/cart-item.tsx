import * as React from "react";

interface ICartItem extends React.Props<any>{
    _id : string;
    name: string;
}

export default class CartItem extends React.Component<ICartItem> {
    render(){
        return(
            <div className="cart-list">
                <div className="cart-list-item-name">
                    {this.props.name}
                </div>
                <div className="cart-list-item-price">
                        
                </div>
            </div>
        )
    }
}
