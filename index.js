var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine' , 'ejs' );

PORT = process.env.PORT || process.argv[2] || 8080 ;

app.get ( '/' , (req,res)=>{
    res.render ( 'index.ejs' , {PORT : PORT} );
});

io.on('connection' , (socket)=>{
    console.log ( "Client connected " , socket.id );
    socket.on ( 'message' , (msg)=>{
        console.log ( "CLIENT : " , msg );
        
    });
})

http.listen( PORT, ()=> {console.log("Server up at : " , PORT );});

console.log ( ' LOG : Server initialized ')