const  Mongoose  = require("mongoose");

const dbConnection = async () => {
    try {
        
        await Mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log("DB connected");

    } catch (error) {
        console.log( error );
        throw new Error('DB failed connection');
    }
}

module.exports = {
    dbConnection
}