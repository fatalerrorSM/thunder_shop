import * as React from 'react';
import Header from "../header";
import Content from "../content";
import Footer from "../footer"
import TScontroler from "../../service/t_s";

export default class App extends React.Component{
    tsController = new TScontroler();
    onClickCategory = (id : any) => {
        this.tsController.getItems().then((res : any) => {
            console.log(res);
        })
    }
    
    render(){
        return(
            <div>
                <Header></Header>
                <Content onClickCategory={this.onClickCategory}></Content>
                <Footer></Footer>                
            </div>
        )
    }
};  