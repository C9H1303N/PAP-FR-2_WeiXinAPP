// pages/Mainpage.js
var app = getApp()
var postsData
var i = 1
Page({

  /**
   * 页面的初始数据
   */

  data: {
    tabbar: ['推荐','榜单'],
    winHeight: "", //窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    searchWord: "",
    i: 1
  },
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  searchWordInput: function(e){
    this.setData({
      searchWord: e.detail.value
    })
  },
  search: function(e){
    let word = this.data.searchWord
    if (word == ''){
      wx: wx.showToast({
        title: '请输入关键词'
      })
    }
    else {
      wx.navigateTo({
        url: '/pages/Search/Search?searchWord=' + word,
      })
    }
    this.setData({
      searchWord: ""
    })
  },
  AItap: function(e){
    wx.navigateTo({
      url: '/pages/Search/Search?searchWord=人工智能',
    })
  },
  biotap: function(e){
    wx.navigateTo({
      url: '/pages/Search/Search?searchWord=生命科学',
    })
  },
  ETtap: function(e){
    wx.navigateTo({
      url: '/pages/Search/Search?searchWord=电子技术',
    })
  },
  phtap: function(e){
    wx.navigateTo({
      url: '/pages/Search/Search?searchWord=哲学',
    })
  },
  EETtap: function(e){
    wx.navigateTo({
      url: '/pages/Search/Search?searchWord=工程设计',
    })
  },
  selfdrivingtap: function(e){
    wx.navigateTo({
      url: '/pages/Search/Search?searchWord=自动驾驶',
    })
  },
  medicaltap: function(e){
    wx.navigateTo({
      url: '/pages/Search/Search?searchWord=智慧医疗',
    })
  },
  leadingmaterialtap: function(e){
    wx.navigateTo({
      url: '/pages/Search/Search?searchWord=前沿材料',
    })
  },
  onPostTap: function(event){
    // 获取新闻的postId
    var postId = event.currentTarget.dataset.postid;
    // 跳转到子页面，新闻详情界面
    console.log(postId)
    wx.navigateTo({
      url: '/pages/posts/post-detail/post-detail?id='+postId + '&page=0', //动态2，search 1, 主页0,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this;
    wx.request({
      url: 'https://pap2.zixfy.com/api/user/profile',
      header: {
        'Authorization': `Bearer ${ app.globalData.token }`
      },
      method: 'GET',
      success (res) {  
        console.log(res.data.id)
        app.globalData.userid = res.data.id
      }
    });
    wx.request({
      url: 'https://pap2.zixfy.com/api/interpretation/page/' + that.data.i,
      header: {
        'Authorization': `Bearer ${ app.globalData.token }`
      },
      method: 'GET',
      success (res) {
        console.log(res.data.interpretations)
        postsData = res.data.interpretations
        that.setData(
          // 替换发现前端的数据
          {
            posts_key: postsData
          }
        );
        wx.setStorage({
          key: 'paper',
          data: postsData
        })
      }
    })
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
    
  },
  loadmore: function() {
    this.data.i = this.data.i + 1;
    var that = this;
    wx.request({
      url: 'https://pap2.zixfy.com/api/interpretation/page/' + that.data.i,
      header: {
        'Authorization': `Bearer ${ app.globalData.token }`
      },
      method: 'GET',
      success (res) {
        console.log(res.data)
        if(res.data.page_total >= that.data.i){
          postsData = postsData.concat(res.data.interpretations) 
          that.setData(
          // 替换发现前端的数据
            {
            posts_key: postsData
            }
          );
          wx.setStorage({
            key: 'paper',
            data: postsData
          })
        }
        else{
          wx.showToast({
            title: '没有更多了！',
          })
        }
      },
      fail(res) {
        wx.showToast({
          title: '网络连接错误！',
        })
      }
    })
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    let that = this;
    // console.log("滚动切换标签",e)
    that.setData({
      currentTab: e.detail.current
    });
    that.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    let cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.i = 1;
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