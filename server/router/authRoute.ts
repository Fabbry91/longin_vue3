import { Router } from "express";
import { check } from "express-validator";
import { loginUser, registerUser, revalidarToken,  } from "../controllers/authControllers";
import { validarJWT } from "../middlewares/validate-jwt";
import { validarCampos } from "../middlewares/validation";

const router = Router();

router.post('/register', [
    check('first_name', 'El nombre es obligatorio').not().isEmpty(),
    check('last_name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({ min: 6 }),
    validarCampos
], registerUser);

router.post('/login',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').isLength({ min: 6 }),
    validarCampos
], loginUser);

router.post('/renew', validarJWT , revalidarToken);

export default router;