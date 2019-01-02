// TODO : delete fabric from modules 

/*  USING REQUIRE IMPORTS FOR IMAGES AS WELL 
import player_img from './assets/player_ship.png';
import opp_img from './assets/opponent_ship.png';
import bullet_img from './assets/bullet.png';
*/

// IMPORTS AND CONSTANTS FOR NETWORK ACCESS
var io = require('socket.io-client');
const SERVER = 'http://localhost:8030';
var socket ;

var player_img = require('./assets/player_ship.png' );
var opp_img = require ( './assets/opponent_ship.png' );
var bullet_img = require ( './assets/bullet.png' );

var WIDTH , HEIGHT , SOCKET ; 
const MIN_WIDTH = 0 , MIN_HEIGHT = 0;
const MODEL_DIMENSIONS = 100 ;

const MOVEMENT_PIX = 30;
const RIGHT_ARROW = 39, LEFT_ARROW = 37, SPACE = 32;
const BULLET_SPEED = 5, BULLET_WIDTH = 10, BULLET_HEIGHT = 30;


var canvas , context , player , opp , bulletImage ;
var bulletList = [] ;

class Bullet {
    constructor ( x , y ){
        this.x = x ;
        this.y = y ;
    }
};

function ActivateInputListeners () {    
    document.addEventListener ( 'keydown' , (event) => {
        event.preventDefault();
        if ( event.keyCode == LEFT_ARROW ){
            // left arrow
            console.log ( "Moving left" );
            if ( player.x - MOVEMENT_PIX > MIN_WIDTH )
                player.x -= MOVEMENT_PIX ;
            else 
                player.x = MIN_WIDTH ;
        }
        if ( event.keyCode == RIGHT_ARROW ){
            // right arrow
            console.log ( "Moving right" );
            if ( player.x < WIDTH - player.width )
                player.x += MOVEMENT_PIX ;
        }
        if ( event.keyCode == SPACE ){
            // space key
            console.log ( "Adding bullet to list at position : " , player.x , " " , player.y-BULLET_SPEED );
            bulletList.push ( new Bullet ( player.x + (player.width / 2) - 5  , player.y-BULLET_SPEED ) );
        }
    });
}

function main () {

    // Main loop for printing all the game components
    context.clearRect ( 0,0, WIDTH , HEIGHT );

    // Drawing the player's image 
    context.drawImage ( player.model , player.x , player.y, player.width , player.height );

    // Drawing the opponent's image 
    context.drawImage ( opp.model , opp.x , opp.y , opp.width , opp.height );

    // Update bullet values 
    for ( var i=0 ; i<bulletList.length ; i++ )
        if ( bulletList[i].y > 0 )  bulletList[i].y -= BULLET_SPEED;
        else   bulletList.splice ( i , 1 );

    // Redraw the bullets 
    for ( var i=0 ; i<bulletList.length ; i++ ){
        context.drawImage ( bulletImage , bulletList[i].x , bulletList[i].y , BULLET_WIDTH , BULLET_HEIGHT );
    }

    // EXCHANGING DATA WITH SERVER 

    // sending player location 
    socket.emit ( 'player_position' , player );
    // sending bullet list 
    socket.emit ( 'bullet_location' , bulletList );


    requestAnimationFrame ( main );
}

function AdjustCanvas(canvas){
    canvas.style.width='100%';
    canvas.style.height='100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

function init() {
    console.log ( "Starting game " );
    canvas = document.getElementById( 'game_frame' );
    AdjustCanvas(canvas);
    context = canvas.getContext('2d');
    WIDTH = context.canvas.width ;
    HEIGHT  = context.canvas.height ;
    console.log ( "Width of canvas : " , WIDTH );
    console.log ( "Height of canvas : " , HEIGHT );
    var playerImage = new Image();
    var oppImage = new Image();
    bulletImage = new Image();
    playerImage.src = player_img;
    oppImage.src = opp_img;
    bulletImage.src = bullet_img;
    player = {
        x : WIDTH/2 ,
        y : HEIGHT - MODEL_DIMENSIONS ,
        width : MODEL_DIMENSIONS , 
        height : MODEL_DIMENSIONS ,
        model : playerImage 
    };
    opp = {
        x : WIDTH/2 ,
        y : MIN_HEIGHT ,
        width : MODEL_DIMENSIONS ,
        height : MODEL_DIMENSIONS ,
        model : oppImage
    };
    // Activate input listeners 
    ActivateInputListeners();
    
    socket = io ( SERVER );
    socket.emit ( 'init' , 'Initializing comms' );
    socket.on ( 'message' , (msg)=> {
        // Registering at the server to receive connections
        console.log ( 'Reply from server : ' , msg );
    });
    socket.on ( 'init_response' , (msg) => {
        // Indication from server that opponent has been found
        console.log ( 'Confirmation from server received. Standing By.');
        console.log ( ' ID : ' + msg );
    });
    socket.on ( 'confirmation' , (msg)=>{
        console.log ( 'Opponent set up by the server.');
        console.log ( msg );
        console.log ( 'Starting to render the canvas ---- ' );
        requestAnimationFrame ( main );
    });
    //requestAnimationFrame ( main );
}

init();
