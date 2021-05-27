// pages/Message/Message.js
var app = getApp()
var postsData = require('../../data/posts-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: "", //窗口高度
    friends: ""
  },
  gotoChat(event) {
    const currentUser = event.currentTarget.dataset.user;
    wx.navigateTo({
      url: '../chat/chat?nickname=' + currentUser.name
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        let calc = res.windowHeight; //顶部脱离文档流了(- res.windowWidth / 750 * 100);
        // console.log('==顶部高度==',calc)
        that.setData({
          winHeight: calc
        });
      }
    });
    wx.request({
      url: 'https://pap2.zixfy.com/api/chat-user-list/',
      header: {
        'Authorization': `Bearer ${ app.globalData.token }`
      },
      method: 'GET',
      success (res) {  
       // console.log(res.data)
        that.setData(
          // 替换发现前端的数据
          {
            friends: res.data
          }
        );
      }
    });
  },
  onPostTap: function(event){
    // 获取新闻的postId
    var postId = event.currentTarget.dataset.postid;
    // 跳转到子页面，新闻详情界面
    wx.navigateTo({
      url: '/pages/posts/post-detail/post-detail?id='+postId,
    })
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
    this.onLoad();
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