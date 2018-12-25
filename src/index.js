import {fabric} from 'fabric';
import player_model from './assets/player_ship.png';
import opp_model from './assets/opponent_ship.png';

const move_px = 20 ;
const x_max = 800 ;
const y_max = 600;
const radius = 10;
const empty_function = () => void 0;

var player = {
    x : 350 ,
    y : 500 , 
    width : 100 ,
    height : 100 ,
    model : player_model 
}

var opp = {
    x : 350 ,
    y : 0 ,
    width : 100 ,
    height : 100 ,
    model : opp_model
}

function clearBullet ( context , x , y ){
    context.globalCompositeOperation = 'destination-out';
    context.arc ( x , y , radius , Math.PI *2 , true );
    context.fill();
}

function placeBullet ( context , x , y , color = 'red' ){
    context.beginPath();
    context.arc ( x , y , radius , 0 , Math.PI * 2  , true );
    context.fillStyle = color ;
    context.closePath();
    context.fill();
}

function updateBullets ( context , bullets ){
    for ( bullet in bullets ){
        clearBullet ( context , bullet.x , bullet.y );
        if ( bullet.y >=50 )    bullet.y -= 50;
        else bullets.remove(bullet);
        placeBullet ( context , bullet.x , bullet.y );
    }
}

function drawModel ( context , value ){
    var img_tag = new Image();
    img_tag.onload = () => {
        context.drawImage ( img_tag , value.x , value.y , value.width , value.height );
    }
    img_tag.src = value.model;
}

function inputListen(context){
    document.addEventListener ( 'keydown' , (event) => {
        event.preventDefault();
        if ( event.keyCode == 37 ){
            // left arrow 
            context.clearRect ( player.x , player.y , player.width , player.height );
            if ( player.x >= move_px )
                player.x -= move_px;
            drawModel ( context , player );
        }
        if ( event.keyCode == 39 ){
            // right arrow
            context.clearRect ( player.x , player.y , player.width , player.height );
            if ( x_max - player.x >= player.width )
                player.x += move_px;
            drawModel ( context , player );
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
            placeBullet ( context , player.x , player.y-50 );
        }
    })
}

function init () {
    var canvas = document.getElementById('game_frame');
    var context = canvas.getContext("2d");
    drawModel ( context , player );
    drawModel ( context , opp );
    
    // start listening for player movements 
    inputListen(context);
}

init();