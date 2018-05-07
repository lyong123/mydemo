(function ($,root){
    function controlIndex(index,len){
        this.index = index;
        this.len = len;
    }
    controlIndex.prototype = {
        prev : function(){
            return this.getIndex(-1);
        },
        next : function(){
            return this.getIndex(1);
        },
        getIndex : function(val){
            var index = this.index;
            var len = this.len;
            var curIndex = (index + val + len) % len;
            this.index = curIndex;
            return curIndex;
        },
        getListIndex : function(songList,target){
            for(let i = 0;i < songList.length; i ++){
                if(songList[i].singer === target){
                    return i;
                }
            }
        }
    }
    root.controlIndex = controlIndex;
})(window.Zepto,window.player || (window.player = {}))