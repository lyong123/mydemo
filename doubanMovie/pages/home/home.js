// pages/home/home.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    intheaters:[],
    comingSoon:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var intheaterURL = app.globalData.doubanBase + app.globalData.intheaters + '?start=0&&count=10';
    var comingSoonURL = app.globalData.doubanBase + app.globalData.comingSoon + '?start=0&&count=10';
    this.getMovieListData(intheaterURL, "intheaters");
    this.getMovieListData(comingSoonURL,"comingSoon");
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
  bindToSearch:function(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  getMovieListData(url,types){
    wx.showToast({
      title: '加载中',
      icon:'loading',
      duration:10000
    })
    wx.request({
      url,
      method:'GET',
      header:{
        'Content-Type':'jaon'
      },
      success:(res) => this.setData({[types]:res.data.subjects}),
      fail:(err) => console.log(err),
      complete(){
        wx.hideToast();
      }
    })
  },
  bindToMore(e){
    var typeId = e.currentTarget.dataset.typeId;
    wx.navigateTo({
      url: '../movie-more/movie-more?typeId=' + typeId,
    })
  }
})