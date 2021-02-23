const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, loginUser, reValidateToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fileds');
const { validateJWT } = require('../middlewares/validate-jwt');




const route = Router();

//create user
route.post('/new', [
    check('name', 'Name is necessary').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'Invalid password').isLength({min: 6}),
    validateFields
], createUser);

//login user
route.post('/', [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Invalid password').isLength({min: 6}),
    validateFields
], loginUser);

//validate and revalidate token
route.get('/renew', validateJWT, reValidateToken);

module.exports = route;