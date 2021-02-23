const { response } = require("express")
const jwt = require('jsonwebtoken');


const validateJWT = ( req, res = response, next ) => {
    const token = req.header('x-token');

    if( !token ) {
        return res.status( 401 ).json({
            ok: false,
            msg: 'Error in token'
        });
    }

    try {
        
        const { id, name} = jwt.verify( token, process.env.SECRET_JWT_SEED ); //If everything is ok then the payload is returned
        req.id = id; 
        req.name = name;
        /* express offers a good feature that we can add or modify properties at the req,
        and objects are passing through reference, so this req is going to be the same received 
        by controller module reValidateToken */

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token'
        });
    }

    //ALL RIGHT!
    next();
}





module.exports = {
    validateJWT
}