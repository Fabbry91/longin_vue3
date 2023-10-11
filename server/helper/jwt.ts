import jwt from "jsonwebtoken";

export const  generteToken = (id:string ,name:string)=>{

    //Información a incluir en el token JWT
    const payload = { id, name };
    
    return new Promise( (resolve, reject) => {

        jwt.sign( payload, process.env.SECRET_JWT_WORD || ''  ,  {
            expiresIn: '15min'
        }, (err, token) => {
    
            if ( err ) {
                //no se resuelve la generacion de token
                console.log(err);
                reject(err);
    
            } else {
                 //generado exitosamente
                resolve( token )
            }
    
        })
    });
}