import * as React from "react";

import "./item-page.css"

interface IItemPage extends React.Props<any>{
    sItemPage : any;
}

export default class ItemPage extends React.Component<IItemPage>{
    render(){
        console.log(this.props.sItemPage);
        return(
            <div className="uk-container">
                    <img src={this.props.sItemPage.image} alt="" />
                 
                <div className="product-main">
                    <div className="product-name">{this.props.sItemPage.name}</div>
                    <div className="product-price">{this.props.sItemPage.price}<span>{ this.props.sItemPage.discount}</span></div>
                    <div className="product-release-date">{this.props.sItemPage.release_date}</div>
                    <div className="product-activation">{this.props.sItemPage.activation}</div>
                    <div className="product-pulisher">{this.props.sItemPage.publisher}</div>
                    <div className="product-language">{this.props.sItemPage.language}</div>
                    <div className="product-age-rating">{this.props.sItemPage.age_rating}</div>
                    <div className="product-os">{this.props.sItemPage.OS}</div>
                    <div className="product-description">{this.props.sItemPage.description}</div>
                    // need add specification 

                </div>
            </div>
        )
    }
}   