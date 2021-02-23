const { response } = require('express');  //to have the help of VScode using express methods
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');




const createUser = async (req, res = response ) => {

    const { name, email, password } = req.body;

    try {
        
        //Verify email is unique
        const user = await User.findOne({ email }); 

        if( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'User already exits'
            });
        }

        //Create user with model
        const dbUser = await new User( req.body );

        //Hash password
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt );

        //Generate JWT 
        const token = await generateJWT( dbUser.id, name );


        
        //Create user in DB
        dbUser.save();

        //Generate a successful response
        return res.status(201).json({
            ok: true,
            msg: 'User created',
            id: dbUser.id,
            name,
            email,           
            token
        })


    } catch (error) {
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Consult with the technical service'
            });
        
    }

}

const loginUser = async (req, res= response ) => {

    const { email, password } = req.body;
    
    try {
        const dbUser = await User.findOne({ email });
        //confirm exits an email
        if( !dbUser ) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid email or password'
            });
        }
        //confirm password does match
        const validPassword = bcrypt.compareSync( password, dbUser.password );

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid email or password'
            });
        }

        //generate JWT
        const token = await generateJWT( dbUser.id, dbUser.name );

        //Response
        return res.status(201).json({
            ok: true,
            msg: 'user logged',
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            token
        });
        
    } catch (error) {
        
        console.log(error)
        return res.json({
            ok: false,
            msg: 'Consult to technical service'
        });
    }


    


}

const reValidateToken = async (req, res) => {

    const { id, name } = req;
    const dbUser = await User.findById(id); 
    

    const token = await generateJWT(id, name);
    
    return res.json({
        ok: true,
        id,
        name,
        email: dbUser.email,
        token
    });
}






module.exports = {
    createUser,
    loginUser,
    reValidateToken
}