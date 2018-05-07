var timer1,timer2,timer3,timer4,timer5,timers,lastx,lasty,speedx,speedy,
	wt = document.documentElement.clientWidth,
	tran = document.getElementsByClassName('rect'),
	run = document.getElementsByClassName('rects')[0],
	btu = document.getElementsByTagName('button'),
	run2 = document.getElementsByClassName('rectr')[0];
function init(){
	tran[0].onmouseenter = function(e){
			move1.call(this,e,500,'width',timer1);
		tran[0].onmouseleave = function(e){
				move1.call(this,e,120,'width',timer1);
		}
	}
	tran[1].onmouseenter = function(e){
			move1.call(this,e,200,'width',timer2);
			move1.call(this,e,300,'height',timer3);	
		this.onmouseleave = function(e){
				move1.call(this,e,120,'width',timer2);
				move1.call(this,e,120,'height',timer3);
		}
	}
	tran[2].onmouseenter = function(e){
			this.style.display = 'none';
	}
	btu[0].onclick = function(e){
		console.log(wt);
		move1.call(run,e,wt / 2 - 110,'left',timer5,true);
	}
	btu[1].onclick = function(e){
		clearInterval(timer5);
		run.style.left = '0';
		run.style.top = '0';
	}
	run2.onmousedown = function(e){
		clearInterval(timers);
		var left = e.clientX - run2.parentNode.offsetLeft - run2.offsetLeft;
		var top = e.clientY - run2.parentNode.offsetTop - run2.offsetTop;
		lastx = run2.offsetLeft;
		lasty = run2.offsetTop;
		document.onmousemove = function(e){
			move3.call(run2,e,left,top);
		}
		document.onmouseup = function(e){
			move4.call(run2,e);
			document.onmousemove = null;
			document.onmouseup = null;
		}
	}
}
function move4(e){
	var _this = this;
	var g = 5;
	timers = setInterval(function(){
		speedy += g;
		if(parseInt(_this.style.left) + speedx < 0 ){
			speedx *= -0.8;
			speedy *= 0.8;
		}else if(parseInt(_this.style.left) + speedx > run2.parentNode.offsetWidth - 120){
			speedx *= -0.8;
			speedy *= 0.8;
		}
		if(parseInt(_this.style.top) + speedy > run2.parentNode.offsetHeight - 120){
			speedy *= -0.7;
			speedx *= 0.7;
		}else if(parseInt(_this.style.top) + speedy < 0){
			speedy *= -0.8;
			speedx *= 0.8;
		}
		_this.style.left = _this.offsetLeft + speedx + 'px';
		_this.style.top = _this.offsetTop + speedy + 'px';
		if(Math.abs(parseInt(_this.style.top) + speedy - run2.parentNode.offsetHeight - 120) / 2 < 126){
			_this.style.top = run2.parentNode.offsetHeight - 121 + 'px';
		}
	},30)
}
function move3(e,x,y){
	var xl = e.clientX - run2.parentNode.offsetLeft - x,
		xy = e.clientY - run2.parentNode.offsetTop - y;
	speedx = xl - lastx;
	speedy = xy - lasty;
	lasty = xy;
	lastx = xl;
		if(xl < 0){
			xl = 0;
		}else if(xl > run2.parentNode.offsetWidth - 120){
			xl = run2.parentNode.offsetWidth - 121;
		}
		if(xy < 0){
			xy = 0;
		}else if(xy > run2.parentNode.offsetHeight - 120){
			xy = run2.parentNode.offsetHeight - 121;
		}
	this.style.left = xl + 'px';
	this.style.top = xy + 'px';
}

function move1(e,num,style,time,run){
	var _this = this,
		target = num,
		speed = 0,
		timer,
		a,
		obj = {
			left:'offsetLeft',
			width:'offsetWidth',
			height:'offsetHeight'
		},
		x = obj[style];
	clearInterval(time);
	timer = setInterval(function(){
		a = target - _this[x] > 0 ? Math.ceil((target - _this[x]) / 7) : Math.floor((target - _this[x]) / 7);
		if(run == true){
			speed += a;
		}else{
			speed = a;
		}
		_this.style[style] = _this[x] + speed + 'px';
		if(Math.abs(parseInt(_this.style[style]) - target) < 1 ){
			clearInterval(timer);
			_this.style[style] = target + 'px';
		}
		switch(time){
			case timer1:
				timer1 = timer;
				break;
			case timer2:
				timer2 = timer;
				break;
			case timer3:
				timer3 = timer;
				break;
			case timer4:
				timer4 = timer;
				break;
			case timer5:
				timer5 = timer;
				break;
		}
	},30)
}

init();