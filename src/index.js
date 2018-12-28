// TODO : delete fabric from modules 

import playerImage from './assets/player_ship.png';
import opponentImage from './assets/opponent_ship.png';


const RADIUS = 10 ;
const BULLET_SPEED = 1 ;
const PLAYER_BULLET_COLOR = 'blue';
const OPP_BULLET_COLOR = 'red';
const PLAYER_MOVEMENT = 20 ;
const X_MAX = 800 ;

var MODELS = require ( './Models' );

var player , opp , playerBulletList ;

function PlayerBulletConditional ( current_value ) {
    return current_value > 50 ;
}

function ActivateInputListeners () {
    document.addEventListener ( 'keydown' , (event) => {
        event.preventDefault();
        if ( event.keyCode == 37 ){
            // left arrow
            console.log ( "Moving left" );
            player.erase(); 
            if ( player.x > PLAYER_MOVEMENT )
                player.x -= PLAYER_MOVEMENT;
            player.draw();
        }
        if ( event.keyCode == 39 ){
            // right arrow
            console.log ( "Moving right" );
            player.erase();
            if ( X_MAX - player.x >= player.width )
                player.x += PLAYER_MOVEMENT;
            player.draw();            
        }
        if ( event.keyCode == 38 ){
            // up arrow
            console.log ( "up arrow selected" );
        }
        if ( event.keyCode == 40 ){
            // down
            console.log ( "down arrow selected" );
        }
        if ( event.keyCode == 32 ){
            // space key
            console.log ( "Adding bullet to list" );
            playerBulletList.add ( player.x+50, player.y-BULLET_SPEED-50 );
        }
    });
}

function BulletLoop () {
    playerBulletList.update();
    requestAnimationFrame(BulletLoop);
} 

function init () {
    console.log ( "Getting reference to canvas frame." );
    var canvas = document.getElementById('game_frame');
    var context = canvas.getContext("2d");
    console.log ( "Creating objects for player and opponent.");
    player = new MODELS.PlayerModel(context,350,500,100,100,playerImage);
    opp = new MODELS.PlayerModel(context,350,0,100,100,opponentImage);
    console.log ( "Drawing player and opponent to canvas.");
    player.draw();
    opp.draw();
    console.log ( "Creating bullet list." );
    playerBulletList = new MODELS.BulletList(context,PLAYER_BULLET_COLOR,RADIUS,BULLET_SPEED,PlayerBulletConditional);
    console.log ( "Initialization of resources complete" );
    console.log ( "Activating listeners for input." );
    ActivateInputListeners(); 
    console.log ( "Starting bullet looping function" );
    requestAnimationFrame ( BulletLoop );  
}

console.log ( "----------------WELCOME-----------");
console.log ( "Initializing the game." );
init();