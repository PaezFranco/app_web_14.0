import { Request, Response } from "express";
import { product as Product } from "../models/Product";

// Crear producto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, qty, price } = req.body;

    const newProduct = new Product({
      name,
      description,
      qty,
      price,
      status: true,
      createDate: new Date()
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error al crear producto", error });
  }
};

// Obtener todos los productos
export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

// Obtener producto por ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const prod = await Product.findById(id);

    if (!prod) return res.status(404).json({ message: "Producto no encontrado" });

    res.json(prod);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar producto", error });
  }
};

// Actualizar producto (PUT)
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) return res.status(404).json({ message: "Producto no encontrado" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar producto", error });
  }
};

// Eliminar producto (cambiar status a false y guardar deleteDate)
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndUpdate(id, {
      status: false,
      deleteDate: new Date()
    }, { new: true });

    if (!deleted) return res.status(404).json({ message: "Producto no encontrado" });

    res.json({ message: "Producto eliminado (status=false)", product: deleted });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar producto", error });
  }
};
