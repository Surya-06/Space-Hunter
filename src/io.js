// DELETE THIS FILE 
//
///

/*
var io = require('socket.io-client');
var Main = require ('./index')

// URL OF THE SERVER FOR CONNECTION 
const SERVER = 'http://localhost:8030';

var socket ;

function EstablishComms () {
    console.log ( "Starting to communicate with the server" );
    socket = io(SERVER);
    socket.emit ( 'init' , "Initializing comms" );
    socket.on ( 'message' , (msg) => {
        // Registering at the server to receive connections
        console.log ( 'Reply to init from server : ' , msg );
    });
    socket.on ( 'init_response' , (msg) => {
        // Indication from server that opponent has been identified 
        console.log ( "Calling the main function remotely" );
        Main.activateMain();
    });
    socket.on ( 'affirmation' , (msg)=> {
        console.log ( 'Opponent found :-) ' );
        console.log ( "MSG FROM SERVER : ", msg );
    })
}

module.exports = EstablishComms;
*/

var io = require('socket.io-client');
const SERVER = 'http://localhost:8030';

function temp () {
    var temp = io ( SERVER );
}

module.exports = temp ;