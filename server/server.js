require('dotenv').config();

const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mysql = require('mysql');

import config from './config/config';
import Route from './routes/v1/Route';

const app = express();

const environment = process.env.NODE_ENV; //development
const stage = config[environment];

// app.use(function(req, res, next){
//     global.con = mysql.createConnection({
//       host: 'localhost',
//       user: 'root',
//       password: 'root',
//     });
//     con.connect();
//     next();    
// });

// mongoose.Promise = global.Promise;
// mongoose.connect(config.DB).then(
//   () => {console.log('Database is connected') },
//   err => { console.log('Can not connect to the database'+ err)}
// );


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

if (environment !== 'production') {
    // app.use(logger('dev'));
}

app.use('/api/v1', Route);

app.listen(`${stage.port}`, function(){
 console.log('Listening on port ' + `${stage.port}`);
});