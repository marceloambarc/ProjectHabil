import Product from '../models/Product';
import ImagesView from './images_views';

export default {
    render(product: Product) {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            date: product.date,
            company_id: product.company_id,
            images: ImagesView.renderMany(product.images),
        };
    },

    renderMany(product: Product[]) {
        return product.map(product => this.render(product));
    }
}