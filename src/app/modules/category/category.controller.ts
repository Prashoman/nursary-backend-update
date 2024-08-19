import { Request, Response } from "express";
import { CategoryService } from "./category.service";


const createCategory = async(req:Request, res:Response)=>{
    try {
        const categoryInfo = req.body;
        const category = await CategoryService.categoryCreate_DB(categoryInfo);
        res.status(201).json({
            message:"Category created successfully",
            data:category
        })
    } catch (err:any) {
        throw new Error(err);
        
    }
    
}

const getCategories = async(req:Request, res:Response)=>{
    try {
        const {categoryId} = req.params;
        const category = await CategoryService.categoryGet_DB(categoryId);
       return res.status(200).json({
            message:"Category fetched successfully",
            data:category
        })
    } catch (err:any) {
        throw new Error(err);
        
    }
}

const updateCategory = async(req:Request, res:Response)=>{
    try {
        const updatedInfo = req.body
        const {categoryId} = req.params;
        const category = await CategoryService.categoryUpdate_DB(categoryId, updatedInfo);
       return res.status(200).json({
            message:"Category updated successfully",
            data:category
        })
    } catch (err:any) {
        throw new Error(err);
    }
}

const categoryDelete = async(req:Request, res:Response)=>{
    try {
        const {categoryId} = req.params;
        const category = await CategoryService.categoryDelete_DB(categoryId);
       return res.status(200).json({
            message:"Category deleted successfully",
            data:[]
        })
    } catch (err:any) {
        throw new Error(err);
    }
}


export const CategoryController ={
    createCategory,
    getCategories,
    updateCategory,
    categoryDelete
}