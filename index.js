const   express = require('express');
const cors = require('cors');
const path = require('path')
const { dbConnection } = require('./db/config');
require('dotenv').config();

//create the server/app of express
const app = express();

//DB connection
dbConnection();

//Public directory
app.use(express.static('public'));

//CORS middleware
app.use( cors() );

//Body Read and Parse
app.use( express.json() );

//create Routes       use -> it is a middleware that is going to be executed when the interpreter is evaluating the code
app.use('/api/auth', require('./routes/auth'));

/* Handle the rest of the routes --> when integrate the Angular app with Nodejs, the routes worked in Angular
 don't exits in the backend, so express is going to try to look for that obtaining an error.
 to Solve that situation it is necessary to redirect all the routes to the index inside de public folder 
 where the Angular app is kept. that way Angular is going to have the control of routes already 
 implemented with it*/
 app.use('*', ( req, res ) => {
     res.sendFile( path.resolve(__dirname, 'public/index.html') );
 });

app.listen(process.env.PORT, () => {
    console.log(`Listening by port: ${ process.env.PORT }...`);
});