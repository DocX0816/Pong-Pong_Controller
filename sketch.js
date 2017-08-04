var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421';
var inData;
var inByte;
var delay;
var leftP;
var rightP;

var x = 25;
var y = 250;
var x2 = 1315;
var y2 = 250;
var leftP2;
var rightP2;
var bx = 683;
var by = 353;
var xspeed = 6;
var yspeed = 6;

var counter = 1;
function setup() {
   createCanvas(1365, 670);
 serial = new p5.SerialPort(); // make a new instance of the serialport library
 serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);   
 serial.list(); 
 serial.open(portName); // list the serial ports
 setFrameRate(2000);
}
function draw(){
      background(0);
      serialEvent();
      ball();
      move();
      player1();
      player2();
      border2();
      border();
      walls();
}
 
// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 println(i + " " + portList[i]);
 }
}
function serverConnected() {
  println('connected to server.');
}
 
function portOpen() {
  println('the serial port opened.')
}
 
function serialEvent() {
 inData = serial.read(); 
 if(inData >= 0){
  if(counter%2 == 1){ 
   background(0);
   leftP = inData;
   fill(255);
   textSize(32);
   text(leftP, 100, 100);
   println("leftP:" + " " + leftP);
   counter++
  }
  else{
   background(0);
   rightP = inData;
   fill(255);
   textSize(32);
   text(rightP, 200, 100);
   println("rightP:" + " " + rightP);
   counter++
  }
}
}
 
function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  println('The serial port closed.');
}




function player1(){
 fill(255)
 rect(x,y,25, height/3)
}



function player2(){
 fill(255)
 rect(x2,y2,25, height/3)
}


function move(){
leftP2 = map(leftP, 0, 255,0,height - height/3);
rightP2 = map(rightP, 0, 255, 0 , height - height/3);
  y2 = rightP2;
  y = leftP2;
}


function border2(){
if(y2 < 0){
  y2+=4;
 }
 if(y2 > height- height/3){
  y2-=4;
 }
 if(bx > x2 - 30 && by > y2 && by < y2 + height/3){
  xspeed = random(50,51);
 }
 }

 function border(){
 if(y < 0){
  y+=4;
 }
 if(y > height- height/3){
  y-=4;
 }
  if(bx < x + 55 && by > y && by < y + height/3){
  xspeed = random(-50,-51);
 
}

}


function ball(){
 ellipse(bx,by, 60,60);
 bx -= xspeed;
 by -= yspeed;
}


function walls(){
 if(by < 30){
  yspeed = random(-3,-4);
 } 
 if(by > height - 30){
  yspeed = random(3,4);
 }
 if(bx > width - 30){
  xspeed -= 4;;
}
 if (bx < 30){
  xspeed += 4;
 }
 
}

function reset(){
  bx = width/2
  by = height/2
  angle = random(-PI/4, PI/4);
  xspeed = 5 * cos(angle);
  yspeed = 5 * sin(angle);
}