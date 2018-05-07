(function($,root){
    var $scope = $(document.body);
    var html = $(`<div class="playList">
                    <div class="header">播放列表</div>
                    <ul class="list"></ul>
                    <div class="cancel">取消</div>
                </div>`);
    function renderList(song){
        var li = '';
        for(var i = 0; i < song.length; i ++){
            li += '<li>' + song[i].song + '-<span>' + song[i].singer + '</span>' + '</li>'
            console.log(li)
        
        }
        html.find('.list').html(li);
        $scope.find('.wrapper').append($(html));
    }
    root.playList = {
        renderList : renderList
    }
})(window.Zepto,window.player || (window.player = {}))