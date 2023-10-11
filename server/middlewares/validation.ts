import { Request, Response,NextFunction } from 'express';
const { validationResult } = require('express-validator');


export const validarCampos =  (req: Request, res: Response, next:NextFunction)  => {
    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    // Llama a next() para pasar el control al siguiente middleware
    next();
}