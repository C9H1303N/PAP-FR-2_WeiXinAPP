// pages/posts/post-detail/post-detail.js
var postsData = require('../../../data/posts-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    like: 0,
    collection: 0
  },
  liking: function(e) {
    let that = this
    this.setData({
      like: 1
    })
    console.log(this.data.like)
  },
  unliking: function(e) {
    let that = this
    this.setData({
      like: 0
    })
    console.log(this.data.like)
  },
  collecting: function(e) {
    let that = this
    this.setData({
      collection: 1
    })
    console.log(this.data.collection)
  },
  uncollecting: function(e) {
    let that = this
    this.setData({
      collection: 0
    })
    console.log(this.data.collection)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //后期需要后端传
    var postId = options.id;
    // 拿到数据文件对应id的数据元素
    var postList = postsData.postList;
    var postData;
    for(var i = 0; ;i++){
      if(postList[i].postId == postId){
        postData = postList[i];
        break;
      }
    }
    // console.log(postData)
    // 数据绑定
    this.setData(
      // 替换发现前端的数据
      {
        postData: postData
      }
    );
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

  }
})