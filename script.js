var canvas = document.getElementById("gamecanvas");
var ctx = canvas.getContext("2d");
const x = canvas.width;
const y = canvas.height;
const paddleHeight = 80;
const paddleWidth = 10;
const originalBallSpeed = 3;
var on = true;
var paddleSpeed = 3.2;
var ballSpeed = originalBallSpeed;
var sign = 1;
var sign2 = Math.round(Math.random()) * 2 - 1;
var player1name = prompt("Please enter player 1 name:", "PLAYER 1").toUpperCase();
var player2name = prompt("Please enter player 2 name:", "PLAYER 2").toUpperCase();
var pointsToWin = parseInt(prompt("Please enter the number of points to win the game:", "5"));
document.getElementById("player1name").innerHTML = player1name + ":";
document.getElementById("player2name").innerHTML = player2name + ":";
document.getElementById("rules").innerHTML = "THE FIRST PLAYER TO SCORE " + pointsToWin + " POINTS WINS!";

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
        if(ball.hasStarted === true) {
            if(keysPressed['w'] === true) {
                ctx.clearRect(0, 0, x, y);
            
                this.positionY = this.positionY - paddleSpeed;
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

                this.positionY = this.positionY + paddleSpeed;
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
}

var player2 = {
    score: 0,
    positionX: x-20,
    positionY: y/2-paddleHeight/2,
    move: function move() {
        if(ball.hasStarted === true) {
            if(keysPressed['ArrowUp'] === true) {
                ctx.clearRect(0, 0, x, y);
            
                this.positionY = this.positionY - paddleSpeed;
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
            
                this.positionY = this.positionY + paddleSpeed;
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
}


var ball = {
    radius: 8,
    positionX: x/2,
    positionY: y/2,
    speed: ballSpeed,
    angle: 0,
    hasStarted: false,
    restart: function restart() {
        this.speed = 0
        if(sign < 0) {
            sign = -sign
        }
        document.getElementById("player1score").innerHTML = player1.score;
        document.getElementById("player2score").innerHTML = player2.score;
        this.positionX = x/2;
        this.positionY = y/2;
        this.angle = 0;
        player1.positionY = y/2-paddleHeight/2;
        player2.positionY = y/2-paddleHeight/2;
        if(player1.score === pointsToWin || player2.score === pointsToWin){
            ball.speed = ballSpeed;
        } else {
            countDown()
        }
        //this.speed = this.speed * 1.05
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

            //player1
            if(this.positionX - this.radius <= player1.positionX + paddleWidth){
                if(this.positionY >= player1.positionY && this.positionY <= player1.positionY + paddleHeight) {
                    if(this.positionY >= player1.positionY && this.positionY <= player1.positionY + paddleHeight/2){
                        if(this.positionY - player1.positionY < 5) {
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = 5;
                            } else {
                                this.angle = -5;
                            }
                        } else if(this.positionY - player1.positionY >= 5 && this.positionY - player1.positionY < 10){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = 4.5;
                            } else {
                                this.angle = -4.5;
                            }
                        } else if(this.positionY - player1.positionY >= 10 && this.positionY - player1.positionY < 15){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = 4;
                            } else {
                                this.angle = -4;
                            }
                        } else if(this.positionY - player1.positionY >= 15 && this.positionY - player1.positionY < 20){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = 3;
                            } else {
                                this.angle = -3;
                            }
                        } else if(this.positionY - player1.positionY >= 20 && this.positionY - player1.positionY < 25){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = 2;
                            } else {
                                this.angle = -2;
                            }
                        } else if(this.positionY - player1.positionY >= 25 && this.positionY - player1.positionY < 30){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = 1;
                            } else {
                                this.angle = -1;
                            }
                        } else if(this.positionY - player1.positionY >= 30 && this.positionY - player1.positionY < 35){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = 0.5;
                            } else {
                                this.angle = -0.5;
                            }
                        } else if(this.positionY - player1.positionY >= 35 && this.positionY - player1.positionY < 38){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = 0.25;
                            } else {
                                this.angle = -0.25;
                            }
                        } else if(this.positionY - player1.positionY >= 38 && this.positionY - player1.positionY <= 40){
                            sign = -sign;
                            sign2 = sign2;
                            this.angle = 0;
                        }                       
                    }

                    if(this.positionY >= player1.positionY + paddleHeight/2 && this.positionY <= player1.positionY + paddleHeight){
                        if(this.positionY - player1.positionY > 40 && this.positionY - player1.positionY < 42) {
                            sign = -sign;
                            sign2 = sign2;
                            this.angle = 0;
                        } else if(this.positionY - player1.positionY >= 42 && this.positionY - player1.positionY < 45){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = -0.25;
                            } else {
                                this.angle = 0.25;
                            }
                        } else if(this.positionY - player1.positionY >= 45 && this.positionY - player1.positionY < 50){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = -0.5;
                            } else {
                                this.angle = 0.5;
                            }
                        } else if(this.positionY - player1.positionY >= 50 && this.positionY - player1.positionY < 55){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = -1;
                            } else {
                                this.angle = 1;
                            }
                        } else if(this.positionY - player1.positionY >= 55 && this.positionY - player1.positionY < 60){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = -2;
                            } else {
                                this.angle = 2;
                            }
                        } else if(this.positionY - player1.positionY >= 60 && this.positionY - player1.positionY < 65){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = -3;
                            } else {
                                this.angle = 3;
                            }
                        } else if(this.positionY - player1.positionY >= 65 && this.positionY - player1.positionY < 70){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = -4;
                            } else {
                                this.angle = 4;
                            }
                        } else if(this.positionY - player1.positionY >= 70 && this.positionY - player1.positionY < 75){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = -4.5;
                            } else {
                                this.angle = 4.5;
                            }
                        } else if(this.positionY - player1.positionY >= 75 && this.positionY - player1.positionY <= 80){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = -5;
                            } else {
                                this.angle = 5;
                            }
                        }    
                    }
                } else {
                    if(this.positionX - this.radius <= player1.positionX - 2 * paddleWidth){ // -2 * paddleWidth
                        player2.score += 1;
                        this.restart();
                    }
                    
                }
                
            }
            
            //player2
            if(this.positionX + this.radius >= player2.positionX){
                if(this.positionY >= player2.positionY && this.positionY <= player2.positionY + paddleHeight) {
                    if(this.positionY >= player2.positionY && this.positionY <= player2.positionY + paddleHeight/2){
                        if(this.positionY - player2.positionY < 5) {
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = 5;
                            } else {
                                this.angle = -5;
                            }
                        } else if(this.positionY - player2.positionY >= 5 && this.positionY - player2.positionY < 10){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = 4.5;
                            } else {
                                this.angle = -4.5;
                            }
                        } else if(this.positionY - player2.positionY >= 10 && this.positionY - player2.positionY < 15){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = 4;
                            } else {
                                this.angle = -4;
                            }
                        } else if(this.positionY - player2.positionY >= 15 && this.positionY - player2.positionY < 20){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = 3;
                            } else {
                                this.angle = -3;
                            }
                        } else if(this.positionY - player2.positionY >= 20 && this.positionY - player2.positionY < 25){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = 2;
                            } else {
                                this.angle = -2;
                            }
                        } else if(this.positionY - player2.positionY >= 25 && this.positionY - player2.positionY < 30){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = 1;
                            } else {
                                this.angle = -1;
                            }
                        } else if(this.positionY - player2.positionY >= 30 && this.positionY - player2.positionY < 35){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = 0.5;
                            } else {
                                this.angle = -0.5;
                            }
                        } else if(this.positionY - player2.positionY >= 35 && this.positionY - player2.positionY < 38){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = 0.25;
                            } else {
                                this.angle = -0.25;
                            }
                        } else if(this.positionY - player2.positionY >= 38 && this.positionY - player2.positionY <= 40){
                            sign = -sign;
                            sign2 = sign2;
                            this.angle = 0;
                        }                       
                    }

                    if(this.positionY >= player2.positionY + paddleHeight/2 && this.positionY <= player2.positionY + paddleHeight){
                        if(this.positionY - player2.positionY > 40 && this.positionY - player2.positionY < 42) {
                            sign = -sign;
                            sign2 = sign2;
                            this.angle = 0;
                        } else if(this.positionY - player2.positionY >= 42 && this.positionY - player2.positionY < 45){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = -0.25;
                            } else {
                                this.angle = 0.25;
                            }
                        } else if(this.positionY - player2.positionY >= 45 && this.positionY - player2.positionY < 50){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = -0.5;
                            } else {
                                this.angle = 0.5;
                            }
                        } else if(this.positionY - player2.positionY >= 50 && this.positionY - player2.positionY < 55){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = -1;
                            } else {
                                this.angle = 1;
                            }
                        } else if(this.positionY - player2.positionY >= 55 && this.positionY - player2.positionY < 60){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = -2;
                            } else {
                                this.angle = 2;
                            }
                        } else if(this.positionY - player2.positionY >= 60 && this.positionY - player2.positionY < 65){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = -3;
                            } else {
                                this.angle = 3;
                            }
                        } else if(this.positionY - player2.positionY >= 65 && this.positionY - player2.positionY < 70){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = -4;
                            } else {
                                this.angle = 4;
                            }
                        } else if(this.positionY - player2.positionY >= 70 && this.positionY - player2.positionY < 75){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = -4.5;
                            } else {
                                this.angle = 4.5;
                            }
                        } else if(this.positionY - player2.positionY >= 75 && this.positionY - player2.positionY <= 80){
                            sign = -sign;
                            sign2 = sign2;
                            if(sign2 < 0){
                                this.angle = -5;
                            } else {
                                this.angle = 5;
                            }
                        }    
                    }
                } else {
                    if(this.positionX + this.radius >= player2.positionX + 3 * paddleWidth){ // + 3 * paddleWidth
                        player1.score += 1;
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
        }
        
    }

}

