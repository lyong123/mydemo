var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
var w = canvas.width;
var h = canvas.height;
var newT,newL;
function init(){
	var r = Math.random();
	if(r > 0.5){
		canvas.style.backgroundImage = 'url(./5.jpg)';
	}else{
		canvas.style.backgroundImage = 'url(./6.jpg)';
	}
	ctx.fillStyle = '#999';
	ctx.fillRect(0,0,300,300);
	ctx.globalCompositeOperation = 'destination-out';
	canvas.addEventListener('mousedown',downFun,false);
}
function downFun(Event){
	var top = Event.clientY - canvas.offsetTop;
	var left = Event.clientX - canvas.offsetLeft;
	newT = top;
	newL = left;
	ctx.beginPath();
	piant(left,top);
	document.addEventListener('mousemove',moveFun,false);
	document.addEventListener('mouseup',upFun,false);
}
function moveFun(Event){
	var top1 = Event.clientY - canvas.offsetTop;
	var left1 = Event.clientX - canvas.offsetLeft;
	ctx.beginPath()
	ctx.lineWidth = 30;
	ctx.lineCap = 'round';
	ctx.moveTo(newL,newT);
	ctx.lineTo(left1,top1);
	ctx.stroke()
	// piant(left,top);
	newT = top1;
	newL = left1;
}
function upFun(Evnet){
	document.removeEventListener('mousemove',moveFun,false);
	document.removeEventListener('mouseup',upFun,false);
	clear();
}
function clear(){
	var d = ctx.getImageData(0,0,w,h);
	var data = d.data;
	var len = d.data.length;
	var c = 0;
	var i;
	for(i = 0; i < len; i += 4){
		if(data[i] == 0){
			c++;
		}
	}
	if(c > w * h * 0.7){
		ctx.clearRect(0,0,w,h);
	}
}
function piant(top,left){
	ctx.arc(top, left, 15, 0, Math.PI * 2, 0);
	ctx.closePath();
	ctx.fill();
}
init();
