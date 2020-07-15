var app = require('./app')
var http = require('http')
var server = http.createServer(app)
var port = '3000'
app.set('port',port)


server.listen(port)

server.on('listening',()=>{
    console.log('Listening on port ',port)
})

server.on('error',(err)=>{
    console.log('Error ',err);
    
})