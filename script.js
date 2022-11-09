var canvas = document.getElementById("gamecanvas");
var ctx = canvas.getContext("2d");
const x = canvas.width;
const y = canvas.height;
const paddleHeight = 75;
const paddleWidth = 10;
var sign = Math.round(Math.random()) * 2 - 1;
var sign2 = Math.round(Math.random()) * 2 - 1;

ctx.font = "32px Impact, fantasy";
ctx.textBaseline = "center";
ctx.textAlign = 'center';
ctx.fillStyle = "#303F42";
ctx.fillText("CLICK ENTER TO START", x/2, y/2);


var player1 = {
    score: 0,
    positionX: 10,
    positionY: y/2-paddleHeight/2,
    move: function move() {
        if(keysPressed['w'] === true) {
            ctx.clearRect(0, 0, x, y);
            
            this.positionY = this.positionY - 1;
            if (this.positionY <= 0) {
                this.positionY = 0;
                ctx.fillRect(this.positionX, this.positionY, paddleWidth, paddleHeight);
                ctx.fillRect(player2.positionX, player2.positionY, paddleWidth, paddleHeight);
            } else {
                ctx.fillRect(this.positionX, this.positionY, paddleWidth, paddleHeight);
                ctx.fillRect(player2.positionX, player2.positionY, paddleWidth, paddleHeight);
            }
        }
        if(keysPressed['s'] === true) {
            ctx.clearRect(0, 0, x, y);
            
            this.positionY = this.positionY + 1;
            if (this.positionY >= y-paddleHeight) {
                this.positionY = y-paddleHeight;
                ctx.fillRect(this.positionX, this.positionY, paddleWidth, paddleHeight);
                ctx.fillRect(player2.positionX, player2.positionY, paddleWidth, paddleHeight);
            } else {
                ctx.fillRect(this.positionX, this.positionY, paddleWidth, paddleHeight);
                ctx.fillRect(player2.positionX, player2.positionY, paddleWidth, paddleHeight);
            }
        }
    }
}

var player2 = {
    score: 0,
    positionX: x-20,
    positionY: y/2-paddleHeight/2,
    move: function move() {
        if(keysPressed['ArrowUp'] === true) {
            ctx.clearRect(0, 0, x, y);
            
            this.positionY = this.positionY - 1;
            if (this.positionY <= 0) {
                this.positionY = 0;
                ctx.fillRect(player1.positionX, player1.positionY, paddleWidth, paddleHeight);
                ctx.fillRect(this.positionX, this.positionY, paddleWidth, paddleHeight);
            } else {
                ctx.fillRect(player1.positionX, player1.positionY, paddleWidth, paddleHeight);
                ctx.fillRect(this.positionX, this.positionY, paddleWidth, paddleHeight);
            }
        }
        if(keysPressed['ArrowDown'] === true) {
            ctx.clearRect(0, 0, x, y);
            
            this.positionY = this.positionY + 1;
            if (this.positionY >= y-paddleHeight) {
                this.positionY = y-paddleHeight;
                ctx.fillRect(player1.positionX, player1.positionY, paddleWidth, paddleHeight);
                ctx.fillRect(this.positionX, this.positionY, paddleWidth, paddleHeight);
            } else {
                ctx.fillRect(player1.positionX, player1.positionY, paddleWidth, paddleHeight);
                ctx.fillRect(this.positionX, this.positionY, paddleWidth, paddleHeight);
            }
        }
    }
}


var ball = {
    radius: 8,
    positionX: x/2,
    positionY: y/2,
    speed: 2,
    angle: angle = Math.random(),
    hasStarted: false,
    restart: function restart() {
        this.positionX = x/2;
        this.positionY = y/2;
    },
    move: function move() {
        checkScore(player1.score, player2.score);
        if(this.hasStarted === true) {
            ctx.clearRect(0, 0, x, y);
            
            dashedLines();
            this.positionX += sign * this.speed;
            this.positionY += sign2 * this.angle;

            if(this.positionY <= 0 + this.radius / 2) {
                sign2 = -sign2;
            }
            if(this.positionY >= 400 - this.radius / 2){
                sign2 = -sign2;
            }

            if(this.positionX <= player1.positionX + paddleWidth){
                if(this.positionY >= player1.positionY && this.positionY <= player1.positionY + paddleHeight) {
                    sign = -sign;
                    sign2 = sign2;
                } else {
                    if(this.positionX <= player1.positionX + paddleWidth + this.radius/2){
                        player2.score += 1;
                        document.getElementById("player2score").innerHTML = player2.score;
                        this.restart();
                    }
                    
                }
                
            }
            
            if(this.positionX >= player2.positionX){
                if(this.positionY >= player2.positionY && this.positionY <= player2.positionY + paddleHeight) {
                    sign = -sign;
                    sign2 = sign2;
                } else {
                    if(this.positionX >= player1.positionX + paddleWidth + this.radius/2){
                        player1.score += 1;
                        document.getElementById("player1score").innerHTML = player1.score;
                        this.restart();
                    }
                    
                }
            }
            ctx.fillRect(player1.positionX, player1.positionY, paddleWidth, paddleHeight);
            ctx.fillRect(player2.positionX, player2.positionY, paddleWidth, paddleHeight);
            
            
            ctx.beginPath();
            ctx.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI, true);
            ctx.closePath();
            ctx.fill();
            console.log(player1.positionY)
        }
        
    }

}

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        ctx.clearRect(0, 0, x, y);
        
        ctx.fillRect(player1.positionX, player1.positionY, paddleWidth, paddleHeight);
        ctx.fillRect(player2.positionX, player2.positionY , paddleWidth, paddleHeight);
        ball.hasStarted = true;
    }
});

function dashedLines() {
    ctx.strokeStyle = "#EEC015"
    ctx.setLineDash([5, 3]);
    ctx.beginPath();
    ctx.moveTo(player1.positionX + paddleWidth - 1, 0);
    ctx.lineTo(player1.positionX + paddleWidth - 1, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(player2.positionX + 1, 0);
    ctx.lineTo(player2.positionX + 1, y);
    ctx.stroke();
    ctx.strokeStyle = "#303F42"
    ctx.beginPath();
    ctx.moveTo(x/2, 0);
    ctx.lineTo(x/2, y);
    ctx.stroke();
}

function checkScore(p1s, p2s) {
    if(p1s === 10 || p2s === 10){
        ball.hasStarted = false;
        ctx.clearRect(0, 0, x, y);
        if(p1s === 10) {
            ctx.fillText("PLAYER 1 WINS!", x/2, y/2);
        }
        if(p2s === 10) {
            ctx.fillText("PLAYER 2 WINS!", x/2, y/2);
        }
    }
}

let keysPressed = {};

document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
    player1.move();
    player2.move();
 });

document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
 });

 let update = function() {
    player1.move();
    player2.move();
    ball.move();
    requestAnimationFrame(update);
 }
 update();

 