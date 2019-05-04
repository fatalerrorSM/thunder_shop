import * as React from 'react';


export default class App extends React.Component{
    state = {
        id : 0
    }
    obj = fetch('/admin').then(res => {
        res.json().then(data => {
            this.setState({id : data.id});
        })
    });
    increment = () =>{
        this.setState({
            id : (this.state.id + 1)
        })
    }
    render(){
        const {id} = this.state
        return(
            <div>
                <p>Hello {id}</p>
                <button onClick={()=>this.increment()}></button>
            </div>
        )
    }
};