import { API_URL, productsApi } from "@/core/api/productsApi";
import { Gender, type Product } from "../interfaces/product.interface";

const emptyProduct: Product = {
    id: " ",
    title: "Nuevo producto",
    description: " ",
    price: 0,
    images: [],
    slug: " ",
    stock: 0,
    sizes: [],
    gender: Gender.Men,
    tags: [],
    
}

export const getProductById = async (id: string): Promise<Product> => {
    if (id === "new") return emptyProduct;
    try {
        const { data } = await productsApi.get<Product>(`/products/${id}`);
        return {
            ...data,
            images: data.images.map(
                image => `${API_URL}/files/product/${image}`
            )

        };

    } catch (error) {
        console.error('Error', error);
        throw new Error('Error fetching product by ID');

    }

}