import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const productCreateDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const productGetDB = async (
  productId: string,
  payload: Record<string, unknown>
) => {
  const baseQuery = { ...payload };
  const deleteQuery = ["searchTerm", "sort", "page", "limit"];
  deleteQuery.forEach((element) => {
    delete baseQuery[element];
  });
  let searchQuery:string  = "";
  let lowPriceQuery = 0;
  let highPriceQuery = 10000000;
  if (baseQuery.lowPrice) {
    lowPriceQuery = Number(baseQuery.lowPrice);
  }
  if (baseQuery.highPrice) {
    highPriceQuery = Number(baseQuery.highPrice);
  }
  if (payload.lowPrice) {
    lowPriceQuery = Number(payload.lowPrice);
  }
  if (payload.highPrice) {
    highPriceQuery = Number(payload.highPrice);
  }
  if (productId) {
    const result = await Product.findById(productId);
    return result;
  }
  if (payload.searchTerm) {
    searchQuery = payload.searchTerm as string;
  }

  let sortQuery = "-createdAt";
  if (payload.sort) {
    sortQuery = payload.sort as string;
  }

  let limit = Number(payload.limit) || 1000;
  let page = Number(payload.page) || 1;
  const skip = (page - 1) * limit;

  let searchFields = ["title"];

  const searchingProduct = Product.find({
    // se : { $regex: new RegExp(searchQuery as string, "i") },
    $or: searchFields.map((field) => ({
      [field]: { $regex: new RegExp(searchQuery as string, "i") },
    })),
  });

  const filterPriceProduct = searchingProduct.find({
    $and: [
      { price: { $gte: lowPriceQuery } },
      { price: { $lte: highPriceQuery } },
    ],
  });

  const sortProduct = filterPriceProduct.sort(sortQuery);

  const result = await sortProduct
    .skip(skip)
    .limit(limit)
    .populate("categoryId");
  return result;
};

const productUpdateDB = async (
  productId: string,
  payload: Partial<TProduct>
) => {
  const result = await Product.findByIdAndUpdate(productId, payload, {
    new: true,
  });
  return result;
};

const productDeleteDB = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  return result;
};

export const ProductService = {
  productCreateDB,
  productGetDB,
  productUpdateDB,
  productDeleteDB,
};
