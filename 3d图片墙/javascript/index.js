var lis = document.getElementsByTagName('li');
var len = lis.length;
for(let i = 0; i < len; i ++){
	lis[i].spac = getSpac(lis[i]);
	lis[i].addEventListener('mouseenter',function(e){
		addClass(e,lis[i],'in')
	})
	lis[i].addEventListener('mouseleave',function(e){
		addClass(e,lis[i],'out')
	})
}
function getSpac(x){
	return {
		w:x.offsetWidth,
		h:x.offsetHeight
	}
}
function direction(e,ele){
	var x = e.offsetX - ele.spac.w/2;
	var y = e.offsetY - ele.spac.h/2;
	var d = ((Math.round((Math.atan2(y,x) * (180/Math.PI)+180)/90))+3)%4
	console.log(d)
	return d;
}
function addClass(event,ele,state){
	var d = direction(event,ele);
	var str;
	switch(d){
		case 0:
			str = '-top';
			break;
		case 1:
			str = '-right';
			break;
		case 2:
			str = '-bottom';
			break;
		case 3:
			str = '-left';
			break;
	}
	console.log(str);
	ele.className = state + str;
}