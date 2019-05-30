import * as React from "react";
import CategoryItem from "../category-item";
import TScontroler from "../../service/t_s";

interface ICategory {
  id: string;
  name: string;
  image: string;
}

interface ICategoryProps extends React.Props<any>{
  onClickCategory : any;
}

export default class Categories extends React.Component<ICategoryProps>{
  tsController = new TScontroler();

  state = {
    loading: true,
    sCategories: []
  };

  loadCategories = this.tsController.getCategories().then((result: any) => {
    this.setState({ sCategories: result });
  });

  createCategories = (res : any) => {
    return res.map((category: ICategory) => {
      return (
        <div key={category.id} onClick={() => {this.props.onClickCategory(category.id)}}>
          <CategoryItem name={category.name} image={category.image} />
        </div>
      );
    });
  };

  render() {
    const categories = this.createCategories(this.state.sCategories);
    return (
      <div
        className="uk-text-center uk-child-width-1-3 uk-grid-match"
        uk-grid="true"
      >
       {categories}
      </div>
    );
  }
}
