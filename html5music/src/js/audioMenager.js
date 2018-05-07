(function($,root){
    function audioMenager(){
        this.audio = new Audio();
        this.status = 'pause';
    }
    audioMenager.prototype = {
        play : function(){
            this.status = 'play';
            this.audio.play();
        },
        pause : function(){
            this.status = 'pause';
            this.audio.pause();
        },
        setAudioSrc : function(src){
            this.audio.src = src;
        }
    }
    root.audioMenager = audioMenager;
})(window.Zepto,window.player || (window.player = {}))