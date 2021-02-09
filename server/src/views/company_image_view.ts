import CompanyImage from '../models/CompanyImage';

export default {
  render(company_image: CompanyImage) {
    return {
      id: company_image.id,
      url: `http://192.168.15.58:8080/uploads/${company_image.path}`,
    };
  },

  renderMany(company_images: CompanyImage[]) {
    return company_images.map(company_image => this.render(company_image));
  }
}