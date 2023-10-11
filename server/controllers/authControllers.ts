import { Request, Response } from 'express';
import { User } from '../models/User';
import { connect } from '../db/dbConfig';
import bcrypt from 'bcryptjs';
import { generteToken } from '../helper/jwt';

export const registerUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {

        const conn = await connect()

        //verifica la existencia del usuario
        const [data]: any = await conn.query(' SELECT * FROM users WHERE email= ?', [email]);
        const userData: User = data[0]

        if (userData) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese email'
            });
        }

        const newUser: User = req.body;

        // Hashear la contraseña
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(password, salt);

        await conn.query('INSERT INTO users SET ?', [newUser])

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            msg: "Registro exitoso" 
        });
    } catch (error) {
        //console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Solicitud incorrecta'
        });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const conn = await connect()
        const [data]: any = await conn.query(' SELECT * FROM users WHERE email= ?', [email]);
        const userData: User = data[0]

        if (!userData) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        // Confirmar si el password hace match
        const validPassword = bcrypt.compareSync(password, userData.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'El password no es válido'
            });
        }

        // Generar el JWT
        if (userData.id != undefined) {
            const token = await generteToken(userData.id, userData.first_name);

            // Respuesta del servicio
            return res.status(201).json({
                ok: true,
                id: userData.id,
                name: userData.first_name,
                token: token
            })
        }

    } catch (error) {        
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

export const revalidarToken = async (req: Request, res: Response) => {
    const { id, name } = req.body;

    // Generar el JWT
    const token = await generteToken( id, name );

    return res.status(200).json({
        ok: true,
        id, 
        name,
        token
    });

}