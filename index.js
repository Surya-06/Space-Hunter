// BUG 1 : LONE CLIENT DISCONNECTION RAISES DISCONNECT EVENT WITH DELAY 

var express = require('express');
var app = express();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

const SOCKET_EVENTS = {
    INIT : 'init',
    INIT_RESPONSE : 'init_response' ,
    NEW_BULLET : 'add_bullet' ,
    PLAYER_POSITION : 'player_position' ,
    MESSAGE : 'message' ,
    CONFIRMATION : 'confirmation', 
    DISCONNECT : 'disconnect' ,
    CONNECTION : 'connection' ,
    BULLET_RESPONSE : 'bullet_response' ,
    GAMEOVER : 'game_over' ,
    FORCE_DISCONNECT : 'force_disconnect'
};


PORT = process.env.PORT || process.argv[2] || 8030 ;

var server = app.listen ( PORT );
var io = require('socket.io').listen(server);

io.origins('*:*');

app.set('view engine' , 'ejs' );


var client_obj = new Map();
var not_matched = new Array();

app.get ( '/' , (req,res)=>{
    res.render ( 'index.ejs' , {PORT : PORT} );
});

function start_comms ( socket_a  , socket_b ){
    console.log ( 'Sending confirmation to players');
    socket_a.emit ( SOCKET_EVENTS.CONFIRMATION , 'Connection established with : '+socket_b.id );
    socket_b.emit ( SOCKET_EVENTS.MESSAGE , 'Your ID : ' + socket_b.id );
    socket_b.emit ( SOCKET_EVENTS.CONFIRMATION , 'Connection established with : '+socket_a.id );

    socket_a.on ( SOCKET_EVENTS.PLAYER_POSITION , (msg)=>{
        // forward player location to other client
        if ( msg != null )
            console.log ( "MSG CLIENT_A : " , msg );
        socket_b.emit(SOCKET_EVENTS.PLAYER_POSITION , msg );
    });

    socket_b.on ( SOCKET_EVENTS.PLAYER_POSITION , (msg)=>{
        // forward player location to other client
        if ( msg != null ) 
            console.log ( "MSG CLIENT_B: " , msg );
        socket_a.emit(SOCKET_EVENTS.PLAYER_POSITION , msg );
    });

    socket_a.on ( SOCKET_EVENTS.NEW_BULLET , (msg) => {
        console.log ( 'New bullet being sent');
        socket_b.emit ( SOCKET_EVENTS.BULLET_RESPONSE , msg );
    });

    socket_b.on ( SOCKET_EVENTS.NEW_BULLET , (msg) => {
        console.log ( 'New bullet being sent');
        socket_a.emit ( SOCKET_EVENTS.BULLET_RESPONSE , msg );
    });

    socket_a.on ( SOCKET_EVENTS.GAMEOVER , (msg) => {
        socket_b.emit ( SOCKET_EVENTS.GAMEOVER , '' );
    });

    socket_b.on ( SOCKET_EVENTS.GAMEOVER , (msg) => {
        socket_a.emit ( SOCKET_EVENTS.GAMEOVER , '' );
    });

    socket_a.on ( SOCKET_EVENTS.DISCONNECT , (res)=>{
        console.log ( "DISCONNECT : CLIENT_A DISCONNECTED ");
        socket_b.emit ( SOCKET_EVENTS.FORCE_DISCONNECT , '' );
        socket_b.disconnect();
        client_obj.delete ( socket_a.id );
        client_obj.delete ( socket_b.id );
        console.log ( 'CLIENT SOCKETS DELETED');
    });
    
    socket_b.on ( SOCKET_EVENTS.DISCONNECT , (res)=>{
        console.log ( "DISCONNECT : CLIENT_B DISCONNECTED ");
        socket_a.emit ( SOCKET_EVENTS.FORCE_DISCONNECT , '' );
        socket_a.disconnect();
        client_obj.delete( socket_a.id );
        client_obj.delete( socket_b.id );
        console.log ( 'CLIENT SOCKETS DELETED');
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
        
        
        // HANDLE DISCONNECT EVENTS WHEN NOT MATCHED WITH ANY OTHER PLAYER
        console.log ( 'Registering disconnect handler for lone players ') ;
        socket.on ( SOCKET_EVENTS.DISCONNECT , (res) => {
            client_obj.delete ( socket.id );
            not_matched.splice ( not_matched.indexOf(socket.id) , 1 );
            console.log ( "Deleting lone object from list of entries" );
        });

        
    }
    return;
}

io.on( SOCKET_EVENTS.CONNECTION , (socket)=>{
    console.log ( "Client connected " , socket.id );
    client_obj.set ( socket.id , socket );
    socket.on ( SOCKET_EVENTS.INIT , (msg) => { 
        console.log ( "CLIENT : " , msg );
        socket.emit ( SOCKET_EVENTS.INIT_RESPONSE , ' Your ID : ' + socket.id );
        make_connection ( socket );
    });
});

console.log ( ' LOG : Server initialized ')