import { Request, Response } from "express";
import { order as Order } from "../models/Order";

export const createOrder = async (req: Request, res: Response) => {
    try {
        const payload = req.body;

        if (!payload.products || payload.products.length === 0) {
            return res.status(400).json({ error: "La orden debe contener al menos un producto" });
        }

        const newOrder = new Order();

        Object.assign(newOrder, payload);

        // Calcular subtotal y total
        let subtotal = 0;
        for (const item of newOrder.products) {
            subtotal += item.price * item.quantity;
        }

        newOrder.subtotal = subtotal;
        newOrder.total = subtotal;
        newOrder.createDate = new Date();
        newOrder.updateDate = new Date();

        await newOrder.save();

        return res.status(201).json({ message: "Orden creada con éxito", order: newOrder });
    } catch (error) {
        console.error("Error al crear orden:", error);
        return res.status(500).json({ error: "Error al crear la orden" });
    }
};


//update order 
export const updateOrderStatusToPaid = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { status: "pagado", updateDate: new Date() },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        return res.json({ message: "Orden marcada como pagada", updatedOrder });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar orden", error });
    }
};


//delete order (cancelado)
export const cancelOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const canceledOrder = await Order.findByIdAndUpdate(
            id,
            { status: "cancelado", updateDate: new Date() },
            { new: true }
        );

        if (!canceledOrder) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        return res.json({ message: "Orden cancelada", canceledOrder });
    } catch (error) {
        return res.status(500).json({ message: "Error al cancelar orden", error });
    }
};


//ver todas las ordenes
export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const query = {}; // Si después quieres filtrar por usuario, puedes usar { idUser: ... }

        const orders = await Order.find(query)
            .populate('idUser')
            .populate('products.productId'); // Muy importante

        return res.status(200).json({ orders });
    } catch (error) {
        console.error("Error al obtener órdenes:", error);
        return res.status(500).json({
            message: "Error al obtener las órdenes",
            error: error instanceof Error ? error.message : error
        });
    }
};
