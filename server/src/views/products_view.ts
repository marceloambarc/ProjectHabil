import Product from '../models/Product';
import ImagesView from './images_views';

export default {
    render(product: Product) {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description,
            images: ImagesView.renderMany(product.images)
        };
    },

    renderMany(product: Product[]) {
        return product.map(product => this.render(product));
    }
}