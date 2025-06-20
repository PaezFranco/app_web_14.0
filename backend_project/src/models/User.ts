const bcrypt = require('bcryptjs');

import mongoose, { Document, model, now, Schema, Types } from "mongoose";

export interface User extends Document {
    id: Types.ObjectId;
    username: string;
    password: string;
    role:string;
    email:string;
    status: boolean;
    createDate: Date;
    deleteDate:Date;
    
}

const userSchema = new Schema<User>({
    username: {
        type:String,
        required:true,
        unique: true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
         type:String,
        required:true,
   
    },
    role:{
        type:String,
        required:true,
    },
    status:{
        type:Boolean,
        default: true
    }, 
    createDate: {
       type: Date,
       default: Date.now
    },
    deleteDate:{
        type:Date
    }
})

userSchema.pre('save', async function (next){
    const user = this as User;

    if (!user.isModified('password')) return next();

    try{
        const salt = await bcrypt.genSalt(10); 
        user.password = await bcrypt.hash(user.password, salt);
    }catch (error){
        next(error as mongoose.CallbackError);
    }
});

export const user=model<User>('User', userSchema, 'user');
