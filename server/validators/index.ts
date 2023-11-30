import { body } from 'express-validator';

class UserValidator {
  checkAddUser() {
    return [
      body('login').notEmpty().withMessage('The login can not be empty'),
      body('password').notEmpty().withMessage('The password can not be empty'),
    ];
  }
}

export default new UserValidator();
