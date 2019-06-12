import ky from "ky";
import got from "got";

interface IOrder {
  customer_first_name: string;
  customer_last_name: string;
  customer_email_adress: string;
  customer_phone_number: string;
  order_price: number;
  customer_order: any;
}

class TScontorller {
  _baseApi = "http://localhost:5000";

  getRes = async (url: string) => {
    const res = await ky(url).json();
    return res;
  };

  postRes = async (url: string, bodyP: any) => {
    const res: any = ky
      .post(`${url}`, {
        body: JSON.stringify(bodyP),
        headers: {
          "Content-type": "application/json"
        }
      })
      .json();
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

  getCategories = async () => {
    const res: any = await this.getRes(`${this._baseApi}/categories`);
    return res.map(this._transformCategory);
  };

  getCategory = async (id: string) => {
    const res: any = await this.getRes(`${this._baseApi}/categories/${id}`);
    return res;
  };

  createOrder = async (body: IOrder) => {
    const res: any = await this.postRes(`${this._baseApi}/orders`, body);
    return res;
  };

  _transformCategory(category: any) {
    return {
      id: category._id,
      name: category.name,
      image: category.image
    };
  }

  _transformItems = (item: any) => {
    return {
      id: item._id,
      name: item.name,
      price: item.price,
      discount: item.discount,
      image: item.image
    };
  };
}

export default TScontorller;
