import * as React from "react";
import Categorys from "../category";

export default class Content extends React.Component{
    render(){
        return(
            <div className="uk-container">
                <hr></hr>
                <h4>Choose your genre</h4>
                <Categorys/>
            </div>
        )
    }
}