var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine' , 'ejs' );

PORT = process.env.PORT || process.argv[2] || 8080 ;

var client_obj = new Map();
var not_matched = new Array();

app.get ( '/' , (req,res)=>{
    res.render ( 'index.ejs' , {PORT : PORT} );
});

function start_comms ( socket_a  , socket_b ){
    socket_a.emit ( 'opp_id' , 'Connection established with : '+socket_b.id );
    socket_b.emit ( 'message' , 'Your ID : ' + socket_b.id );
    socket_b.emit ( 'opp_id' , 'Connection established with : '+socket_a.id );

    socket_a.on ( 'data' , (msg)=>{
        // forward data to other client
        socket_b.emit('data' , msg );
    });
    socket_b.on ( 'data' , (msg)=>{
        // forward data to other client 
        socket_a.emit('data' , msg );
    });

}

function make_connection ( socket ){
    console.log ('Making connections');
    console.log ( 'Current wait list size : ' + not_matched.length );
    if ( not_matched.length >=1 ){
        var random_key = not_matched [ Math.floor(Math.random()*not_matched.length) ];
        not_matched.splice ( not_matched.indexOf(random_key) , 1 );
        start_comms ( client_obj.get(socket.id) , client_obj.get(random_key) );
        console.log ( 'Connections made - starting communication between clients ');
    }
    else{
        console.log ( 'No players available , client added to wait list ');
        not_matched.push(socket.id);
        socket.emit('message' , 'No player yet waiting for connection');
    }
    return;
}

io.on('connection' , (socket)=>{
    console.log ( "Client connected " , socket.id );
    client_obj.set ( socket.id , socket );
    socket.on ( 'message' , (msg) => { 
        console.log ( "CLIENT : " , msg );
        socket.emit ( 'message' , ' Your ID : ' + socket.id );
        make_connection ( socket );
    });
});

http.listen( PORT, ()=> {console.log("Server up at : " , PORT );});

console.log ( ' LOG : Server initialized ')