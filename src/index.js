// TODO : delete fabric from modules 

import player_img from './assets/player_ship.png';
import opp_img from './assets/opponent_ship.png';
import bullet_img from './assets/bullet.png';

var WIDTH , HEIGHT ; 

const MOVEMENT_PIX = 30;
const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;
const SPACE = 32;
const BULLET_SPEED = 5;
const BULLET_WIDTH = 10;
const BULLET_HEIGHT = 30;


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
            if ( player.x > 0 )
                player.x -= MOVEMENT_PIX ;
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
    // Activate input listeners 
    ActivateInputListeners();

    requestAnimationFrame ( main );
}

init();