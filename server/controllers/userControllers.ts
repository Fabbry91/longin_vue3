import { Request, Response} from 'express'
import {connect} from '../db/dbConfig'
import { User } from '../models/User';

export const getAllUsers = async ( req: Request, res:Response )=>{
    try {
        const conn= await connect(); 
        const data= await conn.query('SELECT * FROM users');
        //extraigo la lista de users del arreglo que viene desde la base
        const [users]:any[]=data;
        //transformo la data amostrar quitando el password 
        const allUser=users.map((u:any)=>{
            const userTemp={
                ...u
            }
            delete userTemp.password 
            return userTemp;
        })
        return res.status(201).json({
            ok: true,
            msg:'users',
            users:allUser
        });
    } catch (error) {
          ////console.log(error);
          return res.status(404).json({
            ok: false,
            msg: 'Not found'
        });
    }
}

export const getOneUser = async( req: Request, res:Response )=>{
    const {id}=req.params;
    try {
    const conn=await connect();

    const data= await conn.query('SELECT * FROM users WHERE id=?', id)
        const [user]:any[]=data;
        return res.status(201).json({
            ok: true,
            msg:'user',
            user:user
        });
    } catch (error) {
         ////console.log(error);
         return res.status(404).json({
            ok: false,
            msg: 'Not found'
        });
    }
}


export const putUser = async( req: Request, res:Response )=>{
    const {id}=req.params;
    const {body}=req;
    try {
        const conn=await connect();
        await conn.query('UPDATE users set ? WHERE id=?', [body, id])
        return res.status(201).json({
            ok: true,
            msg:'Usuario editado',
        });
    } catch (error) {
        return res.status(400).json({
            ok: true,
            msg:'No se edito el usuario',
        });
    }
}

export const deleteUser = async( req: Request, res:Response )=>{
    const {id}=req.params;
    const conn=await connect();
    await conn.query('DELETE FROM users WHERE id=?', [id])
    try {
        return res.status(200).json( {
            msg:`El usuario fue eliminado con exito`,
        })
    } catch (error) {
        return res.status(400).json({
            ok: true,
            msg:'No se pudo eliminar el usuario',
        });
    }
}