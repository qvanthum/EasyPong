var canvas = document.getElementById("gamecanvas");
var ctx = canvas.getContext("2d");
const x = canvas.width;
const y = canvas.height;
const paddleHeight = 75;
const paddleWidth = 10;
const paddleStartingPosition = y/2-paddleHeight/2;
var player1 = paddleStartingPosition;

ctx.font = "32px Impact, fantasy";
ctx.textBaseline = "center";
ctx.textAlign = 'center';
ctx.fillStyle = "#303F42";
ctx.fillText("CLICK ENTER TO START", x/2, y/2);



document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        ctx.clearRect(0, 0, 800, 400);
        ctx.fillRect(10, paddleStartingPosition, paddleWidth, paddleHeight)
        ctx.fillRect(x-20, paddleStartingPosition , paddleWidth, paddleHeight)
    }
});

document.addEventListener('keydown', function(e){
    if(e.key === 'w')
    ctx.clearRect(0, 0, 800, 400)
    player1 = player1 + 1
    ctx.fillRect(10, player1, paddleWidth, paddleHeight)
 })





