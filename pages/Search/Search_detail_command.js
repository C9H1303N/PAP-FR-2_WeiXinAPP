// pages/Dongtai/Dongtai.js
var app = getApp()
var postsData = require('../../data/posts-data.js')
var dongtaiData = require('../../data/pinglun-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    liking : 1
  },

  onReady: function() {
    let that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        let calc = res.windowHeight; //顶部脱离文档流了(- res.windowWidth / 750 * 100);
        // console.log('==顶部高度==',calc)
        that.setData({
          winHeight: calc,
        });
      }
    });
    this.setData(
      // 替换发现前端的数据
      {
        posts_key: dongtaiData.postList04,
      }
    );
  },

  onLoad: function (options) {
    let that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        let calc = res.windowHeight; //顶部脱离文档流了(- res.windowWidth / 750 * 100);
        // console.log('==顶部高度==',calc)
        that.setData({
          winHeight: calc,
        });
      }
    });
    this.setData(
      // 替换发现前端的数据
      {
        posts_key: dongtaiData.postList04,
      }
    );
  },
    
  onPostTap: function(event){
    // 获取新闻的postId
    var postId = event.currentTarget.dataset.postid;
    // 跳转到子页面，新闻详情界面
    // wx.navigateTo({
    //   url: '/pages/posts/post-detail/post-detail?id='+postId,
    // })
  },

  checkCor: function () {
    let that = this;
    if (that.data.currentTab > 3) {
      that.setData({
        scrollLeft: 300
      })
    } else {
      that.setData({
        scrollLeft: 0
      })
    }
  },

  liking_1: function(e) {
    // let that = this
    // var id = this.data.detailData.id
    // var sb = this.data.like
    // wx.request({
    //   url: 'https://pap2.zixfy.com/api/interpretation/'+id+'/like',
    //   header: {
    //     'Authorization': `Bearer ${ app.globalData.token }`
    //   },
    //   method: 'GET',
    //   success (res) {   
    //   }
    // });
    // sb = sb + 1
    this.setData({
      liking: 1,
      // like_count: sb
    })
    console.log(this.data.liking)
  },

  liking_2: function(e) {
    // let that = this
    // var id = this.data.detailData.id
    // var sb = this.data.like
    // wx.request({
    //   url: 'https://pap2.zixfy.com/api/interpretation/'+id+'/like',
    //   header: {
    //     'Authorization': `Bearer ${ app.globalData.token }`
    //   },
    //   method: 'GET',
    //   success (res) {  
    //   }
    // });
    // sb=sb-1
    this.setData({
      liking: 0,
    })
    console.log(this.data.liking)
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