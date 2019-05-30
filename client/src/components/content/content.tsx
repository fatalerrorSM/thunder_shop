import * as React from "react";
import Categories from "../categories";

interface IContent extends React.Props<any>{
    onClickCategory : any;
}

export default class Content extends React.Component<IContent>{
    render(){
        return(
            <div className="uk-container">
                <hr></hr>
                <p className="uk-text-large">Choose your genre</p>
                <Categories onClickCategory={this.props.onClickCategory}/>
            </div>
        )
    }
}