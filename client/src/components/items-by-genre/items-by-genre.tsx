import * as React from "react";
import Item from "../item";

interface IItems extends React.Props<any>{
    sItemsByGenre : any;
    onItemClick? : any;
}

interface IItem {
    id: string;
    name: string;
    price : string;
    discount : string;
    image: string;
}

export default class ItemsBG extends React.Component<IItems>{
    createItems = (res : any) => {
        return res.map((item: IItem) => {
          return (
            <div key={item.id} onClick={() => this.props.onItemClick(item.id)}>
              <Item name={item.name} price={item.price} discount={item.discount} image={item.image}/>
            </div>
          );
        });
      };
    
    render(){
      const itemsBG = this.createItems(this.props.sItemsByGenre);
    
        return(
            <div className="uk-text-center uk-child-width-1-3 uk-grid-match"
            uk-grid="true">
                {itemsBG}
            </div>
        )
    }
}