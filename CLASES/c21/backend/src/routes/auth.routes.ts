import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { loginSchema, registerSchema } from '../validations/auth.validation';
import { validate } from '../middlewares/validation.middleware';

const router = Router();

router.post('/login',    validate(loginSchema),    authController.login);
router.post('/register', validate(registerSchema), authController.register);

export default router;
