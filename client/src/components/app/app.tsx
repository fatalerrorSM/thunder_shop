import * as React from "react";
import Header from "../header";
import Content from "../content";
import Footer from "../footer";
import Spinner from "../spinner";
import TScontroler from "../../service/t_s";
import { any } from "prop-types";

export default class App extends React.Component {
  tsController = new TScontroler();

  componentWillMount() {
    this.loadCategories();
  }

  state = {
    categoriesView: true,
    itemsView: false,
    itemsByGenreView: false,
    itemPageView: false,
    sCategories: [],
    sItemsByGenre: [],
    sItemPage: [],
    loading: true
  };

  onClickCategory = (id: any) => {
    this.setState({ loading: true });
    this.tsController.getItemsByGenre(id).then((res: any) => {
      this.setState({
        sItemsByGenre: res,
        categoriesView: false,
        itemsByGenreView: true,
        loading: false
      });
    });
  };

  onClickBackToCategories = () => {
    this.setState({
      itemsByGenreView: false,
      categoriesView: true
    });
  };

  onItemClick = (id: any) => {
    this.setState({ loading: true });
    this.tsController.getItem(id).then((res: any) => {
      this.setState({
        sItemPage: res,
        itemsByGenreView: false,
        itemPageView: true,
        loading: false
      });
    });
  };

  loadCategories = () =>
    this.tsController.getCategories().then((result: any) => {
      this.setState({ sCategories: result, loading: false });
    });

  render() {
    const spinner = this.state.loading ? <Spinner /> : null;
    const contentGenres =
      !this.state.loading && this.state.categoriesView ? (
        <Content
          sCategories={this.state.sCategories}
          viewCategories={this.state.categoriesView}
          onClickCategory={this.onClickCategory}
        />
      ) : null;
    const contentItemsByGenre =
      !this.state.loading && this.state.itemsByGenreView ? (
        <Content
          sItemsByGenre={this.state.sItemsByGenre}
          viewItemsByGenre={this.state.itemsByGenreView}
          onClickBackToCategories={this.onClickBackToCategories}
          onItemClick={this.onItemClick}
        />
      ) : null;
    const contentItemPage =
      !this.state.loading && this.state.itemPageView ? (
        <Content sItemPage={this.state.sItemPage} viewItemPage={this.state.itemPageView} />
      ) : null;

    return (
      <div>
        <Header />
        {spinner}
        {contentGenres}
        {contentItemsByGenre}
        {contentItemPage}
        <Footer />
      </div>
    );
  }
}
