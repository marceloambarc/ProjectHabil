import DeletedCompany from '../models/DeletedCompany';
import DeletedCompanyImagesView from './deleted_company_image_view';

export default{
  render(deleted_company: DeletedCompany) {
    return{
      id: deleted_company.id,
      business: deleted_company.business,
      cnpj: deleted_company.cnpj,
      name: deleted_company.name,
      phone: deleted_company.phone,
      email: deleted_company.email,
      address: deleted_company.address,
      district: deleted_company.district,
      city: deleted_company.city,
      uf: deleted_company.uf,
      password: deleted_company.password,
      is_active: deleted_company.is_active,
      images: DeletedCompanyImagesView.renderMany(deleted_company.deleted_company_images)
    };
  },

  renderMany(deleted_company: DeletedCompany[]){
    return deleted_company.map(deleted_company => this.render(deleted_company));
  }
}