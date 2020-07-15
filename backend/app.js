var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    path = require('path'),
    debug = require('debug')('product_management:app'),
jwt = require('./auth')
bcrypt = require('bcrypt'),
mongoose=require('mongoose'),
url = "mongodb://127.0.0.1:27017/mydb";

mongoose.connect(url);
    mongoose.connection.on('connected', function () {
        console.log("Mongoose connected");
      });
      
app.use(bodyParser.json({ limit: '20mb' }))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:4200')
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token")
    res.setHeader('Access-Control-Allow-Methods','POST,GET,PUT,DELETE');
    res.setHeader("Access-Control-Expose-Headers", "token,content-type")
    if(req.method==="OPTIONS"){
        res.sendStatus(200);
    }
    else if (jwt.isTokenRequired(req.method, req.url)) {
        if (!req.headers.token) {
            var err = new Error('Authentication required');
            next(err)
        }
        else {
            isValid = jwt.verify(req.headers.token)
            console.log('is valid ',isValid)
            if (!isValid) {
                var err = new Error('Invalid token');
                // next(err)
                res.sendStatus(401)
            }
            else{
                next()
            }
        }
    }
    else{
        next()
    }
})

var filename;
function getRoutes(currentDirPath,callback) {
   var results=[];
   fs.readdirSync(currentDirPath).forEach(function (name) {
       var filePath = path.join(currentDirPath, name);
       var stat = fs.statSync(filePath);
       if (stat.isFile()) {
            filename = filePath.split("/").slice(-1).join().split(".").shift();
            results.push({filePath:filePath,name:name});
            callback(results);
       } else if (stat.isDirectory()) {
           getRoutes(filePath, callback);
       }
   });
 return results;
}

getRoutes('./routes', function(routes) {
 routes.forEach(function(routerFileName) {
     var routes = routerFileName.filePath.split(routerFileName.name);
     var filepath = routes[0].split('routes/');
     var filename = routerFileName.name.split(".").shift();
     var routerPath = './'+routes[0]+filename;
     if(filepath[1].length>0) {
       filename = "/"+filepath[1]+filename;
     } else {
       filename = "/"+filename;
     }
     app.use(filename,require(routerPath));
  });
});


app.use(function(req, res, next) {
  console.log('................------------',req.path)
  debug("404 Error - " + req.path);
  var err = new Error('Not Found');
  err.status = 404;
  // Website you wish to allow to connect
  

  next(err);
});



module.exports = app
