const { validationResult } = require('express-validator');
const { response } = require('express');

const validateFields = (req, res = response, next) => {
    const errors = validationResult( req );

    if(!errors.isEmpty()) {
        return res.json({
            ok: false,
            error: errors.mapped()
        });
    }

    next();
}

module.exports = {
    validateFields
}