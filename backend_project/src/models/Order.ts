// import { Document, model, Schema, Types } from "mongoose";

// // Interfaz para un producto dentro de la orden
// export interface IDorderProduct {
//     productId: Types.ObjectId;
//     quantity: number;
//     price: number;
// }

// // Interfaz de la orden completa (para el modelo de Mongoose)
// export interface Order extends Document {
//     idUser: Types.ObjectId;
//     createDate: Date;
//     status: string;
//     updateDate: Date;
//     subtotal: number;
//     total: number;
//     products: IDorderProduct[];
// }

// // Otra interfaz (si la usas aparte, es muy similar a Order)
// export interface IDorder extends Document {
//     _id: Types.ObjectId;
//     userId: string;
//     total: number;
//     subtotal: number;
//     status: string;
//     createDate: Date;
//     updateDate: Date;
//     products: IDorderProduct[];
// }

// // Esquema para los productos dentro de una orden
// const orderProductSchema = new Schema<IDorderProduct>({
//     productId: {
//         type: Schema.Types.ObjectId,
//         ref: 'Product',
//         required: true
//     },
//     quantity: {
//         type: Number,
//         required: true,
//         min: 1
//     },
//     price: {
//         type: Number,
//         required: true,
//         min: 0
//     }
// }, { _id: false }); // Para que no cree un _id por cada producto

// // Esquema de la orden
// const orderSchema = new Schema<Order>({
//     idUser: {
//         type: Schema.Types.ObjectId,
//         ref: 'User', // referencia a User
//         required: true
//     },
//     createDate: {
//         type: Date,
//         default: Date.now
//     },
//     status: {
//         type: String,
//         required: true
//     },
//     updateDate: {
//         type: Date
//     },
//     subtotal: {
//         type: Number,
//         required: true
//     },
//     total: {
//         type: Number,
//         required: true
//     },
//     products: {
//         type: [orderProductSchema],
//         required: true,
//         validate: [(array: any[]) => array.length > 0, 'Debe contener al menos un producto']
//     }

// });

// export const order = model<Order>('Order', orderSchema, 'order');
import { Document, model, Schema, Types } from "mongoose";


export interface IDorderProduct {
    productId: Types.ObjectId;
    quantity: number;
    price: number;
}

// Orden completa
export interface IOrder extends Document {
    idUser: Types.ObjectId;
    createDate: Date;
    status: string;
    updateDate?: Date;
    subtotal: number;
    total: number;
    products: IDorderProduct[];
}

const orderProductSchema = new Schema<IDorderProduct>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    }
}, { _id: false });

const orderSchema = new Schema<IOrder>({
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true
    },
    updateDate: {
        type: Date,
        default: Date.now
    },
    subtotal: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    products: {
        type: [orderProductSchema],
        required: true,
        validate: [(arr: any[]) => arr.length > 0, 'Debe contener al menos un producto']
    }
});

export const order = model<IOrder>('Order', orderSchema, 'order');
