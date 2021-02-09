import Company from '../models/Company';
import CompanyImagesView from './company_image_view';

export default {
  render(company: Company) {
    return {
      id: company.id,
      business: company.business,
      cnpj: company.cnpj,
      name: company.name,
      phone: company.phone,
      email: company.email,
      address: company.address,
      district: company.district,
      city: company.city,
      uf: company.uf,
      password: company.password,
      is_active: company.is_active,
      images: CompanyImagesView.renderMany(company.company_images)
    };
  },

  renderMany(company: Company[]) {
    return company.map(company => this.render(company));
  }
}