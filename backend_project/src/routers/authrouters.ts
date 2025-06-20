import { Router } from "express";
import { createUser, getAllUser, getTime, getUserName, login, updateTIme } from "../controllers/auth.controller";
import { createOrder } from "../controllers/order.controller";
import { updateUser, deleteUser } from "../controllers/auth.controller";
import { updateOrderStatusToPaid, cancelOrder, getAllOrders } from "../controllers/order.controller";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller";



const router = Router();

router.post('/login-user', login); //ruta de controlador 
router.get('/getTime/:userId', getTime);
router.put('/updateTIme', updateTIme);
router.get('/user', getAllUser);
router.get('/user/:username', getUserName);
router.post('/user', createUser);
router.post('/order', createOrder);
router.put('/user/:id', updateUser);      // Para actualizar usuario
router.delete('/user/:id', deleteUser);   // Para eliminar lógicamente
router.put('/order/pay/:id', updateOrderStatusToPaid); // Actualizar status a pagado
router.delete('/order/cancel/:id', cancelOrder);        // Cancelar orden (status cancelado)
router.get('/order', getAllOrders);


router.post("/product", createProduct);
router.get("/product", getAllProducts);
router.get("/product/:id", getProductById);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);


 export default router; 