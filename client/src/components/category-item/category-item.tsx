import * as React from "react";

import "./category-item.css";

interface ICategoryItem extends React.Props<any> {
  name: string;
  image: string;
}

export default class CategoryItem extends React.Component<ICategoryItem> {
  render() {
    return (
      <div className="uk-card uk-card-default uk-card-hover">
        <div className="uk-card-media-top">
          <img src={this.props.image} alt="" />
        </div>
        <div className="uk-card-body">
          <div className="name">{this.props.name}</div>
        </div>
      </div>
    );
  }
}
