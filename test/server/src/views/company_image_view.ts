import CompanyImage from '../models/CompanyImage';

export default {
  render(companyImage: CompanyImage) {
    return {
      id: companyImage.id,
      url: `http://192.168.0.7:8080/uploads/${companyImage.path}`,
    };
  },

  renderMany(companyImages: CompanyImage[]) {
    return companyImages.map(companyImage => this.render(companyImage));
  }
}