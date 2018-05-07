(function ($,root){
    var curTime;
    var frameId;
    var stopTime;
    var startTime;
    function formatTime(duration){
        var minutes = Math.floor(duration / 60);
        var seconds = Math.floor(duration % 60);
        if(minutes < 10){
            minutes = '0' + minutes;
        }
        if(seconds < 10){
            seconds = '0' + seconds;
        }
        var allTime = minutes + ':' + seconds;
        return allTime;
    }
    function renderAllTime (duration){
        curTime = duration;
        var allTime = formatTime(duration);
        $('.all-time').html(allTime);
    }
    function upData(precent){
        var curtime = precent * curTime;
        curtime = formatTime(curtime);
        $('.cur-time').html(curtime);
        if(precent >= 1){
            precent = 1;
        }
        if(precent <= 0){
            precent = 0;
        }
        var precentwidth = (precent - 1) * 100 + '%';
        
        $('.pro-top').css({
            transform : 'translateX(' + precentwidth + ')'
        })
    }
    function start(precentAge){
        stopTime = precentAge === undefined ? stopTime : precentAge * 1000;
        if(!stopTime){
            startTime = + new Date();
        }else{
            startTime = + new Date();
            startTime -= stopTime;
        }
       
        function frame(){
            cancelAnimationFrame(frameId);
            var _curTime = + new Date();
            // console.log(_curTime)
            var precent = ( _curTime - startTime ) / ( curTime * 1000);
            if(precent < 1){
                frameId = requestAnimationFrame(frame);
            }else{
                cancelAnimationFrame(frameId);
            }
            upData(precent);
        }
        frame();
    }
    function stop(){
        var time = + new Date();
        stopTime = time - startTime;
        cancelAnimationFrame(frameId);
    }
    function clean(){
        cancelAnimationFrame(frameId);
        $('.cur-time').html('00:00');
        $('.pro-top').css({
            transform : 'translateX(-100%)'
        })
        stopTime = false;
    }
    root.processor = {
        renderAllTime : renderAllTime,
        start : start,
        stop : stop,
        clean : clean,
        upData : upData,
    }
})(window.Zepto,window.player || (window.player = {}))