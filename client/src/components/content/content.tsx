import * as React from "react";
import Categorys from "../category";

export default class Content extends React.Component{
    render(){
        return(
            <div className="uk-container">
                <hr></hr>
                <p className="uk-text-large">Choose your genre</p>
                <Categorys/>
            </div>
        )
    }
}