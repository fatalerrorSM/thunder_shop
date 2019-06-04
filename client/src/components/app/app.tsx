import * as React from "react";
import Header from "../header";
import Content from "../content";
import Footer from "../footer";
import Spinner from "../spinner";
import TScontroler from "../../service/t_s";

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
    cartView: false,
    sCategories: [],
    sItemsByGenre: [],
    sItemPage: [],
    inCart: {
      itemId: Array()
    },
    sCart: Array(),
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

  onClickAddToCart = (id: string) => {
    if (this.state.inCart.itemId.indexOf(id) === -1) {
      let tmp = this.state.inCart.itemId;
      tmp.push(id);
      this.setState({ inCart: { itemId: tmp } });
      this.tsController.getItem(id).then((res: any) => {
        let tmpp = this.state.sCart;
        tmpp.push(res);
        this.setState({ sCart: tmpp });
      });
    }
  };

  onClickDeleteFromCart = (id: string) => {
    if (this.state.inCart.itemId.indexOf(id) !== -1) {
      let temp = this.state.inCart.itemId.filter(element => {
        return element !== id;
      });
      this.setState({ inCart: { itemId: temp } });

      let tempp = this.state.sCart.filter(elem => {
        return elem._id !== id;
      });

      this.setState({ sCart: tempp });
    }
  };

  onClickBackToCategories = () => {
    this.setState({
      itemsByGenreView: false,
      itemPageView: false,
      cartView: false,
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

  onClickOpenCart = () => {
    this.setState({
      itemsByGenreView: false,
      itemPageView: false,
      categoriesView: false,
      cartView: true
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
          cart={this.state.inCart}
          sItemsByGenre={this.state.sItemsByGenre}
          viewItemsByGenre={this.state.itemsByGenreView}
          onClickBackToCategories={this.onClickBackToCategories}
          onItemClick={this.onItemClick}
          onClickAddToCart={this.onClickAddToCart}
          onClickDeleteFromCart={this.onClickDeleteFromCart}
          onClickOpenCart={this.onClickOpenCart}
        />
      ) : null;
    const contentItemPage =
      !this.state.loading && this.state.itemPageView ? (
        <Content
          cart={this.state.inCart}
          sItemPage={this.state.sItemPage}
          viewItemPage={this.state.itemPageView}
          onClickBackToCategories={this.onClickBackToCategories}
          onClickAddToCart={this.onClickAddToCart}
          onClickDeleteFromCart={this.onClickDeleteFromCart}
          onClickOpenCart={this.onClickOpenCart}
        />
      ) : null;
    const contentCart =
      !this.state.loading && this.state.cartView ? (
        <Content
          sCart={this.state.sCart}
          cart={this.state.inCart}
          viewCartPage={this.state.cartView}
          onClickBackToCategories={this.onClickBackToCategories}
        />
      ) : null;
    return (
      <div>
        <Header
          cart_length={this.state.inCart.itemId.length}
          onClickOpenCart={this.onClickOpenCart}
        />
        {spinner}
        {contentGenres}
        {contentItemsByGenre}
        {contentItemPage}
        {contentCart}
        <Footer />
      </div>
    );
  }
}
