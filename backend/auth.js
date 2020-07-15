var jwt = require('jsonwebtoken')

var secretKey = "keyForMeanCrudApp"
var validity = 60 * 60;

const authRoutes = [{ path: '/products/all', method: 'GET' }];

var encode =  function(payload) {
    return jwt.sign({
        data: payload
      }, secretKey, { expiresIn: validity })
}

var verify = function(token){
    var isValid = jwt.verify(token,secretKey,(err)=>{
        if(err){
            return false
        }
        else{
            return true
        }
    })
    return isValid
}

var isTokenRequired = function(httpMethod, url){
    if(url.indexOf('register')>=0 || url.indexOf('login')>=0){
        return false
    }
    return true
    // for(var i=0;i<authRoutes.length;i++){
    //     if(authRoutes[i].method == httpMethod && authRoutes[i].path == url){
    //         return true
    //     }
    // }
    // return false
}

var jwtService = {
    encode : encode,
    verify : verify,
    isTokenRequired : isTokenRequired
}

module.exports = jwtService