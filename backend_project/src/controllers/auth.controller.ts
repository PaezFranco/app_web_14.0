import { Request, Response } from "express";
import { generateAccessToken } from "../utils/generateTokens";
import NodeCache from "node-cache";
import dayjs from "dayjs";
import { user as User } from "../models/User";
import bcrypt from "bcryptjs";

// Crear instancia de caché (si no la tienes en otro archivo)
const cache = new NodeCache();

export const login = (req: Request, res: Response) => {
    let name: string = "yo";

    const { username, password } = req.body;

    // Credenciales incorrectas
    if (username !== 'Admin' || password !== '123456789') {
        return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const userId = 'abc123';
    const accessToken = generateAccessToken(userId);

    // Guardar token en caché por 15 minutos
    cache.set(userId, accessToken, 60 * 15);

    return res.json({
        message: 'Login ',
        accessToken
    });
};


export const getTime = (req: Request, res: Response)=>{
    const {userId} = req.params;
    const ttl= cache.getTtl(userId);

    if (!ttl) {
        return res.status (404)
        .json({message: "Token no encontrado"})
    }

    const now=Date.now();
    const timeToLifeSeconds = Math.floor((ttl-now)/1000);
    const expTIme = dayjs(ttl).format('HH:mm:ss');

    return res.json({
        timeToLifeSeconds,
        expTIme
    })

}



//Tareaaa end point 

export const updateTIme = (req: Request, res: Response) => {
    const {userId} = req.body;

    const ttl = cache.getTtl(userId);
    if (!ttl) {
        return res.status(404).json({message: 'Token no encontrado o expirado'});
    }

    const nuevaTTLsegundos = 60*10;
    cache.ttl(userId, nuevaTTLsegundos); //Metodo pa actualizar tiempo de vida 

    res.json("Actualizado con exito");
};

export const getAllUser = async (req: Request, res: Response) => {
    const userlist = await User.find()
        // const userlist = await User.find({status:true})

    return res.json({ userlist});
}



//Tarea Endpoint que consulte a un usuario pr medio del username
export const getUserName = async (req:Request,res:Response) => {
    try{
        const { username } = req.params;
        const user = await User.findOne({ username});

        if (!user){
            return res.status(404).json({ message:'Usuario no encontrado'});
        }
        res.json(user);
    }catch (error){
        res.status(500).json({ message:'Error al buscar el usuario', error});
    }
};


export const createUser = async (req:Request,res:Response) => {
    try{
        const{username, password, email,role}=req.body
        const newUser=new User({
            username,
            password,
            role,
            email,
            status: true
        })

        const user=await newUser.save();
        return res.json ({ user });

    }catch(error){
        console.log("Error ocurrido en createUser: ", error);
        return res.status(426).json({error})
    }
}



//controller UPDATE
export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { username, email, role } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { username, email, role },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        return res.json({ message: "Usuario actualizado", updatedUser });
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar usuario", error });
    }
};

//controller DELETE
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndUpdate(
            id,
            { status: false, deleteDate: new Date() },
            { new: true }
        );

        if (!deletedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        return res.json({ message: "Usuario desactivado", deletedUser });
    } catch (error) {
        return res.status(500).json({ message: "Error al eliminar usuario", error });
    }
};
