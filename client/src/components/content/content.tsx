import * as React from "react";
import Categories from "../categories";
import ItemsBG from "../items-by-genre";
import ItemPage from "../item-page";

import "./content.css"

interface IContent extends React.Props<any>{
    sCategories? : any;
    sItemsByGenre? : any;
    sItemPage? : any;
    viewCategories? : boolean;
    viewItemsByGenre? : boolean;
    viewItemPage? : boolean;
    onClickBackToCategories? : any;
    onClickToCart? : any;
    onClickCategory? : any;
    onItemClick? : any;
    
}

export default class Content extends React.Component<IContent>{
    render(){
        // What to render
        const categories = this.props.viewCategories ? <Categories sCategories={this.props.sCategories} onClickCategory={this.props.onClickCategory}/> : null;
        const itemsByGenre = this.props.viewItemsByGenre ? <ItemsBG sItemsByGenre={this.props.sItemsByGenre} onItemClick={this.props.onItemClick}/> : null;
        const itemPage = this.props.viewItemPage ? <ItemPage sItemPage={this.props.sItemPage}/> : null;
        // Common
        const header = this.props.viewCategories  ? (<p className="choose">Choose your genre</p>) : null;
        const back = !this.props.viewCategories && !this.props.viewItemPage  ? (<a className="back" onClick={() => this.props.onClickBackToCategories()}><span uk-icon="icon: arrow-left; ratio: 1.5"></span>Back to categories</a>) : null;
        const toCart = !this.props.viewCategories && !this.props.viewItemPage ? (<a className="front" >To cart  <span uk-icon="icon: arrow-right; ratio: 1.5"></span></a>) : null;
        
        return(
            <div className="uk-container">
                <hr></hr>
                {header}
                {categories}
                {itemsByGenre}
                {itemPage}
                {back} {toCart}
            </div>
        )
    }
}