document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        ballSpeed = originalBallSpeed;
        ctx.clearRect(0, 0, x, y);
        ctx.fillRect(player1.positionX, y/2-paddleHeight/2, paddleWidth, paddleHeight);
        ctx.fillRect(player2.positionX, y/2-paddleHeight/2 , paddleWidth, paddleHeight);
        ball.hasStarted = true;
        document.getElementById("player1score").innerHTML = player1.score;
        document.getElementById("player2score").innerHTML = player2.score;
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
    if(p1s === pointsToWin || p2s === pointsToWin){
        ball.hasStarted = false;
        ball.restart();
        ctx.clearRect(0, 0, x, y);
        if(p1s === pointsToWin) {
            ctx.fillText(`${player1name} WINS!`, x/2, y/2);
            ctx.fillText("CLICK ENTER TO PLAY AGAIN!", x/2, y/2 + 32);
        }
        if(p2s === pointsToWin) {
            ctx.fillText(`${player2name} WINS!`, x/2, y/2);
            ctx.fillText("CLICK ENTER TO PLAY AGAIN!", x/2, y/2 + 32);
        }
        player1.score = 0;
        player2.score = 0;
        player1.positionY =  y/2-paddleHeight/2;
        player2.positionY =  y/2-paddleHeight/2;
    }
}

function countDown () {
    setTimeout(() => {
        document.getElementById("heading1").innerHTML = "3"
        blink()
        setTimeout(() => {
            document.getElementById("heading1").innerHTML = "2"
            setTimeout(() => {
                document.getElementById("heading1").innerHTML = "1"
                setTimeout(() => {
                    document.getElementById("heading1").innerHTML = "GO!!!"
                    ballSpeed = ballSpeed * 1.05;
                    ball.speed = ballSpeed;
                    setTimeout(() => {
                        on = false;
                        document.getElementById("heading1").innerHTML = "EASYPONG"
                        document.getElementById("heading1").style.backgroundColor = "#EEC015";
                        }, 3000);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    on = true;
}

function blink() {
    document.getElementById("heading1").style.backgroundColor = "#EEC015";
    setTimeout(() => {
        if(on === true){
            blink2()
        }
        }, 150);
    }
function blink2() {
    document.getElementById("heading1").style.backgroundColor = "red";
    setTimeout(() => {
        blink()
        }, 150);
    }

function countDownStyle () {
    setTimeout(() => {
            document.getElementById("heading1").style.background = "red";
            document.getElementById("heading1").style.background = "green";
        }, 5000);
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

