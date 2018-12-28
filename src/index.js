// TODO : delete fabric from modules 

import playerImage from './assets/player_ship.png';
import opponentImage from './assets/opponent_ship.png';
import bulletImage from './assets/bullet.png';

function ActivateInputListeners () {
    document.addEventListener ( 'keydown' , (event) => {
        event.preventDefault();
        if ( event.keyCode == 37 ){
            // left arrow
            console.log ( "Moving left" );
        }
        if ( event.keyCode == 39 ){
            // right arrow
            console.log ( "Moving right" );
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
        }
    });
}

