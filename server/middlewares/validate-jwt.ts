import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validarJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-token'] as string;

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'error en el token',
    });
  }

  try {
    if(process.env.SECRET_JWT_WORD != undefined){
        const {id,name} = jwt.verify(token, process.env.SECRET_JWT_WORD) as {id: string, name:string}  ;
        req.body.id= id;
        req.body.name= name;
    }
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido',
    });
  }

  // TODO OK!
  next();
};

export { validarJWT };