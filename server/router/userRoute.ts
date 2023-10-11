import { Router } from "express";
import { deleteUser, getAllUsers, getOneUser, putUser } from "../controllers/userControllers";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validation";

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getOneUser);
//router.post('/new', postUser);
router.patch('/:id',[
    check('first_name', 'El nombre es obligatorio').not().isEmpty(),
    check('last_name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
], putUser);
router.delete('/:id', deleteUser);

export default router;