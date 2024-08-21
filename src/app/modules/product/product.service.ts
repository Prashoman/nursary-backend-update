import { TProduct } from "./product.interface";
import { Product } from "./product.model";  

 

 const productCreateDB = async (payload: TProduct) => {
    const result = await Product.create(payload);
    return result;
 }

 const productGetDB = async (productId:string,payload:Record<string,unknown>) => {
   const baseQuery = {...payload};
   const deleteQuery = ['searchTerm'];
   deleteQuery.forEach(element => {
      delete baseQuery[element];
   });
      let  searchQuery;
      let lowPriceQuery = 0;	
      let highPriceQuery = 10000000;
      if(baseQuery.lowPrice){
         lowPriceQuery = Number(baseQuery.lowPrice);
      }
      if(baseQuery.highPrice){
         highPriceQuery = Number(baseQuery.highPrice);
      }
      if(payload.lowPrice){
         lowPriceQuery = Number(payload.lowPrice);
      }
      if(payload.highPrice){
         highPriceQuery = Number(payload.highPrice);
      }
    if (productId) {
        const result = await Product.findById(productId);
        return result;
    }
    if(payload.searchTerm){
      searchQuery = payload.searchTerm;
    }
    const searchingProduct =  Product.find(
      {
         title: { $regex: new RegExp(searchQuery as string, 'i') }
      }
    );

    const result = await searchingProduct.find(
      {
         $and: [ {price: {$gte: lowPriceQuery}}, {price: {$lte: highPriceQuery}} ] 
      }
    ).populate('categoryId');
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