const CIRCLE_ANGLE = Math.PI*2;

class PlayerModel {
    constructor ( context , x , y , width , height , model ){
        this.context = context;
        this.x = x ;
        this.y = y ;
        this.width = width ;
        this.height = height ;
        this.model = model ;
    }
    draw () {
        var img_tag = new Image();
        img_tag.onload = () => {
            this.context.drawImage ( img_tag , this.x , this.y , this.width , this.height );
        }
        img_tag.src = this.model ;
    }
    erase () {
        this.context.clearRect ( this.x , this.y , this.width , this.height );
    }
}

class Bullet {
    constructor ( context , x , y , radius , color ){
        this.context = context ;
        this.x = x ;
        this.y = y ;
        this.radius = radius ;
        this.color = color ;
        this.newAdd = true ;
    }
    draw () {
        this.context.beginPath();
        this.context.arc ( this.x , this.y , this.radius , 0 , CIRCLE_ANGLE , true );
        this.context.fillStyle = this.color ;
        this.context.closePath();
        this.context.fill();
    }
    erase () {
        if ( this.newAdd == false ){
            this.context.globalCompositeOperation = 'destination-out';
            this.context.arc ( this.x , this.y , this.radius , CIRCLE_ANGLE , true );
            this.context.fill();
        }
        else 
            this.newAdd = false ;
    }
}

class BulletList {
    constructor( context , color , radius , bulletSpeed , conditional ){
        this.context = context ;
        this.color = color ;
        this.radius = radius ;
        this.bulletSpeed = bulletSpeed ;
        this.conditional = conditional ;
        this.bullets = [] ;
    }
    add ( x , y ) {
        this.bullets.push ( new Bullet ( this.context, x , y , this.radius , this.color ) );
    }
    update () {
        for ( var i=0 ; i<this.bullets.length ; i++ ){
            if ( this.conditional ( this.bullets[i].y ) ){
                this.bullets[i].erase();
                this.bullets[i].y = this.bullets[i].y - this.bulletSpeed ;
                this.bullets[i].draw();
            }
            else {
                console.log ( "Deleting bullet since limit reached.");
                this.bullets[i].erase();
                this.bullets.splice ( i , 1 );
            }
        }
    }
}

module.exports = {
    PlayerModel : PlayerModel ,
    BulletList : BulletList
}