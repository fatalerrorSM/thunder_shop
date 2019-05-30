import ky from "ky";

class TScontorller {
  _baseApi = "http://localhost:5000";

  getRes = async (url: string) => {
    const res = await ky(url).json();
    return res;
  };

  getItemsByGenre = async (genreID: string) => {
    const res: any = await this.getRes(
      `${this._baseApi}/items-by-genre/${genreID}`
    );
    return res.map(this._transformItems);
  };

  getItem = async (id: string) => {
    const res: any = await this.getRes(`${this._baseApi}/items/${id}`);
    return res;
  };

  _transformItems = (item: any) => {
    return {
      id: item._id,
      name: item.name,
      price: item.price,
      discount: item.discount
    };
  };

//   _transformItem = (item: any) => {
//     return {
//       id: item._id,
//       name: item.name,
//       price: item.price,
//       discount: item.discount,
//       releaseDate: item.release_date,
//       activation: item.activation,
//       publisher: item.publisher,
//       language: item.language,
//       genreID: item.genre,
//       ageRating: item.age_rating,
//       os: item.OS,
//       image: item.image,
//       description: item.description,
//       specs: {
//         min: {
//           os: item.specification.minimal.os,
//           processor: item.specification.minimal.processor,
//           ram: item.specification.minimal.RAM,
//           gpu: item.specification.minimal.GPU,
//           disk_space: item.specification.minimal.disk_space
//         },
//         max: {
//           os: item.specification.maximal.os,
//           processor: item.specification.maximal.processor,
//           ram: item.specification.maximal.RAM,
//           gpu: item.specification.maximal.GPU,
//           disk_space: item.specification.maximal.disk_space
//         }
//       }
//     };
//   };

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
