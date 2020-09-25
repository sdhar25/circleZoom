var canvas = document.querySelector('canvas');

innerWidth = window.innerWidth;
innerHeight = window.innerHeight;

var cont = canvas.getContext('2d');
var maxRadius=40;
//var minRadius=5;
//object mouse
var mouse = {
x:undefined,
y:undefined
}
var colorArray=[
'#72DBF2',
'#04C4D9',
'#F2E96D',
'#F2BE5C',
'#F25E3D',
'#145940'
];

window.addEventListener('mousemove',function(event){
 //console.log(event);
// putting mouse x,y values
mouse.x=event.x;
mouse.y=event.y;
//test op
//console.log(mouse);
});

window.addEventListener('resize', function(){
 // console.log('ghjk');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

function Circle(x,y,dx,dy,radius){
  this.x=x;
  this.y=y;
  this.dx=dx;
  this.dy=dy;
  this.radius=radius;
  this.minRadius=radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];


  this.draw= function(){ //this is anonymous function
  // console.log('200');
       cont.beginPath();
		cont.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
		// cont.stokeStyle="blue";
		// cont.stroke();
    cont.fillStyle = this.color;
		cont.fill();
  }
  this.update = function(){
  	//this is anonymous function 

  	if(this.x+this.radius > innerWidth || this.x-this.radius < 0){
  	this.dx = -this.dx;
  }
  if(this.y+this.radius > innerHeight || this.y-this.radius < 0){
  	this.dy = -this.dy;
  }
	//console.log('fghj');
	this.x+=this.dx;
	this.y+=this.dy;
 //our action
// check distance mouse and particular circle(if greater than 50 increase)
   if((mouse.x - this.x < 50) && (mouse.x - this.x > -50) && (mouse.y - this.y < 50) && (mouse.y - this.y > -50)) {
    // increase radius i.e zooming
      if(this.radius < maxRadius){
    this.radius+=1;  // check this op if circle will increase 
   }
   }
   else if(this.radius > this.minRadius){

    this.radius-=1;
   }

	this.draw();
  }
}



var circleArray = [];

  

function init(){
  //console.log('abc');
   circleArray = [];
  for(var i=0;i<800;i++){
      var radius=Math.random()*3+1;
      var x = Math.random() * (window.innerWidth-(radius*2)) +radius;
      var y =Math.random() * (window.innerHeight - (radius*2)) + radius;
      var dx = Math.random()-0.5;
      var dy = Math.random()-0.5;
      circleArray.push(new Circle(x,y,dx,dy,radius));
}
//var circle = new Circle(200,200,3,3,30);
//console.log(circleArray);
}
function animate(){
  //console.log('sdfg');
	requestAnimationFrame(animate)
	    cont.clearRect(0,0,innerWidth,innerHeight);
	   //circle.update();
	   for(var i=0;i<circleArray.length;i++){
	   	circleArray[i].update();
	   }

  
}

init();
animate();