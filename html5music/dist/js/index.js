var $ = window.Zepto;
var root = window.player;
var index = 0;
var songList;
var $scope = $('body');
var _controlIndex;
var audio = new root.audioMenager();
if('addEventListener' in document){
    document.addEventListener('DOMContentLoader',function(){
        FastClick.attch(document.body);
    })
}
function bindClick(data){
    $scope.on('play:change',function(Event,index){
        root.render(songList[index]);
        $('.play-btn').removeClass('stoping');
        audio.setAudioSrc(songList[index].audio);
        audio.pause();
        root.processor.clean()
        root.processor.renderAllTime(songList[index].duration);
    })
    $scope.on('click','.play-btn',function(){
        if(audio.status === 'pause'){
            audio.play();
            $(this).addClass('stoping');
            root.processor.start();
        }else{
            audio.pause();
            $(this).removeClass('stoping');
            root.processor.stop();
        }
    })
    $scope.on('click','.prev-btn',function(){
        // index --;
        // root.render(data[index%3]);
        index = _controlIndex.prev();
        $scope.trigger('play:change',index); 
        root.processor.renderAllTime(songList[index].duration); 
    })
    $scope.on('click','.next-btn',function(){
        // index ++;
        // root.render(data[index%3]);
        index = _controlIndex.next();
        $scope.trigger('play:change',index);
        root.processor.renderAllTime(songList[index].duration);
    })
    $scope.on('click','.like-btn',function(){
        $(this).toggleClass('liking');
    })
    $scope.on('click','.control .list-btn',function(){
        $('.playList').css({
            display : 'block'
        })
    })
    $scope.on('click','.playList .list li',function(e){
        var target = $(this).find('span').html();
        index = _controlIndex.getListIndex(songList,target);
        $scope.trigger('play:change',index); 
        root.processor.renderAllTime(songList[index].duration);
        audio.play();
        $('.play-btn').removeClass('stoping');
        $('.play-btn').addClass('stoping');
        root.processor.start();
        $('.playList .list li').removeClass('show');
        $('.playList .list li').eq(index).addClass('show');
    })
    $scope.on('click','.playList .cancel',function(){
        $('.playList').css({
            display : 'none'
        })
    })
}
function bindTouch(){
    var swidth = $('.pro-wrapper').offset().left;
    var _w = $('.pro-top').offset().width;
    $('body').on('touchstart','.slider-point',function(e){
    }).on('touchmove','.slider-point',function(e){
        var w = e.changedTouches[0].clientX - swidth;
        var precent = w / _w ;
        if(precent > 1){
            precent = 0;
        }else if(precent < 0){
            precent = 0;
        }
        root.processor.upData(precent);
    }).on('touchend','.pro-top',function(e){
        var w = e.changedTouches[0].clientX - swidth;
        var precent = w / _w ;
        if(precent > 1){
            precent = 0;
        }else if(precent < 0){
            precent = 0;
        }
        var time = songList[index].duration * precent;
        root.processor.start(time);
        audio.audio.currentTime = time;
        audio.play();
        $('.play-btn').addClass('stoping');

    })
}
var getData = function(url){
    $.ajax({
        type:'get',
        url:url,
        success:function(data){
            songList = data;
            bindClick();
            bindTouch();
            root.playList.renderList(data);
            $scope.trigger('play:change',index);
            _controlIndex = new root.controlIndex(index,data.length);
            // bindClick(data);


        },
        error:function(){
            console.log('error');
        }
    })
} 
getData('../mock/data.json')