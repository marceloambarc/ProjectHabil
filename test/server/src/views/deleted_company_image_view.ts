import DeletedCompanyImage from '../models/DeletedCompanyImage';

export default {
  render(deleted_company_image: DeletedCompanyImage){
      return {
          id: deleted_company_image.id,
          url: `http://192.168.15.58:8080/uploads/${deleted_company_image.path}`,
      };
  },

  renderMany(deleted_company_images: DeletedCompanyImage[]) {
    return deleted_company_images.map(deleted_company_image => this.render(deleted_company_image));
  }
}