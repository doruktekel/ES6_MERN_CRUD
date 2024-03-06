import Product from "../models/productModal.js";
import asyncHandler from "express-async-handler";

const createProduct = asyncHandler(async (req, res) => {
  try {
    const createdProduct = await Product.create(req.body);
    res.status(201).send(createdProduct);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const getProducts = asyncHandler(async (req, res) => {
  try {
    const getAllProducts = await Product.find();
    res.status(200).send(getAllProducts);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const getProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const getProductById = await Product.findById(id);
    if (!getProductById) {
      res.status(404);
      throw new Error(`Product with this id:${id} not fount`);
    }
    res.status(200).send(getProductById);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProductById = await Product.findByIdAndDelete(id);
    if (!deletedProductById) {
      res.status(404);
      throw new Error(`Product with this id:${id} not fount`);
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body);
    if (!updatedProduct) {
      res.status(404);
      throw new Error(`Product with this id:${id} not fount`);
    }
    res.status(200).json({ message: "Product updated successfully " });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});

export { createProduct, getProducts, getProduct, deleteProduct, updateProduct };
