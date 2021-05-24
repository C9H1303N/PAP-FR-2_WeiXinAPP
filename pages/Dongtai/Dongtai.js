// pages/Dongtai/Dongtai.js
var app = getApp()
var postsData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    i: 1
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
    wx.request({
      url: 'https://pap2.zixfy.com/api/recent/page/'+app.globalData.userid+'?pindx='+this.data.i,
      header: {
        'Authorization': `Bearer ${ app.globalData.token }`
      },
      method: 'GET',
      success(res) {
        var item
        var list = new Array()
        console.log(res.data)
        for(var t in res.data.recent) {
          item = res.data.recent[t]
          console.log(item)
          if (item.type == 1) {
            list.push(item)
          }
        }
        postsData = list
        console.log(postsData)
        wx.setStorage({
          key: 'paper2',
          data: postsData
        })
        that.setData({
          posts_key: postsData
        })
      }
    })
   
  },
    
  onPostTap: function(event){
    // 获取新闻的postId
    var postId = event.currentTarget.dataset.postid;
    console.log(postId)
    // 跳转到子页面，新闻详情界面
    wx.navigateTo({
      url: '/pages/Dongtai/Detail/following-detail?id='+postId,
    })
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

  loadmore: function(){
    this.data.i = this.data.i + 1;
    let that = this;
    wx.request({
      url: 'https://pap2.zixfy.com/api/recent/page/'+app.globalData.userid+'?pindx='+this.data.i,
      header: {
        'Authorization': `Bearer ${ app.globalData.token }`
      },
      method: 'GET',
      success(res) {
        var item
        var list = new Array()
        console.log(res.data)
        for(var t in res.data.recent) {
          item = res.data.recent[t]
          console.log(item)
          if (item.type == 1) {
            list.push(item)
          }
        }
        //console.log(postsData)
        //console.log(list)
        postsData.push(...list)
        //console.log(postsData)
        wx.setStorage({
          key: 'paper2',
          data: postsData
        })
        that.setData({
          posts_key: postsData
        })
      }
    })
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