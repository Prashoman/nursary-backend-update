import { TProduct } from "./product.interface";
import { Product } from "./product.model";  

 

 const productCreateDB = async (payload: TProduct) => {
    const result = await Product.create(payload);
    return result;
 }

 const productGetDB = async (productId: string | null) => {
    if (productId) {
        const result = await Product.findById(productId);
        return result;
    }
    const result = await Product.find().populate('categoryId');
    return result;
 }

 const productUpdateDB = async (productId: string, payload: Partial<TProduct>) => {
    const result = await Product.findByIdAndUpdate(productId, payload, { new: true });
    return result;
 }

 const productDeleteDB = async (productId: string) => {
    const result = await Product.findByIdAndDelete(productId);
    return result;
 }


export const ProductService = {
    productCreateDB,
    productGetDB,
    productUpdateDB,
    productDeleteDB
}