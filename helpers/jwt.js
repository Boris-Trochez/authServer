const jwt = require('jsonwebtoken');



const generateJWT = (id, name) => {

    const payload = { id, name }

    return new Promise(( resolve, reject ) => {
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '30min'
        }, ( err, token ) => {
            if( err ) {
                reject( err );
            } else {
                resolve( token );
            }
        });
    })
}




module.exports = {
    generateJWT
}