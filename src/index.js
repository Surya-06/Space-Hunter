// TODO : delete fabric from modules 

import player_img from './assets/player_ship.png';
import opp_img from './assets/opponent_ship.png';
import bullet_img from './assets/bullet.png';

const WIDTH = 800
const HEIGHT = 600 
const MOVEMENT_PIX = 30 ;
const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;
const SPACE = 32 ;

var canvas , context , player , opp ;

function ActivateInputListeners () {    
    document.addEventListener ( 'keydown' , (event) => {
        event.preventDefault();
        if ( event.keyCode == LEFT_ARROW ){
            // left arrow
            console.log ( "Moving left" );
            if ( player.x > MOVEMENT_PIX )
                player.x -= MOVEMENT_PIX ;
        }
        if ( event.keyCode == RIGHT_ARROW ){
            // right arrow
            console.log ( "Moving right" );
            if ( player.x < WIDTH - MOVEMENT_PIX )
                player.x += MOVEMENT_PIX ;
        }
        if ( event.keyCode == SPACE ){
            // space key
            console.log ( "Adding bullet to list" );
        }
    });
}

var init_y = 450 ;

function main () {
    // Main loop for printing all the game components
    console.log ( "Drawing the models" ); 
    context.clearRect ( 0,0, WIDTH , HEIGHT );
    // Drawing the player's image 
    context.drawImage ( player.model , player.x , player.y, player.width , player.height );
    // Drawing the opponent's image 
    context.drawImage ( opp.model , opp.x , opp.y , opp.width , opp.height );

    // testing bullet 
    var temp = new Image();
    temp.src = bullet_img ;
    if ( init_y > 60 ){
        init_y-=1;
    }
    else 
        init_y = 450 ;
    context.drawImage ( temp , 150 , init_y , 10,30 );

    requestAnimationFrame ( main );
}

function init() {
    console.log ( "Starting game " );
    canvas = document.getElementById( 'game_frame' );
    context = canvas.getContext('2d');
    var playerImage = new Image();
    var oppImage = new Image();
    var bulletImage = new Image();
    playerImage.src = player_img;
    oppImage.src = opp_img;
    bulletImage.src = bullet_img;
    player = {
        x : 350 ,
        y : 500 ,
        width : 100 , 
        height : 100 ,
        model : playerImage 
    };
    opp = {
        x : 350 ,
        y : 0 ,
        width : 100 ,
        height : 100 ,
        model : oppImage
    };

    // testing 
    ActivateInputListeners();

    requestAnimationFrame ( main );
}

init();