const canvas = document.querySelector("#Canvas");
const ctx = canvas.getContext("2d");
const player1 = { x: 50, y: 50, speed: 5, width: 35, height: 100, score: 0 };
const player2 = { x: 550, y: 50, speed: 5, width: 35, height: 100, score: 0 };
let ballspeed = 3;
const ball = {
  x: canvas.width / 3,
  y: canvas.height / 3,
  width: 10,
  height: 10,
  xs: ballspeed,
  ys: -ballspeed,
};

const keyzplayer1 = {
  ArrowRight: false,
  ArrowLeft: false,
  ArrowUp: false,
  ArrowDown: false,
};
const keyzplayer2 = { KeyD: false, KeyA: false, KeyW: false, KeyS: false };

requestAnimationFrame(draw);

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(event) {
  if (event.code in keyzplayer1) {
    keyzplayer1[event.code] = true;
  }
  if (event.code in keyzplayer2) {
    keyzplayer2[event.code] = true;
  }
  console.log(keyzplayer2);
}
function keyUp(event) {
  if (event.code in keyzplayer1) {
    keyzplayer1[event.code] = false;
  }
  if (event.code in keyzplayer2) {
    keyzplayer2[event.code] = false;
  }
}

function postionreset() {
  player1.x = 50;
  player2.x = canvas.width - (50 + player2.width);
  player1.y = canvas.height / 2 - player1.height / 2;
  player2.y = canvas.height / 2 - player2.height / 2;
  var second = 0,
    minute = 0,
    hour = 0;
}

function ballreset() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.xs = ballspeed;
  ball.ys = -ballspeed;
  (second = 0), (minute = 0), (hour = 0);
}
function move() {
  if (keyzplayer1.ArrowRight && player1.x < canvas.width / 2 - player1.width) {
    player1.x += player1.speed;
  } else if (keyzplayer1.ArrowLeft && player1.x > 0) {
    player1.x -= player1.speed;
  } else if (keyzplayer1.ArrowUp) {
    player1.y -= player1.speed;
  } else if (keyzplayer1.ArrowDown) {
    player1.y += player1.speed;
  }
  if (keyzplayer2.KeyD && player2.x < canvas.width - player2.width) {
    player2.x += player2.speed;
  } else if (keyzplayer2.KeyA && canvas.width / 2 - player2.width) {
    player2.x -= player2.speed;
  } else if (keyzplayer2.KeyW) {
    player2.y -= player2.speed;
  } else if (keyzplayer2.KeyS) {
    player2.y += player2.speed;
  }

  ball.x += ball.xs;
  ball.y += ball.ys;

  if (ball.x < 0) {
    player2.score++;
    ballreset();
    postionreset();
  }
  if (ball.x > canvas.width) {
    player1.score++;
    ballreset();
    postionreset();
  }

  if (ball.y < 0 || ball.y > canvas.height) {
    ball.ys *= -1;
  }

  if (checkCollison(ball, player1)) {
    ball.xs *= -1;
    let temp = (player1.y + player1.height) / 2;
    let temp1 = (ball.y + ball.height) / 2;
    console.log(temp);
    console.log(temp1);
    if (temp < temp1) {
      ball.ys = ballspeed;
    } else {
      ball.ys = -ballspeed;
    }
  }
  if (checkCollison(ball, player2)) {
    ball.ys *= -1;
    let temp = (player2.y + player2.height) / 2;
    let temp1 = (ball.y + ball.height) / 2;
    console.log(temp);
    console.log(temp1);
    if (temp < temp1) {
      ball.xs = ballspeed;
    } else {
      ball.xs = -ballspeed;
    }
  }
}

function checkCollison(ob1, ob2) {
  let val =
    ob1.x < ob2.x + ob2.width &&
    ob1.x + ob1.width > ob2.x &&
    ob1.y < ob2.y + ob2.height &&
    ob1.y + ob1.height > ob2.y;
  if (val) {
    console.log(val);
  }
  return val;
}
function draw() {
  requestAnimationFrame(draw);
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
  move();
  checkCollison(player1, player2);
  ctx.fillStyle = "blue";
  ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
  ctx.fillStyle = "red";
  ctx.fillRect(player2.x, player2.y, player2.width, player2.height);

  ctx.fillStyle = "white";
  ctx.fillRect(ball.x, ball.y, ball.width, ball.height);

  let output = `Player 1 : ${player1.score} vs Player2 :${player2.score}`;
  ctx.font = "14px arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.fillText(output, 300, 30);
}
var second = 0,
  minute = 0,
  hour = 0;
function timer() {
  if (second < 59) second = second + 1;
  else {
    second = 0;
    if (minute < 59) minute = minute + 1;
    else {
      minute = 0;
      hour = hour + 1;
    }
  }
  $("#time").html(hour + " : " + minute + " : " + second);
}
$(document).ready(function () {
  $("#time").html("0 : 0 : 0");
  setInterval(timer, 1000);
});
