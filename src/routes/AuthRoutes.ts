import express from 'express';

import { AuthController } from '../controllers/AuthController';
import validate from '../middlewares/validate';
import { loginSchema, registerSchema } from '../validations/authValidation';

class AuthRoutes {
  static configureRoutes() {
    const router = express.Router();
    const authController = new AuthController();

    router.post('/register', [validate(registerSchema)], authController.register);
    router.post('/login', [validate(loginSchema)], authController.login);

    return router;
  }
}

export { AuthRoutes };
