import {fabric} from 'fabric';
import player_model from './assets/player_ship.png';
import opp_model from './assets/opponent_ship.png';

const move_px = 20 ;
const x_max = 800 ;
const y_max = 600;

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
        else if ( event.keyCode == 39 ){
            // right arrow
            context.clearRect ( player.x , player.y , player.width , player.height );
            if ( x_max - player.x >= player.width )
                player.x += move_px;
            drawModel ( context , player );
        }
        else if ( event.keyCode == 38 ){
            // up arrow
        }
        else if ( event.keyCode == 40 ){
            // down
        }
        else if ( event.keyCode == 32 ){
            // space key 
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