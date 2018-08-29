const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
// config = require('./config/DB'),
mysql = require('mysql');

const app = express();

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

const routes = require('./routes/Route');

app.use(bodyParser.json());
app.use(cors());
// const port = process.env.PORT || 4000;
const port = 4000;

app.use('/api/v1', routes);

app.listen(port, function(){
 console.log('Listening on port ' + port);
});