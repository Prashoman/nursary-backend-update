import { Request, Response } from "express";
import { ProductService } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const productInfo = await ProductService.productCreateDB(product);
    res.status(201).json({
      message: "Product created successfully",
      data: productInfo,
    });
  } catch (err: any) {
    throw new Error(err);
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const product = await ProductService.productGetDB(productId);
    res.status(200).json({
      message: "Product fetched successfully",
      data: product,
    });
  } catch (err: any) {
    throw new Error(err);
  }
};

const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = req.body;
        const productId = req.params.productId;
        const productInfo = await ProductService.productUpdateDB(productId, product);
        res.status(200).json({
            message: "Product updated successfully",
            data: productInfo
        })
    } catch (err:any) {
        throw new Error(err);
        
    }
}

const productDelete = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        const product = await ProductService.productDeleteDB(productId);
        res.status(200).json({
            message: "Product deleted successfully",
            data: []
        })
    } catch (err:any) {
        throw new Error(err);
    }
}

export const ProductController = {
  createProduct,
  getProducts,
  updateProduct,
  productDelete
};
