import ky from "ky";

class TScontorller {
  _baseApi = "http://localhost:5000";

  getRes = async (url: string) => {
    const res = await ky(url).json();
    return res;
  };

  getItemsByGenre = async (genreID: string) => {
    const res: any = await this.getRes(
      `${this._baseApi}/item-by-genre/${genreID}`
    );
    return res.map(this._transformItems);
  };

  getItem = async (id: string) => {
    const res: any = await this.getRes(`${this._baseApi}/item/${id}`);
    return res;
  };

  _transformItems = (item: any) => {
    return {
      id: item._id,
      name: item.name,
      price: item.price,
      discount: item.discount,
      image: item.image
    };
  };

  getCategories = async () => {
    const res: any = await this.getRes(`${this._baseApi}/categories`);
    return res.map(this._transformCategory);
  };

  getCategory = async (id: string) => {
    const res: any = await this.getRes(`${this._baseApi}/categories/${id}`);
    return res;
  };

  _transformCategory(category: any) {
    return {
      id: category._id,
      name: category.name,
      image: category.image
    };
  }
}

export default TScontorller;
