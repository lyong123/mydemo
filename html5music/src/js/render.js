
(function($,root){
    var $scope = $(document.body); 
    //渲染当前这首歌的星信息
    function renderInfo(info){
        var html = '<div class="song-name">' + info.song + '</div><div class="singer">' + info.singer + '</div><div class="music-album">' + info.album + '</div>';
        $scope.find('.music-info').html(html);
    }
    //渲染当前这首歌的图片
    function renderImg(src){
        var img = new Image();
        img.onload = function(){
            root.blurImg(img,$scope);
            $scope.find('.music-img .music-wrapper img').attr('src',src);
        }
        img.src = src;
    }
    function renderLike(data){
        if(!data){
            $scope.find('.control .like-btn').addClass('liking');
        }else{
            $scope.find('.control .like-btn').removeClass('liking');
        }
    }
    root.render = function(data){
        renderInfo(data);
        renderImg(data.image);
        renderLike(data.isLike);

    }
})(window.Zepto,window.player || (window.player = {}))