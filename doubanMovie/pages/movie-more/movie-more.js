// pages/movie-more/movie-more.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showIntheaters:true,
    showComingSoon:false,
    intheaters:[],
    comingSoon:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var typeId = options.typeId;
    if (typeId === "intheaters"){
      this.setData({
        showIntheaters: true,
        showComingSoon: false
      })
    }else{
      this.setData({
        showIntheaters: false,
        showComingSoon: true
      })
    }
    var typeId = this.data.showIntheaters ? "intheaters" : "comingSoon";
    this.getMovieList(typeId);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  getMovieList(typeId){
    var url = app.globalData.doubanBase;
    if(typeId === "intheaters"){
      url += app.globalData.intheaters;
    }else{
      url += app.globalData.comingSoon;
    }
    wx.showToast({
      title: '加载中',
      icon:"loading",
      duration:10000
    })
    wx.request({
      url,
      method:"GET",
      header:{"Content-Type":"json"},
      success:(res) => {
        var resArr = [];
        var subjects = res.data.subjects;
        subjects.forEach(item => {
          let allCasts = item.casts.map(i => i.name).join('/');
          let allDirectors = item.directors.map(i => i.name).join('/');
          let allGenres = item.genres.join('/');
          resArr.push({
            allCasts,
            allDirectors,
            allGenres,
            ...item
          })
          this.setData({ [typeId]: resArr })
        })
      },
      fail:(err) => {
        console.log(err);
      },
      complete() {
        wx.hideToast();
      }
    })
  },
  bindSelect(e){
    var tabId = e.currentTarget.dataset.tabId;
    console.log(tabId)
    if (tabId === "intheaters") {
      this.setData({
        showIntheaters: true,
        showComingSoon: false
      })
    } else {
      this.setData({
        showIntheaters: false,
        showComingSoon: true
      })
    }
    this.getMovieList(tabId);
  }

})