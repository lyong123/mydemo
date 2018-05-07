// pages/search/search.js
var app = getApp();
Page({
  data: {
    searchValue:"",
    resultArr:[]
  },
  onLoad: function (options) {
  
  },
  bindToHome:function(){
    wx.redirectTo({
      url: '../home/home',
    })
  },
  bindSearch:function(event){
    this.searchData(event.detail.value);
  },
  searchData(data){
    var url = app.globalData.doubanBase + app.globalData.searchURL + data + '&&start=0&&count=10';
    // var url = 'https://www.easy-mock.com/mock/5ae6ed0c713ba523da43ac9d/example/getMovie'
    wx.request({
      url,
      method:'get',
      header:{
        "Content-Type":"json"
      },
      success:(res) => {
        this.arrageData(res.data.subjects);
      },
      fail(err){
        console.log(err)
      }
    })
  },
  arrageData(res){
    var resultArr = [];
    res.forEach(item => {
      let totalDir = item.directors.map(i => i.name).join('/');
      let total = item.rating.average + '/' + item.year + '//' + totalDir;
      resultArr.push({
        id:item.id,
        title:item.title,
        image:item.images.small,
        total
      })
    })
    this.setData({resultArr});
  }
})