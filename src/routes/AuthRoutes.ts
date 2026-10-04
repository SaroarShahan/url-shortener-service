import express from 'express';

import { AuthController } from '~/controllers/AuthController';
import { authLimiter } from '~/middlewares/RateLimiter';
import validate from '~/middlewares/validate';
import { loginSchema, registerSchema } from '~/validations/authValidation';

class AuthRoutes {
  static configureRoutes() {
    const router = express.Router();
    const authController = new AuthController();

    router.post('/register', [authLimiter, validate(registerSchema)], authController.register);
    router.post('/login', [authLimiter, validate(loginSchema)], authController.login);

    return router;
  }
}

export { AuthRoutes };
